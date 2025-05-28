import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, Button, TextInput, Chip, Portal, Dialog, IconButton } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { Searchbar } from 'react-native-paper';


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


const FeedbackCard = ({ item, onPress }) => (
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
        <Text style={styles.cardDate}>{item.created_date?.slice(0, 10)}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const FeedbackDetailDialog = ({ visible, onDismiss, feedback }) => {
  if (!feedback) return null;
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>
          <Text style={styles.dialogTitle}>{feedback.title}</Text>
          <IconButton icon="close" size={22} style={styles.dialogClose} onPress={onDismiss} />
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogInfoRow}>
            <Text style={styles.dialogFrom}>From: <Text style={styles.dialogFromName}>{feedback.resident_name}</Text></Text>
            <Text style={styles.dialogDate}>{feedback.date}, {feedback.time}</Text>
            {feedback.status === 'New' && (
              <Chip style={styles.chipNew} textStyle={styles.chipNewText}>New</Chip>
            )}
          </View>
          <View style={styles.dialogContentBox}>
            <Text style={styles.dialogContentText}>{feedback.content}</Text>
          </View>
          <Text style={styles.dialogSectionTitle}>Status</Text>
          <View style={styles.dialogStatusRow}>
            <Chip style={feedback.status === 'New' ? styles.chipStatusActive : styles.chipStatus} textStyle={feedback.status === 'New' ? styles.chipStatusActiveText : styles.chipStatusText}>New</Chip>
            <Chip style={feedback.status === 'In Progress' ? styles.chipStatusActive : styles.chipStatus} textStyle={feedback.status === 'In Progress' ? styles.chipStatusActiveText : styles.chipStatusText}>In Progress</Chip>
            <Chip style={feedback.status === 'Resolved' ? styles.chipStatusActive : styles.chipStatus} textStyle={feedback.status === 'Resolved' ? styles.chipStatusActiveText : styles.chipStatusText}>Resolved</Chip>
          </View>
          <Text style={styles.dialogSectionTitle}>Priority</Text>
          <View style={styles.dialogPriorityRow}>
            <Chip style={feedback.priority === 'Low' ? styles.chipPriorityActiveLow : styles.chipPriority} textStyle={feedback.priority === 'Low' ? styles.chipPriorityActiveText : styles.chipPriorityText}>Low</Chip>
            <Chip style={feedback.priority === 'Medium' ? styles.chipPriorityActiveMedium : styles.chipPriority} textStyle={feedback.priority === 'Medium' ? styles.chipPriorityActiveText : styles.chipPriorityText}>Medium</Chip>
            <Chip style={feedback.priority === 'High' ? styles.chipPriorityActiveHigh : styles.chipPriority} textStyle={feedback.priority === 'High' ? styles.chipPriorityActiveText : styles.chipPriorityText}>High</Chip>
          </View>
          <Text style={styles.dialogSectionTitle}>Conversation</Text>
          <View style={styles.dialogMsgRow}>
            <Image source={{uri: 'https://randomuser.me/api/portraits/women/3.jpg'}} style={styles.dialogAvatar} />
            <View style={styles.dialogMsgBox}>
              <Text style={styles.dialogMsgName}>{feedback.from}</Text>
              <Text style={styles.dialogMsgContent}>{feedback.content}</Text>
              <Text style={styles.dialogMsgTime}>05:45</Text>
            </View>
          </View>
          <TextInput
            mode="outlined"
            placeholder="Type your reply..."
            style={styles.dialogInput}
            right={<TextInput.Icon icon="send" />}
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
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FeedbackCard item={item} onPress={f => { setSelected(f); setDialogVisible(true); }} />
        )}
        contentContainerStyle={styles.listContent}
      />
      <FeedbackDetailDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        feedback={selected}
      />
    </View>
  );
};

export default FeedbackAdmin;