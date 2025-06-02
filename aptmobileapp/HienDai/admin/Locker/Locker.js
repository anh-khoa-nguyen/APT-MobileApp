import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, Chip, Button, IconButton, Portal, Dialog, Avatar, ActivityIndicator, TextInput } from 'react-native-paper';
import styles from './styles';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import * as ImagePicker from "expo-image-picker";

import LockerDialog from './LockerDialog';
import { usePaginatedApi } from '../../configs/Utils'; // Thêm dòng này

const STATUS_STYLES = {
  Occupied: { bg: '#E3F0FF', color: '#1976D2' },
  Active: { bg: '#E8F5E9', color: '#388E3C' },
  Inactive: { bg: '#F3E5F5', color: '#8E24AA' },
};

// ============== Component ===============
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
  const [lockerItems, setLockerItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const { data: lockers, loading, loadMore, setPage, hasMore } = usePaginatedApi(
    endpoints['get_locker']
  );

  const fetchLockerItems = async (lockerId) => {
    setLoadingItems(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await authAPI(token).get(endpoints.get_locker_item(lockerId));
      if (res.data.results && res.data.results.length === 0) {
        setLockerItems([]);
        return;
      }
      setLockerItems(res.data);
    } catch (e) {
      setLockerItems([]);
    } finally {
      setLoadingItems(false);
    }
  };

  const mappedLockers = (lockers || []).map(l => ({
    id: l.id.toString(),
    name: `Locker ${l.locker_name}`,
    active: l.active,
    status: l.resident_name ? 'Occupied' : 'Available',
    assigned: l.resident_name || '',
    item_count: l.item_count || 0,
    items: [],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Lockers</Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={mappedLockers}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <LockerCard
              item={item}
              onPress={locker => {
                setSelected(locker);
                setDialogVisible(true);
                fetchLockerItems(locker.id);
              }}
            />
          )}
          contentContainerStyle={styles.listContent}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={hasMore && <ActivityIndicator style={{ margin: 16 }} />}
        />
      )}
      <LockerDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        locker={selected}
        items={lockerItems}
        loadingItems={loadingItems}
        fetchLockerItems={fetchLockerItems}
      />
    </View>
  );
};

export default LockerAdmin;