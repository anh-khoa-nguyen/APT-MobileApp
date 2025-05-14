import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function QuickSummaryCard({ icon, count, label, color }) {
  return (
    <View style={styles.card}>
      <FontAwesome name={icon} size={24} color={color} />
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', marginHorizontal: 10 },
  count: { fontSize: 18, fontWeight: 'bold' },
  label: { fontSize: 12, color: '#888' },
});
