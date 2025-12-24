import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'SUBSCRIPTIONS';

export async function getSubscriptions() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveSubscriptions(list) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}
