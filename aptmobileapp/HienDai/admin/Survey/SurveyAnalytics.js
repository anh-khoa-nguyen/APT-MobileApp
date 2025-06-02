import React, { useEffect, useState } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { Text, Card, ActivityIndicator, Button } from 'react-native-paper';
import { BarChart, PieChart } from 'react-native-chart-kit';
import styles from './stylesA';
import { authAPI, endpoints } from '../../configs/Apis';
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get('window').width - 32;
const COLORS = [
  "#1976D2", "#388E3C", "#FBC02D", "#D32F2F", "#7B1FA2", "#0288D1", "#FFA000"
];

const SurveyAnalytics = ({ route }) => {
  const surveyId = route?.params?.surveyId;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('bar'); // 'bar' hoặc 'pie'

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await authAPI(token).get(endpoints.get_analytic(surveyId));
        setData(res.data);
      } catch (err) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, [surveyId]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }
  if (!data) {
    return <Text style={{ margin: 20 }}>Không có dữ liệu thống kê.</Text>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Title title={data.survey_title} />
        <Card.Content>
          <Text style={styles.participants}>Participants: {data.unique_participants}</Text>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        style={{ margin: 16, alignSelf: 'center' }}
        onPress={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
      >
        Chuyển sang {chartType === 'bar' ? 'Pie Chart' : 'Bar Chart'}
      </Button>
      {data.questions_analysis.map((q, idx) => (
        <Card key={q.question_id} style={styles.card}>
          <Card.Title title={`Câu ${idx + 1}: ${q.question_text.replace(/<[^>]+>/g, '')}`} />
          <Card.Content>
            {chartType === 'bar' ? (
              <BarChart
                data={{
                  labels: q.options_analysis.map(opt => opt.option_text.replace(/<[^>]+>/g, '')),
                  datasets: [{ data: q.options_analysis.map(opt => opt.response_count) }]
                }}
                width={screenWidth}
                height={220}
                yAxisLabel=""
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 0,
                  color: (opacity = 1, index) => COLORS[index % COLORS.length],
                  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                  style: { borderRadius: 16 },
                  propsForDots: { r: "6", strokeWidth: "2", stroke: "#1976D2" }
                }}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
              />
            ) : (
              <PieChart
                data={q.options_analysis.map((opt, i) => ({
                  name: opt.option_text.replace(/<[^>]+>/g, ''),
                  population: opt.response_count,
                  color: COLORS[i % COLORS.length],
                  legendFontColor: "#333",
                  legendFontSize: 14,
                }))}
                width={screenWidth}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            )}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

export default SurveyAnalytics;