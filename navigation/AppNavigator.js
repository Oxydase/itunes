import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recherche" component={SearchScreen} />
      <Stack.Screen name="Détail" component={DetailScreen} />
      <Stack.Screen name="Favoris" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
