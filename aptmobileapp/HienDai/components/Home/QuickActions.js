import { View, TouchableOpacity, Text } from 'react-native';

export default function QuickActions({ onManageVehicle, onFeedback }) {
  return (
    <View>
      <TouchableOpacity onPress={onManageVehicle}>
        <Text>🚗 Manage Vehicles</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onFeedback}>
        <Text>💬 Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}
