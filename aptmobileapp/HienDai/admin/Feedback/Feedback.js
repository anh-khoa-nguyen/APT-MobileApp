import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, Button, TextInput, Chip, Portal, Dialog, IconButton } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { Searchbar } from 'react-native-paper';
import { getDateTimeString } from '../../configs/Utils'; // Thêm dòng này nếu đã có hàm này
import FeedbackDialog from './FeedbackDialog';

const STATUS_COLORS = {
  'New': { background: '#1976D2', color: '#fff' },
  'In Progress': { background: '#ECEFF1', color: '#1976D2' },
  'Resolved': { background: '#E8F5E9', color: '#388E3C' },
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
      <FeedbackDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        feedback={selected}
        loading={detailLoading}
      />
    </View>
  );
};

export default FeedbackAdmin;