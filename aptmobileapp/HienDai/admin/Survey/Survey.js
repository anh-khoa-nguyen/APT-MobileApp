import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button, Chip, IconButton, Portal, Dialog, TextInput, ActivityIndicator } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";

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

const CreateSurveyDialog = ({ visible, onDismiss }) => {
  const [qType, setQType] = useState('Multiple Choice');
  const [required, setRequired] = useState(false);
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState('');
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>
          <Text style={styles.dialogTitle}>Create New Survey</Text>
          <IconButton icon="close" size={22} style={styles.dialogClose} onPress={onDismiss} />
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogSectionTitle}>Questions</Text>
          <View style={styles.dialogBox}>
            <Text style={styles.dialogSubTitle}>Add New Question</Text>
            <Text style={styles.dialogLabel}>Question Text</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter question text"
              style={styles.dialogInput}
              value={question}
              onChangeText={setQuestion}
            />
            <Text style={styles.dialogLabel}>Question Type</Text>
            <View style={styles.qTypeRow}>
              <QuestionTypeButton label="Multiple Choice" active={qType === 'Multiple Choice'} onPress={() => setQType('Multiple Choice')} />
              <QuestionTypeButton label="Text" active={qType === 'Text'} onPress={() => setQType('Text')} />
              <QuestionTypeButton label="Rating" active={qType === 'Rating'} onPress={() => setQType('Rating')} />
            </View>
            <View style={styles.requiredRow}>
              <IconButton
                icon={required ? "checkbox-marked" : "checkbox-blank-outline"}
                size={22}
                style={styles.requiredCheckbox}
                color={required ? "#1976D2" : "#B0B0B0"}
                onPress={() => setRequired(!required)}
              />
              <Text style={styles.requiredLabel}>Required</Text>
            </View>
            <Text style={styles.dialogLabel}>Options</Text>
            <TextInput
              mode="outlined"
              placeholder="Option 1"
              style={styles.dialogInput}
              value={option}
              onChangeText={setOption}
            />
            <Button
              mode="text"
              icon="plus"
              style={styles.addOptionBtn}
              labelStyle={styles.addOptionLabel}
              onPress={() => {}}
            >
              Add Option
            </Button>
            <Button
              mode="contained"
              style={styles.addQuestionBtn}
              labelStyle={styles.addQuestionLabel}
              disabled
            >
              Add Question
            </Button>
          </View>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button mode="outlined" onPress={onDismiss} style={styles.dialogBtn} labelStyle={styles.dialogBtnLabel}>
            Cancel
          </Button>
          <Button mode="contained" style={styles.dialogBtnPrimary} labelStyle={styles.dialogBtnPrimaryLabel} disabled>
            Create Survey
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const SurveyCard = ({ item }) => (
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
);

const SurveyAdmin = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurveys = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await authAPI(token).get(endpoints['get_survey']);
        // Map dữ liệu API sang format giao diện
        const mapped = (res.data.results || []).map(s => ({
          id: s.id.toString(),
          title: s.title,
          desc: s.description,
          expire: s.end_date ? new Date(s.end_date).toLocaleDateString('en-GB') : '',
          questions: s.question_count ?? 0,
          responses: s.responses ?? 0,
          status: s.active ? 'Active' : 'Completed',
          canComplete: !!s.active,
        }));
        setSurveys(mapped);
      } catch (error) {
        setSurveys([]);
      } finally {
        setLoading(false);
      }
    };
    loadSurveys();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Surveys</Text>
        <Button
          mode="contained"
          icon="plus"
          style={styles.createBtn}
          labelStyle={styles.createBtnLabel}
          onPress={() => setDialogVisible(true)}
        >
          Create
        </Button>
      </View>
      <Text style={styles.sectionTitle}>Surveys</Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={surveys}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <SurveyCard item={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}
      <CreateSurveyDialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} />
    </View>
  );
};

export default SurveyAdmin;