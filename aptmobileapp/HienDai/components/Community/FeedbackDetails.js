import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Card, Text, Badge } from 'react-native-paper';
import { styles } from './stylesD_f';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../../configs/Apis";
import RenderHtml from 'react-native-render-html';
import { formatDate } from '../../configs/Utils';
import { endpoints } from "../../configs/Apis";
import { tagsStyles } from '../../Styles/MyStyles';
import he from 'he';

const STATUS_COLORS = {
  false: { backgroundColor: '#FFD966', color: '#fff' }, // Chưa giải quyết
  true: { backgroundColor: '#3DC47E', color: '#fff' },  // Đã giải quyết
};

export default function FeedbackDetails({ route }) {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  const feedbackId = route?.params?.feedbackId;
  console.log('feedbackId:', feedbackId);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        console.log(endpoints['get_feedback_detail'](feedbackId))
        const res = await authAPI(token).get(endpoints['get_feedback_detail'](feedbackId));
        // console.log('Feedback details:', res.data.content);
        console.log('HTML render:', he.decode(res.data.content || ''));

        setFeedback(res.data);
      } catch (error) {
        setFeedback(null);
        console.error("Error fetching feedback details:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [feedbackId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!feedback) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Không tìm thấy phản hồi.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{feedback.title}</Text>
            <Badge style={[styles.statusBadge, STATUS_COLORS[feedback.resolve_status]]}>
              {feedback.resolve_status ? 'Resolved' : 'Pending'}
            </Badge>
          </View>
          <Text style={styles.submittedText}>Submitted on {formatDate(feedback.created_date)}</Text>
          {/* Nội dung dạng HTML */}
          <RenderHtml
            contentWidth={350}
            source={{ html: he.decode(feedback.content || '') }}
            baseStyle={styles.description}
            enableCSSInlineProcessing={true}
            tagsStyles={tagsStyles}
/>
          {feedback.fbimg && (
            <Image source={{ uri: feedback.fbimg }} style={styles.image} resizeMode="cover" />
          )}
        </Card.Content>
      </Card>

      {/* Chỉ hiện khi có phản hồi từ ban quản lý */}
      {feedback.fbres && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.responseTitle}>Management Response</Text>
            <View style={styles.responseBox}>
              <Text style={styles.responseContent}>
                {feedback.fbres}
              </Text>
            </View>
            <Text style={styles.responseDate}>
              Responded on: {formatDate(feedback.updated_date)}
            </Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}