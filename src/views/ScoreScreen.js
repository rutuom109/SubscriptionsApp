import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { saveScore } from '../controllers/QuizController';
import { COLORS } from '../utils/constants';

export default function ScoreScreen({ route }) {
  const { name, score, attempted, total } = route.params;
  const percent = ((score / total) * 100).toFixed(0);

  useEffect(() => {
    saveScore(name, score, attempted);
  }, []);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: COLORS.background }}>
      <View style={{ backgroundColor:'#fff', padding:24, borderRadius:16, alignItems:'center' }}>
        <Text style={{ fontSize:20, fontWeight:'700' ,color:'gray'}}>Quiz Result</Text>
        <Text style={{ marginTop:10,color:'gray' }}>Name: {name}</Text>
        <Text style={{color:'gray'}}>Score: {score}/{total}</Text>
        <Text style={{color:'gray'}}>Not Attempted: {total - attempted}</Text>
        <Text style={{color:'gray'}}>Percentage: {percent}%</Text>
        <Text style={{ marginTop:10, fontSize:16, color: percent >= 60 ? COLORS.success : COLORS.danger }}>
          {percent >= 60 ? '🎉 Excellent!' : '👍 Keep Practicing'}
        </Text>
      </View>
    </View>
  );
}
