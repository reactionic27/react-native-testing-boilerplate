import React, {FC} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import {format} from 'fecha';
import Header from '../../components/Header';
import {MainFeedNavigatorParamList} from '../../navigations/MainCharacterStack';
import DetailItem from '../../components/DetailItem';

const CharacterDetails: FC<
  NativeStackScreenProps<MainFeedNavigatorParamList, 'CharacterDetails'>
> = ({route}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <Header title="Characters Details" />
      <ScrollView style={styles.content}>
        <FastImage source={{uri: data.image}} style={styles.image} />
        <DetailItem keyword="Name" value={data.name} />
        <DetailItem keyword="Gender" value={data.gender} />
        <DetailItem keyword="Species" value={data.species} />
        <DetailItem keyword="Status" value={data.status} />
        <DetailItem keyword="Origin" value={data.origin.name} />
        <DetailItem
          keyword="Location"
          value={format(new Date(data.created), 'YYYY-MM-DD')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default CharacterDetails;
