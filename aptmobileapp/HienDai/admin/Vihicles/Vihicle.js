import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text, TextInput, Chip, IconButton } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { usePaginatedApi, capitalize } from '../../configs/Utils';
import { Alert } from 'react-native'; // Thêm nếu chưa có

const STATUS_STYLES = {
  wait: { bg: '#FFF9C4', color: '#FBC02D', label: 'Pending' },
  unconfimred: { bg: '#FFEBEE', color: '#D32F2F', label: 'Rejected' },
  confirmed: { bg: '#E8F5E9', color: '#388E3C', label: 'Approved' },
};

const TABS = ['All', 'Pending', 'Approved', 'Rejected'];

// ============== Component ===============
const VehicleCard = ({ item, onConfirm }) => {
  let statusKey = item.status_card;
  let statusObj = STATUS_STYLES[statusKey] || STATUS_STYLES['wait'];
  let statusLabel = statusObj.label;

  let created = item.created_date?.slice(0, 10);
  let updated = item.updated_date?.slice(0, 10);
  let dateLabel = created === updated
    ? `Requested: ${created}`
    : `Approved: ${updated}`;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>
          {capitalize(item.vehicle_brand)} {capitalize(item.vehicle_model)}
        </Text>
        {item.status_card === 'wait' && (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
            <Chip
              icon="check-circle"
              style={{ backgroundColor: '#E8F5E9', borderRadius: 8 }}
              textStyle={{ color: '#388E3C', fontWeight: 'bold' }}
              onPress={() => onConfirm(item)}
            >
              Confirm
            </Chip>
          </View>
        )}
        <Chip
          style={[
            styles.statusChip,
            { backgroundColor: statusObj.bg },
          ]}
          textStyle={[
            styles.statusChipText,
            { color: statusObj.color },
          ]}
        >
          {statusLabel}
        </Chip>

      </View>
      <View style={styles.cardRow}>
        <IconButton icon={item.vehicle_type === 'car' ? "car" : "motorbike"} size={18} style={styles.icon} />
        <Text style={styles.cardInfo}>{capitalize(item.vehicle_type)}</Text>
      </View>
      <View style={styles.cardRow}>
        <IconButton icon="account-outline" size={18} style={styles.icon} />
        <Text style={styles.cardInfo}>{capitalize(item.resident_name)}</Text>
      </View>
      <View style={styles.cardRow}>
        <IconButton icon="calendar" size={18} style={styles.icon} />
        <Text style={styles.cardInfo}>{dateLabel}</Text>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.colorChipWrap}>
          <Chip
            style={[
              styles.colorChip,
              { backgroundColor: '#eee' },
            ]}
            textStyle={styles.colorChipText}
          >
            {capitalize(item.vehicle_color)}
          </Chip>
        </View>
      </View>
      {item.area ? (
        <View style={styles.spotBox}>
          <Text style={styles.spotLabel}>Parking Spot: </Text>
          <Text style={styles.spotValue}>{capitalize(item.area)}</Text>
        </View>
      ) : null}
    </View>
  );
};

const VihicleAdmin = () => {
  // ============== Variables ===============
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [confirmingCard, setConfirmingCard] = useState(null);

  const handleConfirmCard = (card) => {
    Alert.alert(
      "Xác nhận thẻ?",
      "Bạn chắc chắn muốn xác nhận thẻ này?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xác nhận", style: "destructive", onPress: () => doConfirmCard(card) }
      ]
    );
  };

  const { data: vehicles, loading, loadMore, setPage, hasMore } = usePaginatedApi(
    endpoints['get_card'],
    search,
    [tab]
  );

    const doConfirmCard = async (card) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Confirming card:", endpoints['confirm_card'](card.id));
      await authAPI(token).patch(endpoints['confirm_card'](card.id));
      alert("Card confirmed successfully!");
      loadVehicles(); // reload lại danh sách
    } catch (e) {
      console.error("Error confirming card:", e.message);
      alert("Xác nhận thất bại!");
    }
  };

  const filterVehicles = () => {
    let data = vehicles;
    if (tab !== 'All') {
      if (tab === 'Pending') data = data.filter(v => v.status_card === 'wait');
      else if (tab === 'Approved') data = data.filter(v => v.status_card === 'confirmed');
      else if (tab === 'Rejected') data = data.filter(v => v.status_card === 'unconfimred');
    }
    if (search)
      data = data.filter(
        v =>
          (v.vehicle_brand + ' ' + v.vehicle_model)
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    return data;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          mode="outlined"
          placeholder="Search vehicles..."
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.tabRow}>
        {TABS.map(t => (
          <Chip
            key={t}
            style={tab === t ? styles.tabActive : styles.tab}
            textStyle={tab === t ? styles.tabActiveText : styles.tabText}
            onPress={() => setTab(t)}
          >
            {t}
          </Chip>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={filterVehicles()}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => <VehicleCard item={item} onConfirm={handleConfirmCard} />}
          contentContainerStyle={styles.listContent}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={hasMore && <ActivityIndicator style={{ margin: 16 }} />}
        />
      )}
    </View>
  );
};

export default VihicleAdmin;