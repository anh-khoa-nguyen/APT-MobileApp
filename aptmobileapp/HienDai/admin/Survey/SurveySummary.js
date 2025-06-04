import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, View } from 'react-native';
import { Text, Card, ActivityIndicator, Button } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import styles from './stylesS';
import { authAPI, endpoints } from '../../configs/Apis';
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get('window').width - 32;

const SurveySummary = ({ route }) => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showType, setShowType] = useState('question'); // 'question' hoặc 'respondent'

  const data = route?.params?.surveys || [];
  const questionCounts = data.map(s => s.question_count ?? 0);
  const titles = data.map(s => s.title.length > 8 ? s.title.slice(0, 8) + '…' : s.title);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await authAPI(token).get(endpoints['get_summary']);
        setSummary(res.data || []);
      } catch (err) {
        setSummary([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (!data || data.length === 0) {
    return <Text style={{ margin: 20 }}>Không có dữ liệu tổng hợp.</Text>;
  }

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  const respondentMap = {};
  summary.forEach(s => {
    respondentMap[s.survey_id] = s.respondent_count;
  });
  const respondentCounts = data.map(s => respondentMap[s.id] ?? 0);
  const chartWidth = Math.max(screenWidth, data.length * 60);

  // Chọn dữ liệu hiển thị
  const chartData = showType === 'question' ? questionCounts : respondentCounts;
  const chartLabel = showType === 'question' ? 'Số câu hỏi' : 'Người tham gia';
  const chartColor = showType === 'question' ? "#388E3C" : "#1976D2";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Title title="Tổng số câu hỏi & số người tham gia từng khảo sát" />
        <Card.Content>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8 }}>
            <Button
              mode={showType === 'question' ? 'contained' : 'outlined'}
              onPress={() => setShowType('question')}
              style={{ marginRight: 8 }}
            >
              Số câu hỏi
            </Button>
            <Button
              mode={showType === 'respondent' ? 'contained' : 'outlined'}
              onPress={() => setShowType('respondent')}
            >
              Người tham gia
            </Button>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              data={{
                labels: titles,
                datasets: [
                  {
                    data: chartData,
                    color: (opacity = 1) => chartColor,
                  }
                ],
                legend: [chartLabel]
              }}
              width={chartWidth}
              height={260}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => chartColor,
                labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: "6", strokeWidth: "2", stroke: chartColor }
              }}
              style={{ borderRadius: 16, marginVertical: 8 }}
              fromZero
              showValuesOnTopOfBars
            />
          </ScrollView>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default SurveySummary;