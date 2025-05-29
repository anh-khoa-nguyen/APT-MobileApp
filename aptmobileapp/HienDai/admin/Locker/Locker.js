import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Chip, Button, IconButton, Portal, Dialog, Avatar, ActivityIndicator, TextInput } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import * as ImagePicker from "expo-image-picker";
import { Alert } from 'react-native';

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

const LockerDetailDialog = ({ visible, onDismiss, locker, items = [], loadingItems, fetchLockerItems }) => {
  const [addingItem, setAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemImage, setNewItemImage] = useState(null);
  const [creatingItem, setCreatingItem] = useState(false);

  const [confirmingId, setConfirmingId] = useState(null);

  const handleConfirmItem = (itemId) => {
    Alert.alert(
      "Xác nhận đã nhận hàng?",
      "Bạn chắc chắn muốn xác nhận đã nhận hàng cho item này?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xác nhận", style: "destructive", onPress: () => handleDoConfirm(itemId) }
      ]
    );
  };

  const handleDoConfirm = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await authAPI(token).patch(
        endpoints.update_locker_item(itemId), // dùng endpoint update_locker_item
        { status: "received" }
      );
      alert("Cập nhật thành công!");
      fetchLockerItems(locker.id);
    } catch (e) {
      alert("Cập nhật thất bại!");
    }
  };

  const handleCreateItem = async () => {
    console.log("a")
    if (!newItemName.trim() || !newItemImage) {
      console.log("b")
      alert("Nhập tên và chọn ảnh!");
      return;
    }
    console.log("c")
    setCreatingItem(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      formData.append('item_name', newItemName);
      formData.append('item_image', {
        uri: newItemImage.uri,
        name: 'item.jpg',
        type: 'image/jpeg',
      });
      console.log("Creating item with data:", formData);
      await authAPI(token).post(
        endpoints.create_locker_item(locker.id), // locker là prop truyền vào Dialog
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setAddingItem(false);
      setNewItemName('');
      setNewItemImage(null);
      alert("Item created successfully!");
      fetchLockerItems(locker.id); // reload lại danh sách item
    } catch (e) {
      console.error("Error creating item:", e.message);
      alert("Tạo item thất bại!");
    } finally {
      setCreatingItem(false);
      console.log("Item creation finished");
    }
  };

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Permissions denied!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled && result.assets && result.assets[0]) {
      setNewItemImage(result.assets[0]);
    }
  };

  if (!locker) return null;
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>
          <Text style={styles.dialogTitle}>{locker.name}</Text>
          <IconButton icon="close" size={22} style={styles.dialogClose} onPress={onDismiss} />
        </Dialog.Title>
        <Dialog.Content>

          <Dialog visible={!!confirmingId} onDismiss={() => setConfirmingId(null)}>
            <Dialog.Title>Xác nhận đã nhận hàng?</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={() => setConfirmingId(null)}>Hủy</Button>
              <Button onPress={handleDoConfirm}>Xác nhận</Button>
            </Dialog.Actions>
          </Dialog>
          <View style={styles.dialogBox}>
            {/* <Text style={styles.dialogInfo}>
              <Text style={styles.dialogInfoLabel}>Location:</Text> <Text style={styles.dialogInfoValue}>{locker.location}</Text>
            </Text> */}
            <Text style={styles.dialogInfo}>
              <Text style={styles.dialogInfoLabel}>Status:</Text>
              <Chip style={styles.dialogStatusChip} textStyle={styles.dialogStatusChipText}>{locker.active ? "Active" : "Inactive"}</Chip>
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
            <Button
              mode="outlined"
              icon="plus"
              style={styles.dialogAddItemBtn}
              labelStyle={styles.dialogAddItemLabel}
              onPress={() => setAddingItem(true)}
              disabled={addingItem}
            >
              Add Item
            </Button>
          </View>
          <ScrollView style={{ maxHeight: 400 }} contentContainerStyle={{ padding: 0 }}>

            {/* Form thêm item mới */}
            {addingItem && (
              <View style={[styles.dialogItemBox, { backgroundColor: '#fffbe7', marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start' }]}>
                <TouchableOpacity onPress={pickImage}>
                  {newItemImage ? (
                    <Avatar.Image source={{ uri: newItemImage.uri }} size={48} style={styles.dialogItemAvatar} />
                  ) : (
                    <Avatar.Icon icon="plus" size={48} style={styles.dialogItemAvatar} />
                  )}
                </TouchableOpacity>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TextInput
                    mode="outlined"
                    placeholder="Item name..."
                    value={newItemName}
                    onChangeText={setNewItemName}
                    style={{ backgroundColor: '#fff', height: 40, marginBottom: 8 }}
                    dense
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                      mode="contained"
                      loading={creatingItem}
                      onPress={handleCreateItem}
                      style={{ borderRadius: 8, minWidth: 60, marginRight: 8 }}
                      disabled={!newItemName.trim() || !newItemImage || creatingItem}
                    >
                      Tạo
                    </Button>
                    <IconButton
                      icon="close"
                      onPress={() => { setAddingItem(false); setNewItemName(''); setNewItemImage(null); }}
                    />
                  </View>
                </View>
              </View>
            )}
            {loadingItems ? (
              <ActivityIndicator style={{ marginTop: 12 }} />
            ) : items.length === 0 ? (
              <Text style={{ color: '#888', marginTop: 8 }}>No items in this locker.</Text>
            ) : (
              items.map((item, idx) => (
                <View key={item.id} style={styles.dialogItemBox}>
                  <Avatar.Image source={{ uri: item.item_image }} size={48} style={styles.dialogItemAvatar} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.dialogItemTitle}>{item.item_name}</Text>
                    <Text style={styles.dialogItemDesc}>Status: {item.status}</Text>
                    <Text style={styles.dialogItemDate}>Stored: {item.created_date?.slice(0, 10)}</Text>
                  </View>
                  {item.status === 'pending' && (
                    <IconButton
                      icon="check-circle"
                      color="#388E3C"
                      size={28}
                      onPress={() => handleConfirmItem(item.id)}
                    />
                  )}
                </View>
              ))
            )}
          </ScrollView>
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
      <LockerDetailDialog
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