import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import HomeScreen from "../screens/HomeScreen";
import AlbumScreen from "../screens/AlbumScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { capitalizeString, truncateString } from '../helper';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} options={({ route }) => ({ title: capitalizeString(truncateString(route.params.title, 15)) })} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
