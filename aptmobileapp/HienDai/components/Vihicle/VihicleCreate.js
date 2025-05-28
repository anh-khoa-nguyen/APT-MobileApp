import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Card, RadioButton } from 'react-native-paper';
import { styles } from './stylesC';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function VihicleCreate({ onSubmit }) {
  const [area, setArea] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);

  const nav = useNavigation();
  const route = useRoute();

  const handleAdd = async () => {
    if (!area || !brand || !model || !color) {
      alert('Please fill in all fields!');
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const payload = {
        area: area,
        vehicle_type: vehicleType,
        vehicle_brand: brand,
        vehicle_model: model,
        vehicle_color: color,
      };
      await authAPI(token).post(endpoints.create_card, payload);
      alert('Vehicle card added!');
      setArea('');
      setBrand('');
      setModel('');
      setColor('');
      setVehicleType('car');
      if (route.params?.onAdded) route.params.onAdded();
      nav.goBack();
      if (onSubmit) onSubmit(); // callback nếu cần reload danh sách
    } catch (e) {
      alert('Failed to add vehicle card!');
      console.error(e.response ? e.response.data : e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Card style={styles.card}>
        <Card.Title title="Add Vehicle Card" titleStyle={styles.title} />
        <Card.Content>
          <TextInput
            label="Area"
            value={area}
            onChangeText={setArea}
            style={styles.input}
            mode="outlined"
          />
          <Text style={styles.label}>Vehicle Type</Text>
          <RadioButton.Group onValueChange={setVehicleType} value={vehicleType}>
            <View style={styles.radioRow}>
              <RadioButton value="car" />
              <Text style={styles.radioLabel}>Car</Text>
              <RadioButton value="motorbike" />
              <Text style={styles.radioLabel}>Motorbike</Text>
            </View>
          </RadioButton.Group>
          <TextInput
            label="Brand"
            value={brand}
            onChangeText={setBrand}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Model"
            value={model}
            onChangeText={setModel}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Color"
            value={color}
            onChangeText={setColor}
            style={styles.input}
            mode="outlined"
          />
          <Button
            mode="contained"
            style={styles.submitBtn}
            loading={loading}
            onPress={handleAdd}
          >
            Add Card
          </Button>
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
}