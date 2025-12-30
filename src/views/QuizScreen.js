import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { fetchQuestions } from '../controllers/QuizController';
import { COLORS } from '../utils/constants';

export default function QuizScreen({ route, navigation }) {
  const { name } = route.params;

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [time, setTime] = useState(60);

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  useEffect(() => {
    if (time === 0) nextQuestion();
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const nextQuestion = () => {
    setTime(60);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      navigation.replace('Score', {
        name,
        score,
        attempted,
        total: questions.length,
      });
    }
  };

  const selectOption = (i) => {
    setAttempted(attempted + 1);
    if (i === questions[index].correctIndex) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  if (!questions.length) return null;

  return (
    <View style={{ flex:1, padding:16, backgroundColor: COLORS.background }}>
      <Text style={{ fontSize:16, marginBottom:10,color:'gray' }}>Question {index+1}/{questions.length} ⏱ {time}s</Text>

      <View style={{ backgroundColor:'#fff', padding:20, borderRadius:16, marginTop:10 }}>
        <Text style={{ fontSize:18, fontWeight:'600',color:'gray' }}>{questions[index].question}</Text>

        {questions[index].options.map((op, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => selectOption(i)}
            style={{ padding:14, borderWidth:1, borderRadius:10, marginTop:10 }}
          >
            <Text style={{color:'gray'}}>{op}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
