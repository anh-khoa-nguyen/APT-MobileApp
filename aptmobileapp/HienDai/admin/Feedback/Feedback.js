import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, Button, TextInput, Chip, Portal, Dialog, IconButton } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { Searchbar } from 'react-native-paper';
import { getDateTimeString } from '../../configs/Utils'; // Thêm dòng này nếu đã có hàm này


const STATUS_COLORS = {
  'New': { background: '#1976D2', color: '#fff' },
  'In Progress': { background: '#ECEFF1', color: '#1976D2' },
  'Resolved': { background: '#E8F5E9', color: '#388E3C' },
};

const PRIORITY_COLORS = {
  'High': { color: '#D32F2F', icon: 'alert' },
  'Medium': { color: '#FBC02D', icon: 'clock-outline' },
  'Low': { color: '#388E3C', icon: 'check-circle-outline' },
};


const FeedbackCard = ({ item, onPress }) => {
  const created = getDateTimeString ? getDateTimeString(item.created_date) : item.created_date?.slice(0, 10);
  const updated = getDateTimeString ? getDateTimeString(item.updated_date) : item.updated_date?.slice(0, 10);

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={() => onPress(item)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Chip style={item.resolve_status ? styles.chipResolved : styles.chipNew} textStyle={item.resolve_status ? styles.chipResolvedText : styles.chipNewText}>
            {item.resolve_status ? 'Resolved' : 'In Progress'}
          </Chip>
        </View>
        <Text style={styles.cardContent}>{item.content.replace(/<[^>]+>/g, '')}</Text>
        <Text style={styles.cardFrom}>
          From: <Text style={styles.cardFromName}>{item.resident_name}</Text>
        </Text>
        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.cardDate}>Created date: {created}</Text>
            {created !== updated && (
              <Text style={styles.cardDate}>Last responded: {updated}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FeedbackDetailDialog = ({ visible, onDismiss, feedback, loading }) => {
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
      // Cập nhật giao diện ngay sau khi gửi thành công
      setLocalFeedback({ ...localFeedback, fbres: reply });
      setReply('');
    } catch (error) {
      console.error("Error sending reply:", error.message);
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
          {/* Các button trạng thái */}
          <Text style={styles.dialogSectionTitle}>Status</Text>
          <View style={styles.dialogStatusRow}>
            <Chip style={localFeedback.status === 'New' ? styles.chipStatusActive : styles.chipStatus} textStyle={localFeedback.status === 'New' ? styles.chipStatusActiveText : styles.chipStatusText}>New</Chip>
            <Chip style={localFeedback.status === 'In Progress' ? styles.chipStatusActive : styles.chipStatus} textStyle={localFeedback.status === 'In Progress' ? styles.chipStatusActiveText : styles.chipStatusText}>In Progress</Chip>
            <Chip style={localFeedback.status === 'Resolved' ? styles.chipStatusActive : styles.chipStatus} textStyle={localFeedback.status === 'Resolved' ? styles.chipStatusActiveText : styles.chipStatusText}>Resolved</Chip>
          </View>
          {/* Hiển thị phản hồi của admin nếu có */}
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
          {/* Conversation giữ nguyên */}
          <Text style={styles.dialogSectionTitle}>Conversation</Text>
          <View style={styles.dialogMsgRow}>
            <Image source={{uri: 'https://randomuser.me/api/portraits/women/3.jpg'}} style={styles.dialogAvatar} />
            <View style={styles.dialogMsgBox}>
              <Text style={styles.dialogMsgName}>{localFeedback.from}</Text>
              <Text style={styles.dialogMsgContent}>{localFeedback.content}</Text>
              <Text style={styles.dialogMsgTime}>05:45</Text>
            </View>
          </View>
          {/* Ô nhập reply giữ nguyên */}
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

const FeedbackAdmin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [tab, setTab] = useState('All');
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    let timer = setTimeout(async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        let url = endpoints['get_feedback'];
        if (q) url = `${url}?q=${encodeURIComponent(q)}`;
        const res = await authAPI(token).get(url);
        console.log(res.data.results);
        setFeedbacks(res.data.results);
      } catch (error) {
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [q]);

  const handleCardPress = async (item) => {
    setDetailLoading(true);
    setDialogVisible(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await authAPI(token).get(endpoints['get_feedback_detail'](item.id));
      setSelected(res.data);
    } catch (error) {
      setSelected(item); // fallback nếu lỗi
    } finally {
      setDetailLoading(false);
    }
  };

  const filterFeedbacks = () => {
    let data = feedbacks;
    if (tab !== 'All') data = data.filter(f => {
      if (tab === 'Resolved') return f.resolve_status === true;
      if (tab === 'New') return f.resolve_status === false;
      return true;
    });
    if (search) data = data.filter(f => f.title.toLowerCase().includes(search.toLowerCase()));
    return data;
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Feedback</Text>
      </View> */}
      <View style={styles.searchRow}>
        <Searchbar
          placeholder="Search feedback..."
          value={search}
          onChangeText={text => {
            setSearch(text);
            setQ(text);
          }}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.tabRow}>
        {['All', 'New', 'In Progress', 'Resolved'].map(t => (
          <Chip
            key={t}
            style={tab === t ? styles.tabActive : styles.tab}
            textStyle={tab === t ? styles.tabActiveText : styles.tabText}
            onPress={() => setTab(t)}
          >
            {t}
          </Chip>
        ))}
      </View>
      <FlatList
        data={filterFeedbacks()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FeedbackCard item={item} onPress={handleCardPress} />
        )}
        contentContainerStyle={styles.listContent}
      />
      <FeedbackDetailDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        feedback={selected}
        loading={detailLoading}
      />
    </View>
  );
};

export default FeedbackAdmin;