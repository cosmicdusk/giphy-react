import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'screens/home';

// You can define a type for the stack navigator, so that all the screens and 
// parameters can be typesafe.
type RootStackParams = {
  Home: undefined // Home does not require any special parameter
}
const Stack = createStackNavigator<RootStackParams>();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home" // Now this one is typesafe
      component={HomeScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
