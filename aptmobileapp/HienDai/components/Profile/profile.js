import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Title, Button, List, Avatar, IconButton } from 'react-native-paper';
import styles from './style';

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";


import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";

import { authAPI, endpoints } from "../../configs/Apis";
import MyStyles from '../../Styles/MyStyles';
import { formatDate } from '../../configs/Utils';


const ProfileScreen = () => {

  const dispatch = useContext(MyDispatchContext);
  console.log("Dispatch context:", dispatch);
  const user = useContext(MyUserContext);
  console.log("User context:", user);

  const [info, setInfo] = useState(null)

  const loadInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await authAPI(token).get(endpoints["get_info"]);
      setInfo(res.data);
      console.log("Resident info:", res.data);
    } catch (error) {
      console.error("Lỗi lấy resident info:", error);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error config:", error.config);
      }
    }
  };


  const picker = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Permissions denied!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled && result.assets && result.assets[0]) {
      try {
        const token = await AsyncStorage.getItem("token");
        const formData = new FormData();
        formData.append('avatar', {
          uri: result.assets[0].uri,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        });

        await authAPI(token).patch(endpoints['update_avatar'], formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Sau khi upload thành công, load lại info để cập nhật avatar
        const res = await authAPI(token).get(endpoints['current_user']); // hoặc endpoints['current_user'] nếu backend hỗ trợ
        dispatch({
            type: "login",
            payload: res.data
        });

        alert("Cập nhật ảnh đại diện thành công!");
        loadInfo();
      } catch (err) {
        alert("Lỗi cập nhật ảnh đại diện!");
        console.error(err);
      }
    }
  };

  

  useEffect(() => {
    loadInfo();
  }, []);

  if (!info) return <Text style={{ padding: 20 }}>Đang tải thông tin...</Text>;

  const fields = [{
        title: 'Full name',
        value: info.name,
        icon: 'account',
    }, {
      title: 'Date of Birth',
      value: formatDate(info.birthday),
      icon: 'calendar',
    }
    ,{
      title: 'Gender',
      value: info.gender === "male" ? "Male" : info.gender === "female" ? "Female" : "Other",
      icon: 'gender-male-female',
    }
    , {
      title: 'Phone Number',
      value: info.phone_number,
      icon: 'phone',
    },{
      title: 'Apartment',
      value: info.apt,
      icon: 'home',
    },];

  const logout = () => {
      dispatch({
          "type": "logout"
      })
  }

  console.log("info.avatar:", info.avatar);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* Avatar */}
          {info && info.avatar ? (
            <Avatar.Image
              size={100}
              source={{ uri: info.avatar }}
            />
          ) : (
            <Avatar.Icon
              size={100}
              icon="account"
            />
          )}
          {/* Vai trò */}
          <Text style={styles.role}>
            <Text style={styles.role}>
              {user && user.role === 'resident' ? 'Resident' : user && user.role === 'admin' ? 'Admin' : "Unknown"}
          </Text>
          </Text>
          {/* Nút chọn ảnh đại diện */}
          <TouchableOpacity
            onPress={picker}
            style={styles.chooseImg}
          >
            <IconButton icon="pencil" size={20} iconColor="#888" style={styles.chooseImg}/>
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Information</Title>
          <View style={MyStyles.wrap}>
            {fields.map((item, index) => (
            <List.Item
                key={index}
                title={item.title}
                description={item.value}
                left={props => <List.Icon {...props} icon={item.icon} />}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Settings</Title>
          <View style={MyStyles.wrap}>
            <List.Item
              title="App Settings"
              left={props => <List.Icon {...props} icon="cog-outline" color="#0099FF" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            <List.Item
              title="Privacy & Security"
              left={props => <List.Icon {...props} icon="shield-outline" color="#AA66CC" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            <List.Item
              title="Help & Support"
              left={props => <List.Icon {...props} icon="help-circle-outline" color="#00C4B4" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
          </View>
        </View>

        <Button
          mode="contained-tonal"
          onPress={logout}
          textColor="#FF3B30"
          style={styles.logoutButton}
          icon="logout"
        >
          Sign out
        </Button>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

//------------------------------------------------------