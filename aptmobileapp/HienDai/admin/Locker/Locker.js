import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Chip, Button, IconButton, Portal, Dialog, Avatar, ActivityIndicator, TextInput } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import * as ImagePicker from "expo-image-picker";
import { Alert } from 'react-native';
import LockerDialog from './LockerDialog';

const STATUS_STYLES = {
  Occupied: { bg: '#E3F0FF', color: '#1976D2' },
  Active: { bg: '#E8F5E9', color: '#388E3C' },
  Inactive: { bg: '#F3E5F5', color: '#8E24AA' },
};

const LockerCard = ({ item, onPress }) => (
  <TouchableOpacity activeOpacity={0.95} onPress={() => onPress(item)} style={{ flex: 1, margin: 6 }}>
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Chip
          style={[
            { backgroundColor: STATUS_STYLES[item.active ? "Active" : "Inactive"]?.bg },
          ]}
          textStyle={[
            styles.statusChipText,
            { color: STATUS_STYLES[item.active ? "Active" : "Inactive"]?.color },
          ]}
        >
          {item.active ? "Active" : "Inactive"}
        </Chip>
      </View>
      <Text style={styles.cardLocation}>{item.location}</Text>
      {/* <Text style={styles.cardLabel}>Size: <Text style={styles.cardValue}>{item.size}</Text></Text> */}
      {item.status === 'Maintenance' ? (
        <Text style={styles.maintenanceText}>Under maintenance</Text>
      ) : (
        <>
          {item.assigned ? (
            <Text style={styles.cardLabel}>Assigned to: <Text style={styles.cardValue}>{item.assigned}</Text></Text>
          ) : null}
          <Text style={styles.cardLabel}>Items: <Text style={styles.cardValue}>{item.item_count}</Text></Text>
        </>
      )}
    </View>
  </TouchableOpacity>
);

const LockerAdmin = () => {
  const [selected, setSelected] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lockerItems, setLockerItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const fetchLockerItems = async (lockerId) => {
    setLoadingItems(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await authAPI(token).get(endpoints.get_locker_item(lockerId));
      if (res.data.results && res.data.results.length === 0) {
        console.log("No items found for this locker.");
        setLockerItems([]);
        return;
      }
      console.log("Locker items:", res.data);
      setLockerItems(res.data);
    } catch (e) {
      setLockerItems([]);
      console.error("Error fetching locker items:", e.message);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    const loadLockers = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await authAPI(token).get(endpoints['get_locker']);
        // Map dữ liệu API sang format giao diện cũ, giữ items: []
        const mapped = (res.data.results || []).map(l => ({
          id: l.id.toString(),
          name: `Locker ${l.locker_name}`,
          active: l.active,
          status: l.resident_name ? 'Occupied' : 'Available',
          assigned: l.resident_name || '',
          item_count: l.item_count || 0, // Lấy đúng số item từ API
          items: [],    // Sẽ lấy từ API khác sau
        }));
        setLockers(mapped);
      } catch (error) {
        setLockers([]);
      } finally {
        setLoading(false);
      }
    };
    loadLockers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Lockers</Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={lockers}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <LockerCard
              item={item}
              onPress={locker => {
                setSelected(locker);
                setDialogVisible(true);
                fetchLockerItems(locker.id); // Gọi API lấy locker items
              }}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      <LockerDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        locker={selected}
        items={lockerItems}
        loadingItems={loadingItems}
        fetchLockerItems={fetchLockerItems} // truyền thêm prop này
      />
    </View>
  );
};

export default LockerAdmin;