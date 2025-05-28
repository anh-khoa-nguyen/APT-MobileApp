import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, Text, Card, Button, Badge, TextInput, Dialog, Portal, IconButton } from 'react-native-paper';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { Searchbar } from 'react-native-paper';


const ResidentCard = ({ resident, onPressTransfer }) => (
  <Card style={styles.card}>
    <View style={styles.cardContent}>
      <Avatar.Image size={54} source={{ uri: resident.avatar }} />
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{resident.name}</Text>
          <Badge style={styles.activeBadge}>Active</Badge>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="phone-outline" size={18} color="#1976D2" style={styles.icon} />
          <Text style={styles.text}>{resident.phone_number}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="home-outline" size={18} color="#1976D2" style={styles.icon} />
          <Text style={styles.text}>{resident.apt_name}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="calendar-range" size={18} color="#1976D2" style={styles.icon} />
          <Text style={styles.text}>Moved in: {resident.moved_in_date?.slice(0, 10)}</Text>
        </View>
        <View style={styles.actionRow}>
          <Button
            mode="outlined"
            style={styles.actionBtn}
            labelStyle={styles.actionLabel}
            onPress={() => onPressTransfer(resident)}
          >
            Transfer
          </Button>
          <Button mode="text" style={styles.deactivateBtn} labelStyle={styles.deactivateLabel}>
            Deactivate
          </Button>
        </View>
      </View>
    </View>
  </Card>
);

const ResidentAdmin = () => {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [newApt, setNewApt] = useState('');
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apartments, setApartments] = useState([]); // Thêm state cho apartments
  const [q, setQ] = useState();

  const loadResidents = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
    let url = endpoints['get_resident'];
    if (q) {
      url = `${url}?q=${encodeURIComponent(q)}`;
    }
    const res = await authAPI(token).get(url);
    setResidents(res.data.results);
    } catch (error) {
      setResidents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      let timer = setTimeout(() => {
        loadResidents();
      }, 500);

      return () => clearTimeout(timer);
    }, [q]);

  useEffect(() => {
    const loadApartments = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await authAPI(token).get(endpoints['get_apartment']);
        console.log('Loaded apartments:', res.data);
        setApartments(res.data);
        console.log('Apartments:', apartments);
      } catch (error) {
        setApartments([]);
        console.error("Error fetching apartments:", error.response ? error.response.data : error.message);
      }
    };
    loadApartments();
  }, []);

  const showDialog = (resident) => {
    setSelectedResident(resident);
    setNewApt('');
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setSelectedResident(null);
  };

  const handleSelectApt = (apt) => {
    setNewApt(apt);
  };

  // Lọc residents theo search
  const filteredResidents = residents.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search & Add */}
      <View style={styles.searchRow}>
        <Searchbar
          placeholder="Search for resident..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <Button mode="contained" style={styles.addBtn} icon="plus">
          Add
        </Button>
      </View>
      {/* List */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={filteredResidents}
          keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.95} onPress={() => showDialog(item)}>
              <ResidentCard resident={item} onPressTransfer={showDialog} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Transfer Apartment Dialog */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>
            Transfer Apartment
            <IconButton
              icon="close"
              size={22}
              style={styles.dialogClose}
              onPress={hideDialog}
            />
          </Dialog.Title>
          <Dialog.Content>
            {selectedResident && (
              <View style={styles.dialogInfoBox}>
                <Text>
                  Transferring apartment for: <Text style={styles.dialogHighlight}>{selectedResident.name}</Text>
                </Text>
                <Text>
                  Current apartment: <Text style={styles.dialogHighlight}>{selectedResident.apt_name}</Text>
                </Text>
              </View>
            )}
            <Text style={styles.dialogLabel}>Select New Apartment</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
            {apartments.map((apt, idx) => (
              <TouchableOpacity
                key={apt.id || apt.name || idx}
                style={[
                  styles.aptBtn,
                  { marginRight: 10, marginBottom: 10 },
                  newApt === apt.name && styles.aptBtnSelected
                ]}
                onPress={() => handleSelectApt(apt.name)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.aptBtnLabel,
                  newApt === apt.name && styles.aptBtnLabelSelected
                ]}>
                  {apt.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button mode="outlined" onPress={hideDialog} style={styles.dialogBtn} labelStyle={styles.dialogBtnLabel}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={hideDialog}
              style={styles.dialogBtnPrimary}
              labelStyle={styles.dialogBtnPrimaryLabel}
              disabled={!newApt}
            >
              Transfer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ResidentAdmin;