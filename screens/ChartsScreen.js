import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {LineChart, BarChart, PieChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';
import Animated, {Easing} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

export default function ChartsScreen() {
  // Data for line chart
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };

  // Data for bar chart
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [30, 200, 170, 250, 210, 300],
      },
    ],
  };

  // Data for pie chart
  const pieChartData = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Beijing',
      population: 527612,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(255, 165, 0)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  // Example of an animated intro
  const opacity = new Animated.Value(0);

  Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    easing: Easing.ease,
  }).start();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Line Chart</Text>
      <Animated.View style={{opacity}}>
        <LineChart
          data={lineChartData}
          width={screenWidth}
          height={220}
          chartConfig={styles.chartConfig}
          bezier
          style={styles.chartStyle}
        />
      </Animated.View>

      <Text style={styles.title}>Bar Chart</Text>
      <Animated.View style={{opacity}}>
        <BarChart
          data={barChartData}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={styles.chartConfig}
          verticalLabelRotation={30}
          style={styles.chartStyle}
        />
      </Animated.View>

      <Text style={styles.title}>Pie Chart</Text>
      <Animated.View style={{opacity}}>
        <PieChart
          data={pieChartData}
          width={screenWidth}
          height={220}
          chartConfig={styles.chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chartConfig: {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
