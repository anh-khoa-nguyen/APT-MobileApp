import React, { useContext, useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Avatar, Button, Text, TextInput, useTheme } from 'react-native-paper';
import styles from './stylesF';

import { MyUserContext, MyDispatchContext } from '../../configs/Contexts';
import { authAPI, endpoints } from "../../configs/Apis";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import { useNavigation } from '@react-navigation/native';

const First = () => {
  // ================ Variables ================
  const userA = useContext(MyUserContext) || "";
  const dispatch = useContext(MyDispatchContext);

  const [info, setInfo] = useState(null);
  const [avatar, setAvatar] = useState(null); // local image object
  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const nav = useNavigation();

  // ================ Functions ================
  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "App needs permission to access your gallery.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled && result.assets && result.assets[0]) {
      setAvatar(result.assets[0]);
    }
  };

  const loadInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await authAPI(token).get(endpoints["get_info"]);
      setInfo(res.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load user info");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      //Update avatar
      const token = await AsyncStorage.getItem("token");
      if (avatar) {
        const formData = new FormData();
        formData.append('avatar', {
          uri: avatar.uri,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        });
        await authAPI(token).patch(endpoints['update_avatar'], formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      //Update password
      if (newPassword.trim()) {
        const formData = new FormData();
        formData.append('password', newPassword);
        await authAPI(token).patch(
            endpoints['update_password'],
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        }

      Alert.alert("Success", "Profile updated successfully! Please log in again.");
      setNewPassword('');
      setAvatar(null);
      dispatch({
          "type": "logout"
      })
    } catch (err) {
        console.error(err.message);
      Alert.alert("Error", "Failed to update profile.");
    }
    setLoading(false);
  };

  if (!info) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // ================ Effects ================
  useEffect(() => {
    loadInfo();
  }, []);

  // ================ Render UI ================
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Avatar.Image size={110} source={{ uri: avatar.uri }} style={styles.avatar}
          />
        ) : info.avatar ? (
          <Avatar.Image size={110} source={{ uri: info.avatar }} style={styles.avatar}
          />
        ) : (
          <Avatar.Icon
            size={110}
            icon="upload"
            style={styles.avatar}
            color={theme.colors.primary}
          />
        )}
      </View>
      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          icon="image"
          style={styles.galleryBtn}
          labelStyle={styles.galleryLabel}
          onPress={pickImage}
        >
          Gallery
        </Button>
      </View>
      <Text style={styles.username}>{info.name}</Text>
      <Text style={styles.email}>{info.phone_number}</Text>
      <TextInput
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.passwordInput}
        mode="outlined"
      />
      <Button
        mode="contained"
        style={styles.saveBtn}
        labelStyle={styles.saveLabel}
        onPress={handleSave}
        loading={loading}
        disabled={loading}
      >
        Save Changes
      </Button>
    </View>
  );
};

export default First;