import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { Text, Card, Badge, Button } from 'react-native-paper';
import { styles } from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { capitalize, getDateTimeString } from '../../configs/Utils';

export default function Locker() {
  const [packages, setPackages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [locker, setLocker] = useState(null); // Thêm state cho locker
  const [reload, setReload] = useState(false);


  const loadLocker = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      let res = await authAPI(token).get(endpoints['get_locker']);
      if (res.data.results && res.data.results.length > 0) {
        setLocker(res.data.results[0]);
      }
      console.log('Locker data:', res.data.results[0]);
    } catch (error) {
      console.error("Error fetching locker:", error.response ? error.response.data : error.message);
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
      console.error("Error fetching packages:", error.response ? error.response.data : error.message);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error config:", error.config);
      }
    } finally {
      setLoading(false);
    }
  };

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
      console.error("Error updating package:", error.response ? error.response.data : error.message);
      Alert.alert("Error", "Failed to update status!");
    }
  };

  useEffect(() => {
    loadLocker(); // Gọi khi mount
  }, []);

  useEffect(() => {
    setPackages([]);
    loadPackages();
  }, [page, reload]);

  const loadMore = () => {
    if (!loading && hasMore) setPage(prev => prev + 1);
  };

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
          <Text style={styles.packageDescription}>{item.item_image ? "Có hình ảnh" : "Không có hình ảnh"}</Text>
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
                Mark as Received
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>
    );
  };

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