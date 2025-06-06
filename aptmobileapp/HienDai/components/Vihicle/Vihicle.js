import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import { Text, Card, Badge, Button } from 'react-native-paper';
import { styles } from './styles';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";

import { capitalize } from '../../configs/Utils';
import { useNavigation } from "@react-navigation/native";

const TYPE_IMAGES = {
  car: { uri: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80' },
  motorbike: { uri: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=800&q=80' },
};

const STATUS_COLORS = {
  confirmed: { backgroundColor: '#3DC47E', color: '#fff' },
  unconfimred: { backgroundColor: '#FFD966', color: '#fff' },
};

export default function Vihicle() {
  // ================ Variables ================
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const nav = useNavigation();

  // ================ Functions ================
  const loadCard = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      let res = await authAPI(token).get(endpoints['get_card']);
      console.log('Loaded cards:', res.data);
      setCards(res.data.results);
    } catch (error) {
      console.error("Error loading cards:", error.response);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCard();
  }, []);

  // ================ Render Component ================
  const renderItem = ({ item }) => (
  <Card style={styles.vehicleCard}>
    <ImageBackground
      source={TYPE_IMAGES[item.vehicle_type]}
      style={styles.vehicleCardBg}
      imageStyle={{ borderRadius: 16, opacity: 0.18 }}
    >
      <Card.Content style={styles.vehicleCardContent}>
        <View style={styles.vehicleHeader}>
          <Text style={styles.license}>{item.area}</Text>
          <Badge style={[styles.statusBadge, STATUS_COLORS[item.status_card]]}>
            {capitalize(item.status_card)}
          </Badge>
          <Badge style={styles.typeBadge}>
            {capitalize(item.vehicle_type)}
          </Badge>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={styles.vehicleInfo}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Brand:</Text> {item.vehicle_brand}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Model:</Text> {item.vehicle_model}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Color:</Text> {item.vehicle_color}
            </Text>
          </View>
          <View style={styles.ownerBox}>
            <Text style={styles.ownerLabel}>Owner:</Text>
            <Text style={styles.ownerName}>{item.resident_name}</Text>
          </View>
        </View>
      </Card.Content>
    </ImageBackground>
  </Card>
);

  // ================ Render UI ================
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Register your vehicles to receive parking cards and access to the building.</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
          <Button
            mode="contained"
            style={styles.addButton}
            labelStyle={styles.addButtonLabel}
            onPress={() => nav.navigate('VihicleCreate', { onAdded: loadCard })}
          >
            Add Vehicle
          </Button>
          <Button
            mode="contained"
            style={styles.memberButton}
            labelStyle={styles.addButtonLabel}
            onPress={() => nav.navigate('Member')}
          >
            Family Member
          </Button>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator style={{ margin: 16 }} />
      ) : (
        <FlatList
          data={cards}
          renderItem={renderItem}
          keyExtractor={(_, idx) => idx.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
}