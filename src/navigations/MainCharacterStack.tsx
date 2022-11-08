import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CharacterList from '../screens/tab-feed/CharacterList';
import CharacterDetails from '../screens/tab-feed/CharacterDetails';
import {Character} from '../redux/slices/CharacterSlice';

export type MainFeedNavigatorParamList = {
  Characters: undefined;
  CharacterDetails: {
    data: Character;
  };
};

const StackNavigator = createNativeStackNavigator<MainFeedNavigatorParamList>();

export default function MainCharacterStack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavigator.Screen name="Characters" component={CharacterList} />
      <StackNavigator.Screen
        name="CharacterDetails"
        component={CharacterDetails}
      />
    </StackNavigator.Navigator>
  );
}
