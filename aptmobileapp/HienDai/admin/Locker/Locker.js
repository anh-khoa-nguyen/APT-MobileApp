import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Chip, Button, IconButton, Portal, Dialog, Avatar, ActivityIndicator } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";

const STATUS_STYLES = {
  Occupied: { bg: '#E3F0FF', color: '#1976D2' },
  Available: { bg: '#E8F5E9', color: '#388E3C' },
  Maintenance: { bg: '#F3E5F5', color: '#8E24AA' },
};

const LockerCard = ({ item, onPress }) => (
  <TouchableOpacity activeOpacity={0.95} onPress={() => onPress(item)} style={{ flex: 1, margin: 6 }}>
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Chip
          style={[
            styles.statusChip,
            { backgroundColor: STATUS_STYLES[item.status]?.bg },
          ]}
          textStyle={[
            styles.statusChipText,
            { color: STATUS_STYLES[item.status]?.color },
          ]}
        >
          {item.status}
        </Chip>
      </View>
      <Text style={styles.cardLocation}>{item.location}</Text>
      <Text style={styles.cardLabel}>Size: <Text style={styles.cardValue}>{item.size}</Text></Text>
      {item.status === 'Maintenance' ? (
        <Text style={styles.maintenanceText}>Under maintenance</Text>
      ) : (
        <>
          {item.assigned ? (
            <Text style={styles.cardLabel}>Assigned to: <Text style={styles.cardValue}>{item.assigned}</Text></Text>
          ) : null}
          <Text style={styles.cardLabel}>Items: <Text style={styles.cardValue}>{item.items.length}</Text></Text>
        </>
      )}
    </View>
  </TouchableOpacity>
);

const LockerDetailDialog = ({ visible, onDismiss, locker }) => {
  if (!locker) return null;
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>
          <Text style={styles.dialogTitle}>{locker.name}</Text>
          <IconButton icon="close" size={22} style={styles.dialogClose} onPress={onDismiss} />
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogBox}>
            <Text style={styles.dialogInfo}><Text style={styles.dialogInfoLabel}>Location:</Text> <Text style={styles.dialogInfoValue}>{locker.location}</Text></Text>
            <Text style={styles.dialogInfo}><Text style={styles.dialogInfoLabel}>Size:</Text> <Text style={styles.dialogInfoValue}>{locker.size}</Text></Text>
            <Text style={styles.dialogInfo}>
              <Text style={styles.dialogInfoLabel}>Status:</Text>
              <Chip style={styles.dialogStatusChip} textStyle={styles.dialogStatusChipText}>{locker.status}</Chip>
            </Text>
          </View>
          <Text style={styles.dialogSectionTitle}>Assigned Resident <Text style={styles.dialogUnassign}>Unassign</Text></Text>
          {locker.assigned ? (
            <View style={styles.dialogResidentBox}>
              <Avatar.Icon icon="account-outline" size={28} style={styles.dialogResidentAvatar} />
              <Text style={styles.dialogResidentName}>{locker.assigned}</Text>
            </View>
          ) : (
            <Text style={styles.dialogNoResident}>No resident assigned</Text>
          )}
          <View style={styles.dialogLockerContentHeader}>
            <Text style={styles.dialogSectionTitle}>Locker Contents</Text>
            <Button mode="outlined" icon="plus" style={styles.dialogAddItemBtn} labelStyle={styles.dialogAddItemLabel}>
              Add Item
            </Button>
          </View>
          {locker.items.map((item, idx) => (
            <View key={idx} style={styles.dialogItemBox}>
              <View style={{ flex: 1 }}>
                <Text style={styles.dialogItemTitle}>{item.name}</Text>
                <Text style={styles.dialogItemDesc}>{item.desc}</Text>
                <View style={styles.dialogItemDateRow}>
                  <IconButton icon="calendar" size={16} style={styles.dialogItemDateIcon} />
                  <Text style={styles.dialogItemDate}>Stored: {item.date}</Text>
                </View>
              </View>
              <IconButton icon="delete-outline" size={22} style={styles.dialogItemDelete} color="#D32F2F" />
            </View>
          ))}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const LockerAdmin = () => {
  const [selected, setSelected] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);

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
          location: '', // Chưa có location từ API
          size: '',     // Chưa có size từ API
          status: l.resident_name ? 'Occupied' : 'Available',
          assigned: l.resident_name || '',
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
              }}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      <LockerDetailDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        locker={selected}
      />
    </View>
  );
};

export default LockerAdmin;