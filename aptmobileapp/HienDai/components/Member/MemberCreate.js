import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Text, TextInput, Button, Avatar, useTheme, RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './stylesC';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from '../../configs/Apis';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function MemberCreate() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [gender, setGender] = useState('male'); 

  const nav = useNavigation();
  const route = useRoute();

  const theme = useTheme();

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

  const handleCreate = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const formData = new FormData();
    formData.append('name', name);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('phone_number', phone);
    if (avatar) {
      formData.append('avatar', {
        uri: avatar.uri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      });
    }

    await authAPI(token).post(
      endpoints.create_family,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
     Alert.alert('Success', 'Member created successfully!');
    if (route.params?.onAdded) route.params.onAdded(); // Gọi callback reload
    nav.goBack();
  } catch (err) {
    console.error(err.response || err.message);
    Alert.alert('Error', 'Failed to create member!');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Profile</Text>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Avatar.Image size={100} source={{ uri: avatar.uri }} style={styles.avatar} />
        ) : (
          <Avatar.Icon
            size={100}
            icon="account-plus"
            style={styles.avatar}
            color={theme.colors.primary}
          />
        )}
      </View>
      <Button
        mode="outlined"
        icon="image"
        style={styles.galleryBtn}
        labelStyle={styles.galleryLabel}
        onPress={pickImage}
      >
        Upload Avatar
      </Button>
      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
        mode="outlined"
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ marginRight: 16 }}>Gender:</Text>
        <RadioButton.Group onValueChange={setGender} value={gender}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton.Item label="Male" value="male" />
            <RadioButton.Item label="Female" value="female" />
          </View>
        </RadioButton.Group>
      </View>
      <TextInput
        label="Birthday (dd/mm/yyyy)"
        value={birthday}
        onChangeText={setBirthday}
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        style={styles.saveBtn}
        labelStyle={styles.saveLabel}
        onPress={handleCreate}
      >
        Create Member
      </Button>
    </View>
  );
}