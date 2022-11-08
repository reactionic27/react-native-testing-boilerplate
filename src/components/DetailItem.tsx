import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const DetailItem = ({keyword, value}: {keyword: string; value: string}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{keyword}:</Text>
      <Text style={styles.title}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    paddingTop: 10,
    fontSize: 16,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    width: '70%',
  },
});

export default DetailItem;
