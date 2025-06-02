import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Card, RadioButton, Avatar } from 'react-native-paper';

import { styles } from './stylesC';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function VihicleCreate({ onSubmit }) {
  // ================ Variables ================
  const [area, setArea] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [customType, setCustomType] = useState(''); // Thêm state cho loại phương tiện tùy ý

  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const [loading, setLoading] = useState(false);

  const nav = useNavigation();
  const route = useRoute();

  // ================ Functions ================
  const handleAdd = async () => {
    if (!area || !brand || !model || !color || !selectedMember) {
      alert('Please fill in all fields!');
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const payload = {
        area: area,
        vehicle_type: vehicleType === 'other' ? customType : vehicleType,
        vehicle_brand: brand,
        vehicle_model: model,
        vehicle_color: color,
      };
      await authAPI(token).post(endpoints.create_card(selectedMember), payload);
      alert('Vehicle card added!');
      setArea('');
      setBrand('');
      setModel('');
      setColor('');
      setVehicleType('car');
      if (route.params?.onAdded) route.params.onAdded();
      nav.goBack();
      if (onSubmit) onSubmit();
    } catch (e) {
      alert('Failed to add vehicle card!');
      console.error(e.response || e.message || e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await authAPI(token).get(endpoints.get_family);
      setMembers(res.data);
    } catch (e) {
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  // ================ Render UI ================
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
              <RadioButton value="other" />
              <Text style={styles.radioLabel}>Other</Text>
            </View>
          </RadioButton.Group>
          {vehicleType === 'other' && (
            <TextInput
              label="Custom Vehicle Type"
              value={customType}
              onChangeText={setCustomType}
              style={styles.input}
              mode="outlined"
              placeholder="Enter vehicle type"
            />
          )}
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
          <Text style={styles.label}>Family Member: </Text>
          <View style={styles.memberList}>
            {members.map(m => (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.memberRow,
                  selectedMember === m.id && styles.memberRowSelected,
                ]}
                onPress={() => setSelectedMember(m.id)}
                activeOpacity={0.7}
              >
                <Avatar.Image
                  size={40}
                  source={{ uri: m.avatar }}
                  style={styles.memberAvatar}
                />
                <Text style={styles.memberName}>{m.name}</Text>
                <View style={{ flex: 1 }} />
                <RadioButton
                  value={m.id}
                  status={selectedMember === m.id ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedMember(m.id)}
                />
              </TouchableOpacity>
            ))}
          </View>
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