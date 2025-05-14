import { View, Text } from 'react-native';

export default function PaymentCardList({ payments }) {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Pending Payments</Text>
      {payments.map((item, index) => (
        <View key={index}>
          <Text>{item.title}</Text>
          <Text>{item.amount}</Text>
        </View>
      ))}
    </View>
  );
}
