import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Badge, Button, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";
import { getDateTimeString } from '../../configs/Utils';


const STATUS_COLORS = {
  'In-progress': { backgroundColor: '#FFD966', color: '#fff' },
  'Pending': { backgroundColor: '#FFD966', color: '#fff' },
  'Resolved': { backgroundColor: '#3DC47E', color: '#fff' },
  'Completed': { backgroundColor: '#D1FADF', color: '#12B76A' },
  'Open': { backgroundColor: '#F2F4F7', color: '#222' },
};

export default function Feedback() {
  // Đặt các hook vào đây
  const [tab, setTab] = useState('Surveys');
  const [surveys, setSurveys] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const nav = useNavigation();

  const loadSurveys = async () => {
    if (!hasMore) return;
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    let url = `${endpoints['get_survey']}?page=${page}`;
    try {
      let res = await authAPI(token).get(url);
      console.log('Surveys:', res.data.results);
      setSurveys(prev => [...prev, ...res.data.results]);
      setHasMore(res.data.next !== null);
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const loadFeedbacks = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      let res = await authAPI(token).get(endpoints['get_feedback']);
      console.log('Feedbacks:', res.data.results);
      setFeedbacks(res.data.results);
    } catch (error) {
      setFeedbacks([]);
      console.error("Error fetching feedbacks:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (tab === 'Surveys') {
    setPage(1);
    setHasMore(true);
    setSurveys([]);
  } else if (tab === 'Feedbacks') {
    loadFeedbacks();
  }
}, [tab]);

useEffect(() => {
  if (tab === 'Surveys') loadSurveys();
}, [page]);

  const loadMore = () => {
    if (!loading && hasMore && tab === 'Surveys') setPage(prev => prev + 1);
  };

  // Sửa lại renderSurvey cho đúng dữ liệu API
  const renderSurvey = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => nav.navigate('SurveyDetails', { surveyId: item.id })}
    >
      <Card style={styles.feedbackCard}>
        <Card.Content style={styles.feedbackCardContent}>
          <View style={styles.feedbackCardRow}>
            <Text style={styles.feedbackTitle}>{item.title}</Text>
          </View>
          <Text style={styles.feedbackDescription} numberOfLines={2}>{item.description}</Text>
          <View style={styles.surveyFooterRow}>
            <View>
              <Text style={styles.feedbackDate}>
                {`From: ${item.start_date?.slice(0, 10)}`}
              </Text>
              <Text style={styles.feedbackDate}>
                {`To: ${item.end_date?.slice(0, 10)}`}
              </Text>
            </View>
            <Button
              mode="text"
              style={styles.surveyActionButton}
              labelStyle={styles.surveyActionButtonLabel}
              compact
              icon="chevron-right"
              contentStyle={{ flexDirection: 'row-reverse' }}
              onPress={() => nav.navigate('SurveyDetails', { surveyId: item.id })}
            >
              Take Survey
            </Button>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderFeedback = ({ item }) => {
  const created = getDateTimeString(item.created_date);
  const updated = getDateTimeString(item.updated_date);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => nav.navigate('FeedbackDetails', { feedbackId: item.id })}
    >
      <Card style={styles.feedbackCard}>
        <Card.Content style={styles.feedbackCardContent}>
          <View style={styles.feedbackCardRow}>
            <Text style={styles.feedbackTitle}>{item.title}</Text>
            <Badge
              style={[
                styles.statusBadge,
                item.resolve_status
                  ? STATUS_COLORS['Resolved']
                  : STATUS_COLORS['Pending'],
              ]}
            >
              {item.resolve_status ? 'Resolved' : 'Pending'}
            </Badge>
          </View>
          <Text style={styles.feedbackDescription} numberOfLines={2}>{item.content}</Text>
          <View style={{ flexDirection: 'column',marginTop: 4 }}>
            <Text style={styles.feedbackDate}>
              Created date: {created}
            </Text>
            {created !== updated && (
              <Text style={styles.feedbackDate}>
                Last responded: {updated}
              </Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.contentWrapper}>
        <View style={styles.tabRow}>
          <TouchableRipple
            style={[
              styles.tabButton,
              tab === 'Surveys' && styles.tabButtonActive,
            ]}
            onPress={() => setTab('Surveys')}
            rippleColor="#e8eefc"
          >
            <View style={styles.tabButtonContent}>
              <Icon
                name="message-outline"
                size={22}
                color={tab === 'Surveys' ? '#3B5BDB' : '#888'}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.tabButtonLabel, tab === 'Surveys' && styles.tabButtonLabelActive]}>
                Surveys
              </Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.tabButton,
              tab === 'Feedbacks' && styles.tabButtonActive,
            ]}
            onPress={() => setTab('Feedbacks')}
            rippleColor="#e8eefc"
          >
            <View style={styles.tabButtonContent}>
              <Icon
                name="clipboard-list-outline"
                size={22}
                color={tab === 'Feedbacks' ? '#3B5BDB' : '#888'}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.tabButtonLabel, tab === 'Feedbacks' && styles.tabButtonLabelActive]}>
                Feedbacks
              </Text>
            </View>
          </TouchableRipple>
        </View>
      
        {/* Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {tab === 'Feedbacks' ? 'Feedback' : 'Available Surveys'}
          </Text>
          {tab === 'Feedbacks' && (
            <Button
              mode="contained"
              style={styles.newFeedbackButton}
              labelStyle={styles.newFeedbackButtonLabel}
              compact
              onPress={() => nav.navigate('FeedbackCreate')}
            >
              New Feedback
            </Button>
          )}
        </View>
      </View>
      {/* Feedback List */}
      {tab === 'Feedbacks' && (
        <FlatList
          data={feedbacks}
          renderItem={renderFeedback}
          keyExtractor={(item, idx) => idx.toString()}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={loading && <ActivityIndicator style={{ margin: 16 }} />}
        />
      )}

      {/* Surveys List */}
      {tab === 'Surveys' && (
        <FlatList
          data={surveys}
          renderItem={renderSurvey}
          keyExtractor={item => item.id?.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={loading && <ActivityIndicator style={{ margin: 16 }} />}
        />
      )}
    </View>
  );
}