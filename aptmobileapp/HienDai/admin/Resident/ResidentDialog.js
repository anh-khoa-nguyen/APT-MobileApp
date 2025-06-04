import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Text, Dialog, Portal, IconButton, Button } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";

const ResidentDialog = ({
  visible,
  onDismiss,
  selectedResident,
  apartments,
  apartmentsWithResident,
  reloadResidents,
  reloadApartments
}) => {
  const [newApt, setNewApt] = useState('');
  const [transferring, setTransferring] = useState(false);

  React.useEffect(() => {
    if (visible) setNewApt('');
  }, [visible, selectedResident]);

  const handleSelectApt = (apt) => setNewApt(apt);

  const handleTransfer = async () => {
    console.log("Transferring to:", newApt);
    console.log("Selected resident:", selectedResident);
    if (!selectedResident || !newApt) return;
    setTransferring(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const aptObj = apartments.find(a => a.name === newApt);
      if (!aptObj) throw new Error("Apartment not found");
      await authAPI(token).post(
        endpoints.transfer_apartment(aptObj.id),
        { new_resident_id: selectedResident.user_id }
      );
      Alert.alert("Success", "Chuyển căn hộ thành công!");
      onDismiss();
      reloadResidents && reloadResidents();
      reloadApartments && reloadApartments();
    } catch (error) {
      console.error("Transfer error:", error.message);
      Alert.alert("Error", "Transfer failed!");
    } finally {
      setTransferring(false);
    }
  };

  if (!selectedResident) return null;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>
          Transfer Apartment
          <IconButton
            icon="close"
            size={22}
            style={styles.dialogClose}
            onPress={onDismiss}
          />
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogInfoBox}>
            <Text>
              Transferring apartment for: <Text style={styles.dialogHighlight}>{selectedResident.name}</Text>
            </Text>
            <Text>
              Current apartment:{" "}
              <Text style={styles.dialogHighlight}>
                {
                  apartments.find(a => a.resident_id === selectedResident.id)?.name || 'N/A'
                }
              </Text>
            </Text>
          </View>
          <Text style={styles.dialogLabel}>Select New Apartment</Text>
          <ScrollView style={{ maxHeight: 200 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
            
            {apartmentsWithResident.map((apt, idx) => (
              <TouchableOpacity
                key={apt.id || apt.name || idx}
                style={[
                  styles.aptBtn,
                  { marginRight: 10, marginBottom: 10 },
                  newApt === apt.name && styles.aptBtnSelected
                ]}
                onPress={() => handleSelectApt(apt.name)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.aptBtnLabel,
                  newApt === apt.name && styles.aptBtnLabelSelected
                ]}>
                  {apt.name}
                </Text>
                <Text style={{ fontSize: 12, color: apt.resident ? '#1976D2' : '#888' }}>
                  {apt.resident ? `(${apt.resident.name})` : '(Chưa có cư dân)'}
                </Text>
              </TouchableOpacity>
            ))}
            
          </View>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button mode="outlined" onPress={onDismiss} style={styles.dialogBtn} labelStyle={styles.dialogBtnLabel}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleTransfer}
            style={styles.dialogBtnPrimary}
            labelStyle={styles.dialogBtnPrimaryLabel}
            disabled={!newApt || transferring}
            loading={transferring}
          >
            Transfer
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ResidentDialog;