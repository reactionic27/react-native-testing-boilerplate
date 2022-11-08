import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton} from 'react-native-paper';
import MainCharacterStack from './MainCharacterStack';

const TabNavigator = createBottomTabNavigator();

export default function MainStack() {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <TabNavigator.Screen
        name="CharactersTab"
        component={MainCharacterStack}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              icon="border-all"
              size={25}
              iconColor={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="LocationsTab"
        component={MainCharacterStack}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              icon="broadcast"
              size={25}
              iconColor={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="EpisodesTab"
        component={MainCharacterStack}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              icon="text-box-plus-outline"
              size={25}
              iconColor={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}
