import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { getSubscriptions } from '../storage/subscriptionStorage';
import { getNextRenewalDate, daysUntil } from '../utils/dateUtils';

const screenWidth = Dimensions.get('window').width - 20;

export default function AnalyticsScreen() {
  const [monthlyData, setMonthlyData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [renewalData, setRenewalData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const list = await getSubscriptions();
    calculateMonthly(list);
    calculateCategory(list);
    calculateUpcomingRenewals(list);
  };

  /* ---------------- Monthly Spending ---------------- */
  const calculateMonthly = (list) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const data = Array(12).fill(0);

    list.forEach(item => {
      const month = new Date(item.startDate).getMonth();
      data[month] += Number(item.amount);
    });

    setMonthlyData({ labels: months, datasets: [{ data }] });
  };

  /* ---------------- Category Spending ---------------- */
  const calculateCategory = (list) => {
    const map = {};

    list.forEach(item => {
      const key = item.category || 'Other';
      map[key] = (map[key] || 0) + Number(item.amount);
    });

    const data = Object.keys(map).map((key, index) => ({
      name: key,
      amount: map[key],
      color: getColor(index),
    }));

    setCategoryData(data);
  };

  /* ---------------- Upcoming Renewals  ---------------- */
  const calculateUpcomingRenewals = (list) => {
    const buckets = {
      '0-30 Days': 0,
      '31-60 Days': 0,
      '61-90 Days': 0,
      '90-365 Days':0,
    };

    list.forEach(item => {
      if (!item.startDate || !item.cycle) return;

      const nextRenewal = getNextRenewalDate(item.startDate, item.cycle);
      const diffDays = daysUntil(nextRenewal);

      if (diffDays >= 0 && diffDays <= 30) buckets['0-30 Days'] += 1;
      else if (diffDays <= 60) buckets['31-60 Days'] += 1;
      else if (diffDays <= 90) buckets['61-90 Days'] += 1;
      else if (diffDays <= 365) buckets['90-365 Days'] += 1;

    });

    setRenewalData({
      labels: Object.keys(buckets),
      datasets: [{ data: Object.values(buckets) }],
    });
  };

  const getColor = (i) => {
    const colors = ['#3498db', '#e74c3c', '#f1c40f', '#2ecc71', '#9b59b6'];
    return colors[i % colors.length];
  };

  const hasMonthlyData = monthlyData?.datasets?.[0]?.data?.some(v => v > 0);
  const hasCategoryData = categoryData.length > 0;
  const hasRenewalData = renewalData?.datasets?.[0]?.data?.some(v => v > 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 10 }}>
      <Text style={styles.header}>📊 Analytics Overview</Text>

      {/* Monthly Spending */}
      <Text style={styles.sectionTitle}>Monthly Spending</Text>
      {hasMonthlyData ? (
        <BarChart
          data={monthlyData}
          width={screenWidth}
          height={220}
          fromZero
          showValuesOnTopOfBars
          withInnerLines={false}
          chartConfig={chartConfig('#3498db')}
          style={styles.chart}
        />
      ) : (
        <EmptyBox />
      )}

      {/* Category-wise Spending */}
      <Text style={styles.sectionTitle}>Category-wise Spending</Text>
      {hasCategoryData ? (
        <View style={styles.pieRow}>
          <PieChart
            data={categoryData.map(i => ({
              name: i.name,
              population: i.amount,
              color: i.color,
            }))}
            width={screenWidth * 0.55}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            hasLegend={false}
            center={[45, 0]}
            chartConfig={{
              color: () => '#3498db',
              labelColor: () => '#333',
            }}
          />

          <View style={styles.rightLegend}>
            {categoryData.map(item => (
              <View key={item.name} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>₹{item.amount}</Text>
                <Text style={styles.legendName}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <EmptyBox />
      )}

      {/* Upcoming Renewals */}
      <Text style={styles.sectionTitle}>Upcoming Renewals</Text>
      {hasRenewalData ? (
        <BarChart
          data={renewalData}
          width={screenWidth}
          height={220}
          fromZero
          showValuesOnTopOfBars
          withInnerLines={false}
          chartConfig={chartConfig('#2ecc71')}
          style={styles.chart}
        />
      ) : (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No upcoming renewals</Text>
        </View>
      )}
    </ScrollView>
  );
}

const EmptyBox = () => (
  <View style={styles.emptyBox}>
    <Text style={styles.emptyText}>No subscriptions added</Text>
  </View>
);

const chartConfig = (color) => ({
  backgroundGradientFrom: '#f8f9fa',
  backgroundGradientTo: '#f8f9fa',
  fillShadowGradient: color,
  fillShadowGradientOpacity: 1,
  color: () => color,
  labelColor: () => '#333',
  barPercentage: 0.5,
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#34495e',
  },

  chart: {
    borderRadius: 12,
    marginBottom: 30,
  },

  emptyBox: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 30,
  },

  emptyText: {
    fontSize: 16,
    color: '#777',
    fontWeight: '500',
  },

  pieRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30,
  },

  rightLegend: {
    width: screenWidth * 0.35,
    paddingBottom: 12,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },

  legendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 6,
  },

  legendName: {
    fontSize: 13,
    color: '#7f8c8d',
  },
});
