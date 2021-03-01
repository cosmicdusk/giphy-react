import * as React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import HomeScreen from 'screens/home/Home';
import DetailScreen from 'screens/detail/Detail';
import { GiphyItem } from 'models/GiphyItem';

type RootStackParamList = {
  Home: undefined;
  Detail: { gif: GiphyItem };
};

type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;
type DetailProps = StackScreenProps<RootStackParamList, 'Detail'>;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Home'
      component={HomeScreen}
      options={{ headerShown: true, title: '100 Top Trending' }}
    />
    <Stack.Screen
      name='Detail'
      component={DetailScreen}
      options={{ headerShown: true, title: 'Detail' }}
    />
  </Stack.Navigator>
);

export default RootNavigator;

export type { DetailProps, HomeProps };
