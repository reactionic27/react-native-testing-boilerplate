import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Title} from 'react-native-paper';

interface HeaderProps {
  title: string;
  hasBack?: boolean;
  rightIcon?: string;
  onPressRight?: () => void;
}

export default function Header({
  title,
  hasBack = true,
  rightIcon,
  onPressRight,
}: HeaderProps) {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <View style={styles.buttonSection}>
        {hasBack && (
          <IconButton icon="arrow-left" size={20} onPress={onPressBack} />
        )}
      </View>
      <Title style={styles.title}>{title}</Title>
      <View style={styles.buttonSection}>
        {rightIcon && (
          <IconButton icon="arrow-left" size={20} onPress={onPressRight} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonSection: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
});
