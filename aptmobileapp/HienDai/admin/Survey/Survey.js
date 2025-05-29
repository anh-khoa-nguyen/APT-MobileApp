import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button, Chip, IconButton, Portal, Dialog, TextInput, ActivityIndicator } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/Apis";
import { useNavigation } from '@react-navigation/native';


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
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [qType, setQType] = useState('Multiple Choice');
  const [required, setRequired] = useState(false);
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState('');
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (visible) {
      setTitle('');
      setDesc('');
      setExpiry('');
      setQType('Multiple Choice');
      setRequired(false);
      setQuestion('');
      setOption('');
      setOptions([]);
      setQuestions([]);
    }
  }, [visible]);

  // Thêm option
  const handleAddOption = () => {
    if (option.trim() && !options.includes(option.trim())) {
      setOptions([...options, option.trim()]);
      setOption('');
    }
  };

  // Xóa option
  const handleRemoveOption = idx => {
    setOptions(options.filter((_, i) => i !== idx));
  };

  // Thêm câu hỏi
  const handleAddQuestion = () => {
    if (!question.trim()) return;
    if (qType === 'Multiple Choice' && options.length < 2) return;
    const newQ = {
      question: question.trim(),
      type: qType,
      required,
      options: qType === 'Multiple Choice' ? [...options] : [],
    };
    setQuestions([...questions, newQ]);
    setQuestion('');
    setOptions([]);
    setOption('');
    setQType('Multiple Choice');
    setRequired(false);
  };

  // Điều kiện enable nút Add Question
  const canAddQuestion =
    question.trim() &&
    (qType !== 'Multiple Choice' || options.length >= 2);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>
          <Text style={styles.dialogTitle}>Create New Survey</Text>
          <IconButton icon="close" size={22} style={styles.dialogClose} onPress={onDismiss} />
        </Dialog.Title>
        <Dialog.Content>
          {/* Survey Info */}
          <Text style={styles.dialogLabel}>Title</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter survey title"
            style={styles.dialogInput}
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.dialogLabel}>Description</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter survey description"
            style={styles.dialogInput}
            value={desc}
            onChangeText={setDesc}
          />
          <Text style={styles.dialogLabel}>Expiry Date</Text>
          <TextInput
            mode="outlined"
            placeholder="YYYY-MM-DD"
            style={styles.dialogInput}
            value={expiry}
            onChangeText={setExpiry}
          />

          {/* Questions */}
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
            {qType === 'Multiple Choice' && (
              <>
                <Text style={styles.dialogLabel}>Options</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    mode="outlined"
                    placeholder={`Option ${options.length + 1}`}
                    style={[styles.dialogInput, { flex: 1 }]}
                    value={option}
                    onChangeText={setOption}
                    onSubmitEditing={handleAddOption}
                  />
                  <Button
                    mode="text"
                    icon="plus"
                    style={styles.addOptionBtn}
                    labelStyle={styles.addOptionLabel}
                    onPress={handleAddOption}
                    disabled={!option.trim()}
                  >
                    Add Option
                  </Button>
                </View>
                {options.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
                    {options.map((opt, idx) => (
                      <Chip
                        key={idx}
                        style={{ marginRight: 6, marginBottom: 6, backgroundColor: '#fff' }}
                        onClose={() => handleRemoveOption(idx)}
                      >
                        {opt}
                      </Chip>
                    ))}
                  </View>
                )}
              </>
            )}
            <Button
              mode="contained"
              style={[
                styles.addQuestionBtn,
                { marginTop: 12, backgroundColor: canAddQuestion ? '#1976D2' : '#B0B0B0' },
              ]}
              labelStyle={styles.addQuestionLabel}
              onPress={handleAddQuestion}
              disabled={!canAddQuestion}
            >
              Add Question
            </Button>
          </View>
          {/* Hiển thị danh sách câu hỏi đã thêm */}
          {questions.length > 0 && (
            <View style={{ marginTop: 18 }}>
              <Text style={[styles.dialogSectionTitle, { marginBottom: 6 }]}>Questions List</Text>
              {questions.map((q, idx) => (
                <View key={idx} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 8 }}>
                  <Text style={{ fontWeight: 'bold' }}>{idx + 1}. {q.question}</Text>
                  <Text style={{ color: '#1976D2', marginBottom: 2 }}>{q.type}{q.required ? ' • Required' : ''}</Text>
                  {q.type === 'Multiple Choice' && (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {q.options.map((opt, i) => (
                        <Chip key={i} style={{ marginRight: 6, marginBottom: 4 }}>{opt}</Chip>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button mode="outlined" onPress={onDismiss} style={styles.dialogBtn} labelStyle={styles.dialogBtnLabel}>
            Cancel
          </Button>
          <Button
            mode="contained"
            style={styles.dialogBtnPrimary}
            labelStyle={styles.dialogBtnPrimaryLabel}
            disabled={!title.trim() || !desc.trim() || !expiry.trim() || questions.length === 0}
            // onPress={handleCreateSurvey} // TODO: Xử lý tạo survey ở đây
          >
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
  const nav = useNavigation();

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
          onPress={() => nav.navigate('SurveyCreate')}
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