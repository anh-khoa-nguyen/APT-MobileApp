import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Dialog, Portal, Button, TextInput, IconButton, Text } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import styles from './styles';

const UserCreate = ({ visible, onDismiss, resident, reloadResidents }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const setState = (value, field) => setUser({ ...user, [field]: value });

  React.useEffect(() => {
    if (visible) setUser({});
  }, [visible, resident]);

  const handleCreate = async () => {
    if (!user.username || !user.password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await authAPI(token).post(endpoints.create_user(resident.id), {
        ...user
      });
      Alert.alert("Thành công", "Tạo tài khoản thành công!");
      onDismiss();
      reloadResidents && reloadResidents();
    } catch (error) {
      Alert.alert("Lỗi", "Tạo tài khoản thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (!resident) return null;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>
          Create User Account
          <IconButton icon="close" size={22} style={styles.dialogClose} onPress={onDismiss} />
        </Dialog.Title>
        <Dialog.Content>
          <Text style={{ marginBottom: 8 }}>
            Resident: <Text style={styles.dialogHighlight}>{resident.name}</Text>
          </Text>
          <TextInput
            label="Username"
            value={user.username}
            onChangeText={t => setState(t, 'username')}
            style={{ marginBottom: 12 }}
          />
          <TextInput
            label="Password"
            value={user.password}
            onChangeText={t => setState(t, 'password')}
            secureTextEntry
            style={{ marginBottom: 12 }}
          />
          <TextInput
            label="Email"
            value={user.email}
            onChangeText={t => setState(t, 'email')}
            style={{ marginBottom: 12 }}
          />
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button mode="outlined" onPress={onDismiss} style={styles.dialogBtn} labelStyle={styles.dialogBtnLabel}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleCreate}
            style={styles.dialogBtnPrimary}
            labelStyle={styles.dialogBtnPrimaryLabel}
            loading={loading}
            disabled={loading}
          >
            Create
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default UserCreate;