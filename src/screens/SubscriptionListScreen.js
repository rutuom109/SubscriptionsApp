import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getSubscriptions, saveSubscriptions } from '../storage/subscriptionStorage';
import { getNextRenewalDate, daysUntil } from '../utils/dateUtils';
import { useFocusEffect } from '@react-navigation/native';

export default function SubscriptionListScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  async function load() {
    const data = await getSubscriptions();
    setList(data);
    setFilteredList(data);
  }

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No subscription added</Text>
    </View>
  );

  async function remove(id) {
    const updated = list.filter(i => i.id !== id);
    setList(updated);
    setFilteredList(updated.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    ));
    await saveSubscriptions(updated);
  }

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = list.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const renderItem = ({ item }) => {
    const next = getNextRenewalDate(item.startDate, item.cycle);
    const remainingDays = daysUntil(next);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddEditSubscription', { subscription: item })
        }
        style={styles.itemContainer}
      >
        <View style={styles.itemContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.name} - ₹{item.amount}</Text>
            <Text style={styles.itemDetails}>{item.cycle} | {item.category}</Text>
            <Text style={styles.itemRenewal}>
              Renews in {remainingDays} day{remainingDays !== 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity onPress={() => remove(item.id)}>
            <Icon name="delete" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Sticky Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#888" style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Search subscriptions"
          placeholderTextColor={'#333'}
          value={searchText}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredList}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={[
          { paddingBottom: 80 },
          filteredList.length === 0 && { flex: 1 }
        ]}
        ListEmptyComponent={<EmptyList />}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditSubscription')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  itemRenewal: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
});
