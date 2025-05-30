import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text, TextInput, Portal, Dialog, IconButton, Chip } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import styles from './styles';

const FeedbackDialog = ({ visible, onDismiss, feedback, loading }) => {
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [localFeedback, setLocalFeedback] = useState(feedback);

  useEffect(() => {
    setReply('');
    setLocalFeedback(feedback);
  }, [feedback, visible]);

  const handleSendReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await authAPI(token).patch(
        endpoints['set_response'](feedback.id), 
        { response: reply }
      );
      setLocalFeedback({ ...localFeedback, fbres: reply });
      setReply('');
    } catch (error) {
      alert("Gửi phản hồi thất bại!");
    } finally {
      setSending(false);
    }
  };

  if (!localFeedback) return null;
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>
          <Text style={styles.dialogTitle}>{localFeedback.title}</Text>
          <IconButton icon="close" size={22} style={styles.dialogClose} onPress={onDismiss} />
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogInfoRow}>
            <Text style={styles.dialogFrom}>From: <Text style={styles.dialogFromName}>{localFeedback.resident_name}</Text></Text>
          </View>
          <View style={styles.dialogContentBox}>
            <Text style={styles.dialogContentText}>{localFeedback.content}</Text>
            {localFeedback.fbimg && (
              <Image
                source={{ uri: localFeedback.fbimg }}
                style={{ width: '100%', height: 200, marginTop: 12, borderRadius: 8 }}
                resizeMode="cover"
              />
            )}
          </View>
          <Text style={styles.dialogSectionTitle}>Status</Text>
          <View style={styles.dialogStatusRow}>
            <Chip style={localFeedback.status === 'New' ? styles.chipStatusActive : styles.chipStatus} textStyle={localFeedback.status === 'New' ? styles.chipStatusActiveText : styles.chipStatusText}>New</Chip>
            <Chip style={localFeedback.status === 'In Progress' ? styles.chipStatusActive : styles.chipStatus} textStyle={localFeedback.status === 'In Progress' ? styles.chipStatusActiveText : styles.chipStatusText}>In Progress</Chip>
            <Chip style={localFeedback.status === 'Resolved' ? styles.chipStatusActive : styles.chipStatus} textStyle={localFeedback.status === 'Resolved' ? styles.chipStatusActiveText : styles.chipStatusText}>Resolved</Chip>
          </View>
          {localFeedback.fbres && (
            <>
              <Text style={styles.dialogSectionTitle}>Admin Response</Text>
              <View style={styles.dialogMsgRow}>
                <Image source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={styles.dialogAvatar} />
                <View style={styles.dialogMsgBox}>
                  <Text style={styles.dialogMsgName}>Admin</Text>
                  <Text style={styles.dialogMsgContent}>{localFeedback.fbres}</Text>
                </View>
              </View>
            </>
          )}
          <Text style={styles.dialogSectionTitle}>Conversation</Text>
          <View style={styles.dialogMsgRow}>
            <Image source={{uri: 'https://randomuser.me/api/portraits/women/3.jpg'}} style={styles.dialogAvatar} />
            <View style={styles.dialogMsgBox}>
              <Text style={styles.dialogMsgName}>{localFeedback.from}</Text>
              <Text style={styles.dialogMsgContent}>{localFeedback.content}</Text>
              <Text style={styles.dialogMsgTime}>05:45</Text>
            </View>
          </View>
          <TextInput
            mode="outlined"
            placeholder="Type your reply..."
            style={styles.dialogInput}
            value={reply}
            onChangeText={setReply}
            right={
              <TextInput.Icon
                icon="send"
                onPress={handleSendReply}
                disabled={sending || !reply.trim()}
              />
            }
            editable={!localFeedback.fbres}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default FeedbackDialog;