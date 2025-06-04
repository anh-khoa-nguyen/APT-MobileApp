import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text, Card, Badge, Button, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { styles } from './stylesD';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


export default function PaymentDetails({ route }) {
  const { paymentId } = route.params; // lấy paymentId từ navigation
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigation();
  

  useFocusEffect(
    React.useCallback(() => {
      const fetchPayment = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = await AsyncStorage.getItem("token");
          if (!token) throw new Error("User not authenticated");
          const res = await authAPI(token).get(`${endpoints.get_payment}${paymentId}/`);
          setPayment(res.data);
        } catch (e) {
          setError("Không thể tải dữ liệu hóa đơn");
          setPayment(null);
        } finally {
          setLoading(false);
        }
      };
      fetchPayment();
    }, [paymentId])
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (error) return <Text style={{ margin: 40 }}>{error}</Text>;
  if (!payment) return <Text style={{ margin: 40 }}>Không tìm thấy hóa đơn</Text>;

  // Kiểm tra trạng thái thanh toán
const isPaid = payment.payment_status?.toLowerCase() === 'paid';
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>{payment.payment_title}</Text>
              <Text style={styles.headerSubtitle}>{payment.payment_type}</Text>
            </View>
            <Badge
              style={[
                styles.statusBadge,
                { backgroundColor: isPaid ? '#3DC47E' : '#3B82F6' }
              ]}
            >
              {isPaid ? 'Paid' : 'Unpaid'}
            </Badge>
          </View>

          {/* Amount Due */}
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>Amount Due</Text>
            <Text style={styles.amountValue}>
              {payment.money ? `$${payment.money}` : ''}
            </Text>
          </View>

          {/* Info Rows */}
          <View style={{ marginBottom: isPaid ? 18 : 0 }}>
            <View style={styles.detailRow}>
              <Icon name="calendar" size={26} color="#A3AED0" style={styles.detailIcon} />
              <View>
                <Text style={styles.detailLabel}>Due Date</Text>
                <Text style={styles.detailValue}>{payment.created_date}</Text>
              </View>
            </View>

            {isPaid && (
              <>
                <View style={styles.detailRow}>
                  <Icon name="calendar-check" size={26} color="#3DC47E" style={styles.detailIcon} />
                  <View>
                    <Text style={styles.detailLabel}>Payment Date</Text>
                    <Text style={styles.detailValue}>{payment.payment_due || 'N/A'}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="credit-card-outline" size={26} color="#3DC47E" style={styles.detailIcon} />
                  <View>
                    <Text style={styles.detailLabel}>Payment Method</Text>
                    <Text style={styles.detailValue}>{payment.payment_method || 'N/A'}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="identifier" size={26} color="#3DC47E" style={styles.detailIcon} />
                  <View>
                    <Text style={styles.detailLabel}>Transaction ID</Text>
                    <Text style={styles.detailValue}>{payment.payment_code || 'N/A'}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </Card.Content>
      </Card>

      {/* Payment Options (Unpaid) */}
      {!isPaid && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Payment Options</Text>
            <Text style={[styles.sectionTitle, { fontSize: 16, marginBottom: 2 }]}>Online Payment</Text>
            <Text style={{ color: '#888', marginBottom: 12 }}>Pay directly using one of our supported payment methods.</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                mode="contained"
                style={styles.momoBtn}
                labelStyle={styles.payBtnLabel}
                onPress={() => { nav.navigate('PaymentMomo', { paymentId: payment.id }) }}
              >
                Pay with MoMo
              </Button>
              <Button
                mode="contained"
                style={styles.zaloBtn}
                labelStyle={styles.payBtnLabel}
                onPress={() => {
                  // Xử lý thanh toán ZaloPay
                }}
              >
                Pay with ZaloPay
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Payment Receipt (Paid) */}
      {isPaid && payment.receipt_image && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Payment Receipt</Text>
            <Image
              source={{ uri: payment.receipt_image }}
              style={styles.receiptImage}
              resizeMode="cover"
            />
          </Card.Content>
        </Card>
      )}
    </View>
  );
}
