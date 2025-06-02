import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Searchbar, Avatar, Text, Card, Button, Badge, Dialog, Portal, IconButton } from 'react-native-paper';
import styles from './styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";

import ResidentDialog from './ResidentDialog';
import { usePaginatedApi } from '../../configs/Utils';
import { useNavigation } from "@react-navigation/native";

import UserCreate from './UserCreate';

// ============== Component ===============
const ResidentCard = ({ resident, apartment, onPressTransfer }) => (
  <Card style={styles.card}>
    <View style={styles.cardContent}>
      <Avatar.Image size={54} source={{ uri: resident.avatar }} />
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{resident.name}</Text>
          {resident.user_active === 1 ? (
            <Badge style={styles.activeBadge}>Active</Badge>
          ) : (
            <Badge style={[styles.activeBadge, { backgroundColor: '#ccc', color: '#333' }]}>Inactive</Badge>
          )}
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="phone-outline" size={18} color="#1976D2" style={styles.icon} />
          <Text style={styles.text}>{resident.phone_number}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="home-outline" size={18} color="#1976D2" style={styles.icon} />
          <Text style={styles.text}>{apartment?.name || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="calendar-range" size={18} color="#1976D2" style={styles.icon} />
          <Text style={styles.text}>
            Moved in: {apartment?.updated_date ? apartment.updated_date.slice(0, 10) : 'N/A'}
          </Text>
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
  /// ============== Variables ===============
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [newApt, setNewApt] = useState('');
  const [apartments, setApartments] = useState([]);
  const [q, setQ] = useState();
  const [transferring, setTransferring] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);

  const [reload, setReload] = useState(0);

  const nav = useNavigation();

  const { data: residents, loading, loadMore, setPage, hasMore } = usePaginatedApi(
    endpoints['get_resident'],
    console.log("Residents: ", residents),
    q,
    reload
  );
  
  const loadApartments = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await authAPI(token).get(endpoints['get_apartment']);
      setApartments(res.data);
    } catch (error) {
      setApartments([]);
    }
  };

  // Resident with Apartment
  const apartmentsWithResident = apartments.map(apartment => {
    const resident = residents.find(r => r.id === apartment.resident_id);
    return {
      ...apartment,
      resident
    };
  });

  useEffect(() => {
    loadApartments();
  }, []);

  const showDialog = (resident) => {
    setSelectedResident(resident);
    setNewApt('');
    if (resident.user == null) {
      setShowCreateUser(true);
      setVisible(false);
    } else {
      setShowCreateUser(false);
      setVisible(true);
    }
  };

  const hideDialog = () => {
    setVisible(false);
    setShowCreateUser(false);
    setSelectedResident(null);
  };

  
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
          onChangeText={text => {
            setSearch(text);
            setQ(text); // trigger search API
            setPage(1); // reset page khi search
          }}
          style={styles.searchInput}
        />
        <Button
          mode="contained"
          style={styles.addBtn}
          icon="plus"
          onPress={() => nav.navigate('MemberCreate', {
            onAdded: () => {
              setPage(1);
              setReload(prev => prev + 1);
              loadApartments();
            }
          })}
        >
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
          renderItem={({ item }) => {
            const apartment = apartments.find(a => a.resident_id === item.id);
            return (
              <TouchableOpacity activeOpacity={0.95} onPress={() => showDialog(item)}>
                <ResidentCard resident={item} apartment={apartment} onPressTransfer={showDialog} />
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.listContent}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={hasMore && <ActivityIndicator style={{ margin: 16 }} />}
        />
      )}

      <UserCreate
        visible={showCreateUser}
        onDismiss={hideDialog}
        resident={selectedResident}
        reloadResidents={() => setPage(1)}
      />
      <ResidentDialog
        visible={visible}
        onDismiss={hideDialog}
        selectedResident={selectedResident}
        apartments={apartments}
        apartmentsWithResident={apartmentsWithResident}
        reloadResidents={() => setPage(1)}
        reloadApartments={loadApartments}
      />
    </View>
  );
};

export default ResidentAdmin;