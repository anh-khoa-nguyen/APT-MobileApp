import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { styles } from './stylesD_s';
import RenderHtml from 'react-native-render-html';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../../configs/Apis";
import { endpoints } from "../../configs/Apis";

export default function SurveyDetails({ route }) {
  const surveyid = route?.params?.surveyId;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({}); // { [questionId]: optionId }
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        // 1. Kiểm tra có response cũ không
        const resResponse = await authAPI(token).get(`/surveys/${surveyid}/get_response/`);
        if (resResponse.data && Array.isArray(resResponse.data.responses) && resResponse.data.responses.length > 0) {
          // Hiện thông báo khôi phục tiến độ
          Alert.alert('Progress Restored', 'Your progress has been restored.');
          // Tự động tích chọn đáp án
          const restored = {};
          resResponse.data.responses.forEach(r => {
            restored[r.question] = r.option;
          });
          setAnswers(restored);
        }
        // 2. Lấy danh sách câu hỏi
        const res = await authAPI(token).get(endpoints['get_question'](surveyid));
        setQuestions(res.data);
      } catch (error) {
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [surveyid]);

  const handleSelect = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const submitResponses = async () => {
    setSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const responses = Object.entries(answers).map(([question, option]) => ({
        question: Number(question),
        option,
      }));
      const payload = { responses };
      await authAPI(token).post(endpoints['sub_survey'](surveyid), payload);
      Alert.alert('Success', 'Survey submitted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit survey. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    const missing = questions.filter(q => q.mandatory && !answers[q.id]);
    if (missing.length > 0) {
      Alert.alert('Warning', 'Please answer all mandatory questions (*) before submitting.');
      return;
    }

    Alert.alert(
      'Confirmation',
      'Are you sure you have completed the survey?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: submitResponses
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {questions.map((q, idx) => (
        <Card key={q.id} style={styles.cardSurvey}>
          <Card.Content>
            <View style={styles.questionRow}>
              <RenderHtml
                contentWidth={300}
                source={{ html: `<b>Q${idx + 1}.</b> ${q.content}` }}
                baseStyle={{ fontSize: 16, fontWeight: '500', color: '#222' }}
              />
              {q.mandatory && (
                <Text style={{ color: 'red', marginLeft: 4 }}>*</Text>
              )}
            </View>
            {q.options.map((opt, optIdx) => (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionRow,
                  answers[q.id] === opt.id && { backgroundColor: '#e8eefc' }
                ]}
                onPress={() => handleSelect(q.id, opt.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionRadio}>
                  {answers[q.id] === opt.id && (
                    <View style={styles.optionRadioChecked} />
                  )}
                </View>
                <Text style={styles.optionLabel}>
                  {String.fromCharCode(65 + optIdx)}.
                </Text>
                <RenderHtml
                  contentWidth={220}
                  source={{ html: opt.option_text }}
                  baseStyle={{ fontSize: 15, color: '#333' }}
                />
              </TouchableOpacity>
            ))}
          </Card.Content>
        </Card>
      ))}
      <Button
        mode="contained"
        style={styles.submitBtn}
        labelStyle={styles.submitLabel}
        loading={submitting}
        disabled={submitting}
        onPress={handleSubmit}
      >
        Submit Survey
      </Button>
    </ScrollView>
  );
}