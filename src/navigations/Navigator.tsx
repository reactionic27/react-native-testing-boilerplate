import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './MainStack';

const StackNavigator = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer independent>
        <StackNavigator.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Home'}>
          <StackNavigator.Screen name="Home" component={MainStack} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
