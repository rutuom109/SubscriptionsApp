import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  return (
    <View style={{ flex:1, backgroundColor: COLORS.background, justifyContent:'center', padding:20 }}>
      <View style={{ backgroundColor: COLORS.white, padding:20, borderRadius:16 }}>
        <Text style={{ fontSize:22, textAlign:'center', fontWeight:'700',color:'gray' }}>Quiz App</Text>

        <TextInput
          placeholder="Enter your name"
          placeholderTextColor={'gray'}
          value={name}
          onChangeText={setName}
          style={{ borderWidth:1, padding:12, marginVertical:20, borderRadius:10 ,color:'gray'}}
        />

        <TouchableOpacity
          onPress={() => {
            if(name.trim() !== '') navigation.navigate('Quiz', { name });
          }}
          style={{ backgroundColor: COLORS.primary, padding:15, borderRadius:10 }}
        >
          <Text style={{ color:'#fff', textAlign:'center', fontWeight:'600' }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
