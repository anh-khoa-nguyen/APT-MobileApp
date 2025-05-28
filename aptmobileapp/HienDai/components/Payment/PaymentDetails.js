import React from 'react';
import { View, Image } from 'react-native';
import { Text, Card, Badge, Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './stylesD'; // Đổi lại thành './styles' nếu bạn dùng styles.js

export default function PaymentDetails({ route }) {
  // Giả lập dữ liệu, bạn thay bằng route.params.payment nếu có
  const payment = route?.params?.payment || {
    payment_title: 'Management Fee - February 2023',
    payment_type: 'Monthly management fee for apartment A-101',
    money: 150,
    payment_status: 'Unpaid', // hoặc 'Paid'
    due_date: '2023-02-15',
    paid_on: '2023-01-10',
    payment_method: 'Banking',
    transaction_id: 'TRX123456',
    receipt_image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    bank: {
      name: 'Example Bank',
      account: '1234567890',
      owner: 'Apartment Management',
      reference: '3',
    },
  };

  const isPaid = payment.payment_status === 'Paid';

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
                <Text style={styles.detailValue}>{payment.due_date}</Text>
              </View>
            </View>
            {isPaid && (
              <>
                <View style={styles.detailRow}>
                  <Icon name="calendar-check" size={26} color="#3DC47E" style={styles.detailIcon} />
                  <View>
                    <Text style={styles.detailLabel}>Payment Date</Text>
                    <Text style={styles.detailValue}>{payment.paid_on}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="credit-card-outline" size={26} color="#3DC47E" style={styles.detailIcon} />
                  <View>
                    <Text style={styles.detailLabel}>Payment Method</Text>
                    <Text style={styles.detailValue}>{payment.payment_method}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="identifier" size={26} color="#3DC47E" style={styles.detailIcon} />
                  <View>
                    <Text style={styles.detailLabel}>Transaction ID</Text>
                    <Text style={styles.detailValue}>{payment.transaction_id}</Text>
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
            <Text style={[styles.sectionTitle, { fontSize: 16, marginBottom: 2 }]}>Bank Transfer</Text>
            <Text style={{ color: '#888', marginBottom: 10 }}>Transfer to our bank account and upload the receipt.</Text>
            <View style={styles.bankBox}>
              <Text style={{ color: '#222', fontWeight: 'bold' }}>Bank: <Text style={{ fontWeight: 'normal' }}>{payment.bank.name}</Text></Text>
              <Text style={{ color: '#222', fontWeight: 'bold' }}>Account: <Text style={{ fontWeight: 'normal' }}>{payment.bank.account}</Text></Text>
              <Text style={{ color: '#222', fontWeight: 'bold' }}>Name: <Text style={{ fontWeight: 'normal' }}>{payment.bank.owner}</Text></Text>
              <Text style={{ color: '#222', fontWeight: 'bold' }}>Reference: <Text style={{ fontWeight: 'normal' }}>{payment.bank.reference}</Text></Text>
            </View>
            <Button
              mode="outlined"
              style={styles.uploadBtn}
              labelStyle={styles.uploadBtnLabel}
              onPress={() => {}}
            >
              Upload Receipt
            </Button>
            <Divider style={{ marginVertical: 16 }} />
            <Text style={[styles.sectionTitle, { fontSize: 16, marginBottom: 2 }]}>Online Payment</Text>
            <Text style={{ color: '#888', marginBottom: 12 }}>Pay directly using one of our supported payment methods.</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                mode="contained"
                style={styles.momoBtn}
                labelStyle={styles.payBtnLabel}
                onPress={() => {}}
              >
                Pay with MoMo
              </Button>
              <Button
                mode="contained"
                style={styles.zaloBtn}
                labelStyle={styles.payBtnLabel}
                onPress={() => {}}
              >
                Pay with ZaloPay
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Payment Receipt (Paid) */}
      {isPaid && (
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