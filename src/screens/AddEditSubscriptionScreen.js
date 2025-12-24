import React, { useEffect, useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Platform, ScrollView ,Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import { getSubscriptions, saveSubscriptions } from '../storage/subscriptionStorage';

export default function AddEditSubscriptionScreen({ route, navigation }) {
  const editItem = route.params?.subscription;

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [cycle, setCycle] = useState('Monthly');
  const [category, setCategory] = useState('Entertainment');
  const [startDate, setStartDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setAmount(String(editItem.amount));
      setCycle(editItem.cycle);
      setCategory(editItem.category);
      setStartDate(new Date(editItem.startDate));
    }
  }, []);

  async function save() {
      if (Number(amount) <= 0 || isNaN(Number(amount))) {
    Alert.alert('Invalid Amount', 'Amount must be greater than 0.');
    return;
  }
    const list = await getSubscriptions();

    const payload = {
      id: editItem ? editItem.id : uuid.v4(),
      name,
      amount: Number(amount),
      cycle,
      category,
      startDate: startDate.toISOString(),
    };

    const updated = editItem
      ? list.map(i => (i.id === editItem.id ? payload : i))
      : [...list, payload];

    await saveSubscriptions(updated);
    navigation.goBack();
  }

  const optionButtonStyle = (selected) => ({
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: selected ? '#6ca0dc' : '#e0e0e0',
    color: selected ? '#fff' : '#333',
    textAlign: 'center',
    fontWeight: selected ? '600' : '400',
  });

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#f8f9fa', flexGrow: 1 }}>
      
      <Text style={{ marginBottom: 6, fontWeight: '600', fontSize: 16 ,color:'#756e6eff'}}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter subscription name"
        placeholderTextColor={'#756e6eff'}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 12,
          padding: 12,
          marginBottom: 15,
          backgroundColor: '#fff',
          color:'#756e6eff'
          
        }}
      />

      <Text style={{ marginBottom: 6, fontWeight: '600', fontSize: 16,color:'#756e6eff' }}>Amount</Text>
      <TextInput
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        placeholder="Enter amount"
        placeholderTextColor={'#756e6eff'}

        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 12,
          padding: 12,
          marginBottom: 15,
          backgroundColor: '#fff',
          color:'#756e6eff'

        }}
      />

      <Text style={{ marginBottom: 6, fontWeight: '600', fontSize: 16,color:'#756e6eff'}}>Billing Cycle</Text>
      {['Monthly', 'Quarterly', 'Yearly'].map(item => (
        <TouchableOpacity key={item} onPress={() => setCycle(item)}>
          <Text style={optionButtonStyle(cycle === item)}>{item}</Text>
        </TouchableOpacity>
      ))}

      <Text style={{ marginBottom: 6, fontWeight: '600', fontSize: 16, marginTop: 15 ,color:'#756e6eff'}}>Category</Text>
      {['Entertainment', 'Other', 'Education', 'finance'].map(item => (
        <TouchableOpacity key={item} onPress={() => setCategory(item)}>
          <Text style={optionButtonStyle(category === item)}>{item}</Text>
        </TouchableOpacity>
      ))}

         
      <Text style={{ marginBottom: 6, fontWeight: '600', fontSize: 16, marginTop: 15, color:'#756e6eff' }}>Start Date</Text>
      <TouchableOpacity
        onPress={() => setShowDate(true)}
        style={{
          padding: 12,
          borderRadius: 12,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ccc',
          marginBottom: 15,
        }}
      >
        <Text style={{ color: '#333' }}>{startDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={startDate}
          mode="date"
          maximumDate={new Date()}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, date) => {
            setShowDate(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      <TouchableOpacity
        onPress={save}
        style={{
          backgroundColor: '#6ca0dc',
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 20,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Save Subscription</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
