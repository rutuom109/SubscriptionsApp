import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SubscriptionStack from './SubscriptionStack';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Subscriptions') {
            iconName = 'subscriptions'; 
          } else if (route.name === 'Analytics') {
            iconName = 'analytics'; 
          }

          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db', 
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Subscriptions" component={SubscriptionStack} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
}
