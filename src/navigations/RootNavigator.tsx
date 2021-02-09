import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'screens/home';

type RootStackParams = {
  Home: undefined; // Home does not require any special parameter
};
const Stack = createStackNavigator<RootStackParams>();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: true, title: '100 Top Trending' }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
