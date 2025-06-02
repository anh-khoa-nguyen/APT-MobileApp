import React, { useEffect, useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Text, Card, Badge, IconButton, FAB } from 'react-native-paper';
import { styles } from './stylesM';
import { useNavigation } from "@react-navigation/native";
import { authAPI, endpoints } from '../../configs/Apis';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { capitalize } from '../../configs/Utils';

export default function Member() {
  const nav = useNavigation();
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await authAPI(token).get(endpoints.get_family);
      setMembers(res.data);
    } catch (err) {
      setMembers([]);
    }
  };

  useEffect(() => {  
    fetchMembers();
  }, []);

  const renderItem = ({ item }) => (
  <Card style={styles.card}>
    <View style={styles.cardContent}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
          <IconButton icon="phone" size={16} style={styles.icon} />
          <Text style={styles.text}>{item.phone_number}</Text>
        </View>
        <View style={styles.row}>
          <IconButton icon="calendar" size={16} style={styles.icon} />
          <Text style={styles.text}>
            {item.birthday
              ? new Date(item.birthday).toLocaleDateString('vi-VN')
              : ''}
          </Text>
        </View>
        <View style={styles.row}>
          <IconButton icon="account" size={16} style={styles.icon} />
          <Text style={styles.text}>
            {capitalize(item.gender)}
          </Text>
        </View>
      </View>
      <Badge style={styles.activeBadge}>
        {item.user_active === 1 ? 'Active' : 'Inactive'}
      </Badge>
    </View>
  </Card>
);

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => nav.navigate('MemberCreate', { onAdded: fetchMembers })}
      />
    </View>
  );
}