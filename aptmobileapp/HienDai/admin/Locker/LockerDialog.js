import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, Chip, Button, IconButton, Portal, Dialog, Avatar, ActivityIndicator, TextInput } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import * as ImagePicker from "expo-image-picker";
import styles from './styles';

const LockerDialog = ({ visible, onDismiss, locker, items = [], loadingItems, fetchLockerItems }) => {
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
        endpoints.update_locker_item(itemId),
        { status: "received" }
      );
      alert("Cập nhật thành công!");
      fetchLockerItems(locker.id);
    } catch (e) {
      alert("Cập nhật thất bại!");
    }
  };

  const handleCreateItem = async () => {
    if (!newItemName.trim() || !newItemImage) {
      alert("Nhập tên và chọn ảnh!");
      return;
    }
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
      await authAPI(token).post(
        endpoints.create_locker_item(locker.id),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setAddingItem(false);
      setNewItemName('');
      setNewItemImage(null);
      alert("Item created successfully!");
      fetchLockerItems(locker.id);
    } catch (e) {
      alert("Tạo item thất bại!");
    } finally {
      setCreatingItem(false);
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
          <View style={styles.dialogBox}>
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
              items.map((item) => (
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

export default LockerDialog;