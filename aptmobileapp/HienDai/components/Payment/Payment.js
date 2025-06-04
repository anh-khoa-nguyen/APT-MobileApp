import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, ActivityIndicator, Modal, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Badge, Searchbar, TextInput, IconButton } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { registerTranslation } from 'react-native-paper-dates';
import vi from 'date-fns/locale/vi';

import { styles } from './style';

import { authAPI, endpoints } from "../../configs/Apis";
import { capitalize, usePaginatedApi } from '../../configs/Utils';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' },
];

const TYPE_IMAGES = {
  electricity: { uri: 'https://media.istockphoto.com/id/1368169112/vector/money-green-seamless-pattern-vector-background-included-line-icons-as-piggy-bank-wallet.jpg?s=612x612&w=0&k=20&c=qjIUpnUPtiKGBgLnXGLQ_4qQUq36OvP82DIFTAdch70=' }, // điện
  water: { uri: 'https://media.istockphoto.com/id/1368169112/vector/money-green-seamless-pattern-vector-background-included-line-icons-as-piggy-bank-wallet.jpg?s=612x612&w=0&k=20&c=qjIUpnUPtiKGBgLnXGLQ_4qQUq36OvP82DIFTAdch70=' },      // nước
  vihicle: { uri: 'https://media.istockphoto.com/id/1368169112/vector/money-green-seamless-pattern-vector-background-included-line-icons-as-piggy-bank-wallet.jpg?s=612x612&w=0&k=20&c=qjIUpnUPtiKGBgLnXGLQ_4qQUq36OvP82DIFTAdch70=' },   // xe
  other: { uri: 'https://media.istockphoto.com/id/1368169112/vector/money-green-seamless-pattern-vector-background-included-line-icons-as-piggy-bank-wallet.jpg?s=612x612&w=0&k=20&c=qjIUpnUPtiKGBgLnXGLQ_4qQUq36OvP82DIFTAdch70=' },
};

