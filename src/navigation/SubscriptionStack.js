import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubscriptionListScreen from '../screens/SubscriptionListScreen';
import AddEditSubscriptionScreen from '../screens/AddEditSubscriptionScreen';

const Stack = createNativeStackNavigator();

export default function SubscriptionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SubscriptionList"
        component={SubscriptionListScreen}
        options={{ title: 'Subscriptions' }}
      />
      <Stack.Screen
        name="AddEditSubscription"
        component={AddEditSubscriptionScreen}
        options={{ title: 'Add / Edit Subscription' }}
      />
    </Stack.Navigator>
  );
}
