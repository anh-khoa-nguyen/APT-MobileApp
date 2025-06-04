import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Chip, IconButton, Portal, Dialog, TextInput, ActivityIndicator } from 'react-native-paper';
import styles from './styles';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";

import { useNavigation } from '@react-navigation/native';
import { usePaginatedApi } from '../../configs/Utils';

const STATUS_COLORS = {
  'Completed': { background: '#E8F5E9', color: '#388E3C' },
  'Active': { background: '#E3F2FD', color: '#1976D2' },
};

const QuestionTypeButton = ({ label, active, onPress }) => (
  <Button
    mode={active ? "contained" : "outlined"}
    onPress={onPress}
    style={[
      styles.qTypeBtn,
      active ? styles.qTypeBtnActive : styles.qTypeBtnInactive,
    ]}
    labelStyle={[
      styles.qTypeBtnLabel,
      active ? styles.qTypeBtnLabelActive : styles.qTypeBtnLabelInactive,
    ]}
    compact
  >
    {label}
  </Button>
);

// ============== Component ===============
const SurveyCard = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.8}>
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Chip
          style={[
            styles.statusChip,
            { backgroundColor: STATUS_COLORS[item.status].background },
          ]}
          textStyle={[
            styles.statusChipText,
            { color: STATUS_COLORS[item.status].color },
          ]}
        >
          {item.status}
        </Chip>
      </View>
      <Text style={styles.cardDesc}>{item.desc}</Text>
      <View style={styles.cardInfoRow}>
        <View style={styles.cardInfoItem}>
          <IconButton icon="calendar" size={18} style={styles.icon} />
          <Text style={styles.cardInfoText}>Expires: {item.expire}</Text>
        </View>
        <View style={styles.cardInfoItem}>
          <IconButton icon="cube-outline" size={18} style={styles.icon} />
          <Text style={styles.cardInfoText}>{item.questions} questions</Text>
        </View>
        <View style={styles.cardInfoItem}>
          <IconButton icon="account-group-outline" size={18} style={styles.icon} />
          <Text style={styles.cardInfoText}>{item.responses} responses</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        {item.canComplete && (
          <Button mode="outlined" style={styles.completeBtn} labelStyle={styles.completeBtnLabel}>
            Complete
          </Button>
        )}
        <Button mode="text" style={styles.deleteBtn} labelStyle={styles.deleteBtnLabel}>
          Delete
        </Button>
      </View>
    </View>
  </TouchableOpacity>
);

const SurveyAdmin = () => {
  // ============== Variables ===============
  const [dialogVisible, setDialogVisible] = useState(false);
  const nav = useNavigation();

  // ============== Functions ===============
  const { data: surveysRaw, loading, loadMore, setPage, hasMore } = usePaginatedApi(
    endpoints['get_survey']
  );
  
  console.log("Surveys Raw: ", surveysRaw);

  const surveys = (surveysRaw || []).map(s => ({
    id: s.id?.toString(),
    title: s.title,
    desc: s.description,
    expire: s.end_date ? new Date(s.end_date).toLocaleDateString('en-GB') : '',
    questions: s.question_count ?? 0,
    responses: s.responses ?? 0,
    status: s.active ? 'Active' : 'Completed',
    canComplete: !!s.active,
  }));

  const handlePressSurvey = (item) => {
    nav.navigate('SurveyAnalytics', { surveyId: item.id });
  };

  // ============== Render UI ===============
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Surveys</Text>
        <View style={{ flexDirection: 'row' }}> 
          <Button
            mode="contained"
            icon="plus"
            style={styles.createBtn}
            labelStyle={styles.createBtnLabel}
            onPress={() => nav.navigate('SurveyCreate')}
          >
            Create
          </Button>
          <Button
            mode="contained"
            style={styles.summaryBtn}
            labelStyle={styles.createBtnLabel}
            onPress={() => nav.navigate('SurveySummary', { surveys: surveysRaw || [] })} // truyền mảng kết quả
          >
            Summary
          </Button>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Surveys</Text>
      {loading && surveys.length === 0 ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={surveys}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SurveyCard item={item} onPress={handlePressSurvey} />
          )}
          contentContainerStyle={styles.listContent}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={hasMore && <ActivityIndicator style={{ margin: 16 }} />}
        />
      )}
    </View>
  );
};

export default SurveyAdmin;