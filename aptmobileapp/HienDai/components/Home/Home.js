import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, Button, Divider, Badge, IconButton } from 'react-native-paper';
import { styles } from './style';

import { useState, useEffect, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
import { authAPI, endpoints } from "../../configs/Apis";
import { capitalize } from '../../configs/Utils';
import { useNavigation } from "@react-navigation/native";
// import { PaymentDetails } from '../Payment/PaymentDetails';
import { getDateTimeString } from '../../configs/Utils';


export default function Home() {
  const [payments, setPayments] = useState([]);
  const [packages, setPackages] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const nav = useNavigation();


  // const dispatch = useContext(MyDispatchContext);
  // const user = useContext(MyUserContext);

  const loadPayments = async () => {
    const token = await AsyncStorage.getItem("token");
    if (page > 0) {
      let url = `${endpoints['get_payment']}?page=${page}`;
      console.log("URL:", url);
      try {
        setLoading(true);
        let res = await authAPI(token).get(url);
        console.log(res.data);
        setPayments(res.data.results.slice(0, 3));
        if (res.data.next === null) setPage(0);
      } catch (error) {
        console.error("Error fetching payments:", error);
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
    }
  }

  const loadPackages = async () => {
    const token = await AsyncStorage.getItem("token");
    let url = `${endpoints['get_package']}?page=1`;
    try {
      let res = await authAPI(token).get(url);
      setPackages(res.data.results.slice(0, 3));
    } catch (error) {
      console.error("Error fetching packages:", error.response);
    }
  }

  useEffect(() => {
    loadPayments()
  }, []);

  useEffect(() => {
    loadPackages()
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
        </View>
        <View>
          <IconButton
            icon="bell-outline"
            size={28}
            style={styles.notificationButton}
            color="#222"
          />
          <Badge style={styles.notificationBadge} size={10} />
        </View>
      </View>

      {/* Quick Summary */}
      <Card style={{ marginBottom: 24 }}>
        <Card.Title title="Quick Summary" titleStyle={{ fontWeight: 'bold', fontSize: 18 }} />
        <Card.Content>
          <View style={styles.summaryItems}>
            <View style={styles.summaryItem}>
              <Avatar.Icon icon="credit-card-outline" size={50} style={{ backgroundColor: '#e3f0fc' }} color="#4299e1" />
              <Text style={styles.summaryValue}>3</Text>
              <Text style={styles.summaryLabel}>Unpaid Bills</Text>
            </View>
            <View style={styles.summaryItem}>
              <Avatar.Icon icon="cube-outline" size={50} style={{ backgroundColor: '#fff7e6' }} color="#f6ad55" />
              <Text style={styles.summaryValue}>1</Text>
              <Text style={styles.summaryLabel}>Pending Packages</Text>
            </View>
            <View style={styles.summaryItem}>
              <Avatar.Icon icon="comment-outline" size={50} style={{ backgroundColor: '#e6f9f2' }} color="#48bb78" />
              <Text style={styles.summaryValue}>3</Text>
              <Text style={styles.summaryLabel}>Active Surveys</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Pending Payments */}
      <View style={styles.section}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>Pending Payments</Text>
    <Button
      compact
      uppercase={false}
      onPress={() => nav.navigate('FullPayment')}
    >
      See All
    </Button>
  </View>
    {payments.map((item, idx) => (
      <TouchableOpacity
        key={item.id || idx}
        activeOpacity={0.8}
        // Thêm onPress nếu muốn chuyển trang chi tiết payment
        onPress={() => nav.navigate('PaymentDetail', { paymentId: item.id })}
      >
        <Card style={styles.paymentCard}>
          <Card.Content style={styles.paymentCardContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.paymentTitle}>{item.payment_title || 'No Title'}</Text>
              <Text style={styles.paymentDescription}>
                {item.payment_type ? capitalize(item.payment_type) : ''}
              </Text>
              <Text style={styles.paymentDueDate}>Due: {getDateTimeString(item.payment_due)}</Text>
            </View>
            <View style={styles.paymentRightContent}>
              <Text style={styles.paymentAmount}>
                {item.money ? `${Number(item.money).toLocaleString('vi-VN')} VNĐ` : ''}
              </Text>
              <Badge style={{ backgroundColor: '#4299e1', marginTop: 4 }}>
                {item.payment_status ? capitalize(item.payment_status) : ''}
              </Badge>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
      ))}
    </View>

    {/* Pending Packages */}
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Pending Packages</Text>
        <Button compact uppercase={false} onPress={() => nav.navigate('FullPackage')}>See All</Button>
      </View>
      {packages.map((item, idx) => (
        <TouchableOpacity
          key={item.id || idx}
          onPress={() => nav.navigate('PackageDetail', { lockeritem_id: item.id })}
          activeOpacity={0.8}
        >
          <Card style={styles.lockerCard}>
            <Card.Content style={styles.lockerCardContent}>
              <Avatar.Icon icon="package-variant-closed" size={50} style={{ backgroundColor: '#fff7e6', marginRight: 12 }} color="#f6ad55" />
              <View style={styles.packageInfo}>
                <Text style={styles.packageName}>{item.item_name}</Text>
                <Text style={styles.packageDescription}>{item.item_image ? "Có hình ảnh" : "Không có hình ảnh"}</Text>
                <Text style={styles.packageDate}>Received: {item.created_date}</Text>
              </View>
              <Badge style={{ backgroundColor: '#f6ad55', alignSelf: 'flex-start' }}>
                {item.status ? capitalize(item.status) : ''}
              </Badge>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </View>

      {/* Quick Actions */}
      <Card style={styles.quickActionsCard}>
        <Card.Title title="Quick Actions" titleStyle={{ fontWeight: 'bold', fontSize: 18 }} />
        <Divider />
        <Card.Content style={{ padding: 0 }}>
          <Button
            icon="car-outline"
            contentStyle={styles.quickAction}
            labelStyle={styles.quickActionText}
            onPress={() => nav.navigate('Vehicle')}
          >
            Manage Vehicles
          </Button>
          <Divider style={styles.divider} />
          <Button
            icon="message-outline"
            contentStyle={styles.quickAction}
            labelStyle={styles.quickActionText}
            onPress={() => nav.navigate('Community')}
          >
            Submit Feedback
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}