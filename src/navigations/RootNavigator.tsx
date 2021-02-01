import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'screens/home';

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
