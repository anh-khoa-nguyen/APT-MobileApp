import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { Text, Card, Badge, Button } from 'react-native-paper';
import { styles } from './styles';

import { authAPI, endpoints } from "../../configs/Apis";
import { capitalize, getDateTimeString } from '../../configs/Utils';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Locker() {
  // ================ Variables ================
  const [packages, setPackages] = useState([]);
  const [locker, setLocker] = useState(null); // Thêm state cho locker
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [reload, setReload] = useState(false);

  // ================ Functions ================
  const loadLocker = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      let res = await authAPI(token).get(endpoints['get_locker']);
      if (res.data.results && res.data.results.length > 0) {
        setLocker(res.data.results[0]);
      }
      console.log('Locker data:', res.data.results[0]);
    } catch (error) {
      console.error("Error fetching locker:", error.response);
    }
  };

  const loadPackages = async () => {
    if (!hasMore) return;
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    let url = `${endpoints['get_package']}?page=${page}`;

    try {
      let res = await authAPI(token).get(url);
      console.log('Loaded packages:', res.data.results);
      setPackages(prev => [...prev, ...res.data.results]);
      setHasMore(res.data.next !== null);
    } catch (error) {
      setHasMore(false);
      console.error("Error fetching packages:", error.response);
    } finally {
      setLoading(false);
    }
  };

  // ================ Alert ================
  const alertConfirm = (id) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you have received this package?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => confirmReceived(id) }
      ]
    );
  };

  const confirmReceived = async (id) => {
    const token = await AsyncStorage.getItem("token");
    try {
      await authAPI(token).patch(endpoints['update_package'](id), { status: "received" });
      setPage(1);
      setHasMore(true);
      setReload(r => !r);
      Alert.alert("Success", "Status updated successfully!");
    } catch (error) {
      console.error("Error updating package:", error.response);
      Alert.alert("Error", "Failed to update status!");
    }
  };

  // ================ Effects ================
  useEffect(() => {
    loadLocker();
  }, []);

  useEffect(() => {
    setPackages([]);
    loadPackages();
  }, [page, reload]);

  const loadMore = () => {
    if (!loading && hasMore) setPage(prev => prev + 1);
  };

  // ================ Render Component ================
  const renderItem = ({ item }) => {
    const created = getDateTimeString(item.created_date);
    const updated = getDateTimeString(item.updated_date);
    const isArrived = created === updated;

    return (
      <Card style={styles.packageCard}>
        <Card.Content style={styles.packageCardContent}>
          <View style={styles.packageHeader}>
            <Text style={styles.packageName}>{item.item_name}</Text>
            <Badge
              style={[
                styles.statusBadge,
                item.status === 'pending'
                  ? styles.pendingBadge
                  : styles.receivedBadge,
              ]}
            >
              {capitalize(item.status)}
            </Badge>
          </View>
          <Text style={styles.packageDescription}>{item.item_image ? "Image attachment" : "No Image"}</Text>
          {item.item_image && (
            <Image
              source={{ uri: item.item_image }}
              style={styles.packageImage}
            />
          )}
          <View style={styles.packageFooter}>
            <Text style={styles.packageDate}>
              {isArrived
                ? `Arrived at: ${created}`
                : `Received: ${updated}`}
            </Text>
            {item.status === 'pending' && (
              <Button
                mode="contained"
                icon="check-circle-outline"
                style={styles.markButton}
                labelStyle={styles.markButtonLabel}
                contentStyle={styles.markButtonContent}
                compact
                onPress={() => alertConfirm(item.id)}
              >
                Confirm
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>
    );
  };

  // ================ Render UI ================
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.lockerTitle}>Your Locker</Text>
          <Text style={styles.lockerId}>
            {locker ? `Locker ID: ${locker.locker_name || locker.id}` : "Locker ID: ..."}
          </Text>
        </View>
      </View>
      
      <FlatList
        data={packages}
        renderItem={renderItem}
        keyExtractor={item => item.id?.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={loading && <ActivityIndicator style={{ margin: 16 }} />}
      />
    </View>
  );
}