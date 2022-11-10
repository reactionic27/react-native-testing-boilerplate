import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IconButton, Text, Title, TouchableRipple} from 'react-native-paper';
import {Character} from '../redux/slices/CharacterSlice';

const ListItem = ({item}: {item: Character}) => {
  const navigation = useNavigation();

  const onPressItem = (param: Character) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'CharacterDetails',
        params: {data: param},
      }),
    );
  };

  return (
    <TouchableRipple
      onPress={() => onPressItem(item)}
      key={item.id}
      testID="character-item">
      <View style={styles.charactersItemWrapper}>
        <FastImage
          source={{uri: item.image}}
          style={styles.charactersItemImage}
        />
        <View style={styles.charactersInfo}>
          <Title numberOfLines={2} style={styles.title}>
            {item.name}
          </Title>
          <View style={styles.charactersItemName}>
            <Text>{item.status}</Text>
            <Text>{item.episode.length}</Text>
          </View>
        </View>
        <IconButton icon="chevron-right" size={25} iconColor={'black'} />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  charactersItemWrapper: {
    flexDirection: 'row',
    padding: 15,
    paddingRight: 0,
    alignItems: 'center',
  },
  charactersInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    height: 100,
  },
  charactersItemName: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  charactersItemImage: {
    width: 120,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'normal',
    lineHeight: 24,
  },
});

export default memo(ListItem);
