import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ProductDetails from './screens/ProductDetails';
import BlogDetailsScreen from './screens/BlogDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: { backgroundColor: '#1B4332' },
          headerTintColor: '#B7E4C7',
          headerTitleStyle: { fontWeight: '800' },
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: '🌿 KamerPlant Club' }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: 'Plantdetails' }}
        />
        <Stack.Screen
          name="BlogDetailsScreen"
          component={BlogDetailsScreen}
          options={{ title: 'Blog' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}