export default function Payment() {
  // ================ Variables ================
  const [filter, setFilter] = useState('');
  const [q, setQ] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const nav = useNavigation();
  registerTranslation('vi', {
    ...vi,
    save: 'Lưu',
    close: 'Đóng',
    selectSingle: 'Chọn ngày',
    selectMultiple: 'Chọn nhiều ngày',
    selectRange: 'Chọn khoảng ngày',
    notAccordingToDateFormat: inputFormat => `Ngày phải theo định dạng: ${inputFormat}`,
    mustBeHigherThan: date => `Phải sau: ${date}`,
    mustBeLowerThan: date => `Phải trước: ${date}`,
    mustBeBetween: (startDate, endDate) => `Phải trong khoảng: ${startDate} - ${endDate}`,
    dateIsDisabled: 'Ngày này không được chọn',
    previous: 'Trước',
    next: 'Sau',
    typeInDate: 'Nhập ngày',
    pickDateFromCalendar: 'Chọn từ lịch',
    closePicker: 'Đóng',
  });

  // Advanced search state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [moneyStart, setMoneyStart] = useState('');
  const [moneyEnd, setMoneyEnd] = useState('');
  const [dueStart, setDueStart] = useState('');
  const [dueEnd, setDueEnd] = useState('');
  const [paymentType, setPaymentType] = useState('');

  const [showDueStartPicker, setShowDueStartPicker] = useState(false);
  const [showDueEndPicker, setShowDueEndPicker] = useState(false);

  // ================ Handle Picker ================
  const handleDueStartConfirm = ({ date }) => {
    setShowDueStartPicker(false);
    if (date) {
      const formatted = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      setDueStart(formatted);
    }
  };

  const handleDueEndConfirm = ({ date }) => {
    setShowDueEndPicker(false);
    if (date) {
      const formatted = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      setDueEnd(formatted);
    }
  };
  // ================ Functions ================
  const buildQuery = () => {
    let params = [];
    if (q) params.push(`q=${encodeURIComponent(q)}`);
    if (filter !== 'all') params.push(`payment_status=${filter}`);
    if (moneyStart) params.push(`money_start=${moneyStart}`);
    if (moneyEnd) params.push(`money_end=${moneyEnd}`);
    if (dueStart) params.push(`due_start=${dueStart}`);
    if (dueEnd) params.push(`due_end=${dueEnd}`);
    if (paymentType) params.push(`payment_type=${paymentType}`);
    return params.length > 0 ? '&' + params.join('&') : '';
  };

  const loadPayment = async () => {
    if (!hasMore && page !== 1) return;
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    let url = `${endpoints['get_payment']}?page=${page}${buildQuery()}`;
    console.log("Loading payments from URL:", url);
    try {
      let res = await authAPI(token).get(url);
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
  }, [q, moneyStart, moneyEnd, dueStart, dueEnd, paymentType, page, filter]);

  const loadMore = () => {
    if (!loading && hasMore && payments.length > 0) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [q, moneyStart, moneyEnd, dueStart, dueEnd, paymentType, filter]);
  // ================ Effects ================

  const filteredPayments =
    filter === 'All'
      ? payments
      : payments.filter((item) => capitalize(item.payment_status) === filter);

  // ================ Render Component ================
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => nav.navigate('PaymentDetail', { paymentId: item.id })}
    >
      <Card style={styles.paymentCard}>
        <ImageBackground
          source={TYPE_IMAGES[item.payment_type] || TYPE_IMAGES.other}
          style={styles.paymentCardBg}
          imageStyle={{ borderRadius: 16, opacity: 0.18 }}
        >
          <Card.Content style={styles.paymentCardContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.paymentTitle}>{item.payment_title || 'No Title'}</Text>
              <Text style={styles.paymentDescription}>
                {item.payment_type ? capitalize(item.payment_type) : ''}
              </Text>
              <Text style={styles.paymentDate}>
                {item.payment_status === 'paid'
                  ? `Paid on: ${item.updated_date?.slice(0, 10)}`
                  : `Due: ${item.payment_due?.slice(0, 10)}`}
              </Text>
            </View>
            <View style={styles.paymentRightContent}>
              <Text style={styles.paymentAmount}>
                {item.money ? `${Number(item.money).toLocaleString('vi-VN')} VNĐ` : ''}
              </Text>
              <Badge
                style={[
                  styles.statusBadge,
                  item.payment_status === 'paid'
                    ? styles.paidBadge
                    : styles.unpaidBadge,
                ]}
              >
                {capitalize(item.payment_status)}
              </Badge>
            </View>
          </Card.Content>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );

  // ================ Render UI ================
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
          <IconButton
            icon="chevron-down"
            size={24}
            onPress={() => setShowAdvanced(true)}
            style={{ marginLeft: 8 }}
          />
        </View>
        <Searchbar
          placeholder="Enter your keywords ..."
          value={q}
          onChangeText={setQ}
        />
      </View>

      {/* Hộp thoại tìm kiếm nâng cao */}
      <Modal
        visible={showAdvanced}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAdvanced(false)}
      >
        <View style={styles.advancedModalOverlay}>
          <View style={styles.advancedModalContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Advanced Search:</Text>
            <Text style={{ marginBottom: 4 }}>Money:</Text>
            <TextInput
              label="From (VNĐ)"
              value={moneyStart}
              onChangeText={setMoneyStart}
              keyboardType="numeric"
              style={{ marginBottom: 8 }}
            />
            <TextInput
              label="To (VNĐ)"
              value={moneyEnd}
              onChangeText={setMoneyEnd}
              keyboardType="numeric"
              style={{ marginBottom: 8 }}
            />
            <Text style={{ marginBottom: 4 }}>Due:</Text>
            <Text style={{ marginBottom: 4 }}>From (dd-mm-yyyy)</Text>
            <Button
              mode="outlined"
              onPress={() => setShowDueStartPicker(true)}
              style={{ marginBottom: 8 }}
            >
              {dueStart ? dueStart : 'Start date'}
            </Button>
            <DatePickerModal
              locale="vi"
              mode="single"
              visible={showDueStartPicker}
              onDismiss={() => setShowDueStartPicker(false)}
              date={dueStart ? new Date(dueStart.split('-').reverse().join('-')) : new Date()}
              onConfirm={handleDueStartConfirm}
            />

            <Text style={{ marginBottom: 4 }}>To (dd-mm-yyyy)</Text>
            <Button
              mode="outlined"
              onPress={() => setShowDueEndPicker(true)}
              style={{ marginBottom: 8 }}
            >
              {dueEnd ? dueEnd : 'End date'}
            </Button>
            <DatePickerModal
              locale="vi"
              mode="single"
              visible={showDueEndPicker}
              onDismiss={() => setShowDueEndPicker(false)}
              date={dueEnd ? new Date(dueEnd.split('-').reverse().join('-')) : new Date()}
              onConfirm={handleDueEndConfirm}
            />
            <Text style={{ marginBottom: 4 }}>Type:</Text>
            <TextInput
              label="Type (water, electricity, ...)"
              value={paymentType}
              onChangeText={setPaymentType}
              style={{ marginBottom: 8 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button
                onPress={() => {
                  setMoneyStart('');
                  setMoneyEnd('');
                  setDueStart('');
                  setDueEnd('');
                  setPaymentType('');
                  setShowAdvanced(false);
                }}
                style={{ marginRight: 8 }}
              >
                Reset
              </Button>
              <Button onPress={() => setShowAdvanced(false)}>Close</Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Payments Section */}
      <FlatList
        data={payments}
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