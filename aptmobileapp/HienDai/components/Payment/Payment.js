import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Badge, Searchbar } from 'react-native-paper';
import { styles } from './style';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { capitalize } from '../../configs/Utils';
import { useNavigation, useFocusEffect } from '@react-navigation/native';



const FILTERS = [
  { label: 'All', value: 'All' },
  { label: 'Unpaid', value: 'Unpaid' },
  { label: 'Paid', value: 'Paid' },
];

export default function Payment() {
  const [filter, setFilter] = useState('All');
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [q, setQ] = useState('');
  const nav = useNavigation();

  const loadPayment = async () => {
    if (!hasMore && page !== 1) return;
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    let url = `${endpoints['get_payment']}?page=${page}`;
    if (q) {
      url = `${url}&q=${q}`;
    }
    console.log(url)
    try {
      let res = await authAPI(token).get(url);
      console.log("Danh sách hóa đơn:", res.data.results); // Thêm dòng này
      if (page === 1) {
        setPayments(res.data.results);
      } else {
        setPayments(prev => [...prev, ...res.data.results]);
      }
      setHasMore(res.data.next !== null);
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      loadPayment();
    }, 500);

    return () => clearTimeout(timer);
  }, [q, page]);

  const loadMore = () => {
    if (!loading && hasMore && payments.length > 0) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    // Không cần setPayments([]) ở đây, vì loadPayment sẽ tự reset khi page === 1
  }, [q, filter]);

  const filteredPayments =
    filter === 'All'
      ? payments
      : payments.filter((item) => capitalize(item.payment_status) === filter);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => nav.navigate('PaymentDetail', { paymentId: item.id })}
    >
      <Card style={styles.paymentCard}>
        <Card.Content style={styles.paymentCardContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>{item.payment_title || 'No Title'}</Text>
            <Text style={styles.paymentDescription}>
              {item.payment_type ? capitalize(item.payment_type) : ''}
            </Text>
            <Text style={styles.paymentDate}>
              {item.payment_status === 'paid'
                ? `Paid on: ${item.updated_date?.slice(0, 10)}`
                : `Due: ${item.created_date?.slice(0, 10)}`}
            </Text>
          </View>
          <View style={styles.paymentRightContent}>
            <Text style={styles.paymentAmount}>
              {item.money ? `${Number(item.money).toLocaleString('vi-VN')} VNĐ` : ''}
            </Text>
            <Badge
              style={[
                styles.statusBadge,
                item.payment_status?.toLowerCase() === 'paid'
                  ? styles.paidBadge
                  : styles.unpaidBadge,
              ]}
            >
              {capitalize(item.payment_status)}
            </Badge>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>

  );

  useFocusEffect(
    React.useCallback(() => {
      setPage(1);
      setHasMore(true);
      loadPayment();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Filter Section */}
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Filter:</Text>
          {FILTERS.map((f) => (
            <Button
              key={f.value}
              mode={filter === f.value ? 'contained' : 'outlined'}
              onPress={() => setFilter(f.value)}
              style={[
                styles.filterButton,
                filter === f.value && styles.filterButtonActive,
              ]}
              labelStyle={[
                styles.filterButtonLabel,
                filter === f.value && styles.filterButtonLabelActive,
              ]}
              compact
              uppercase={false}
            >
              {f.label}
            </Button>
          ))}
        </View>
        <Searchbar
          placeholder="Tìm kiếm hóa đơn ..."
          value={q}
          onChangeText={setQ}
        // style={{ marginVertical: 8 }}
        />
      </View>

      {/* Payments Section */}
      <FlatList
        data={filteredPayments}
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