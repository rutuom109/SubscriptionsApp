import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ActiveNews from "../screens/ActiveNews";
import ArchivedNews from "../screens/ArchivedNews";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="ActiveNews" component={ActiveNews} options={{ title: "Top Business News" }} />
        <Stack.Screen name="ArchivedNews" component={ArchivedNews} options={{ title: "Archived News" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
