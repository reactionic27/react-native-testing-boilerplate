import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import {
  fetchCharacters,
  Character,
  intializeCharacters,
} from '../../redux/slices/CharacterSlice';
import {RootState} from '../../redux/store';
import ListItem from '../../components/ListItem';
import {CustomDialog} from '../../components/CustomDialog';

export default function CharacterList() {
  const dispatch = useDispatch();
  const {fetchError, isLoading, characters, totalPage} = useSelector(
    (rootState: RootState) => rootState.character,
  );
  const [visible, setVisible] = useState(false);
  const [resetAlertVisible, setResetAlertVisible] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isPullData, setPullData] = useState(false);
  const [isFetchMore, setFetchMore] = useState(false);

  useEffect(() => {
    // We need to stop the backend api call when the total page is reached
    if (totalPage > pageIndex && isFetchMore) {
      dispatch(fetchCharacters(pageIndex));
      setFetchMore(false);
    }
  }, [pageIndex]);

  useEffect(() => {
    // If the pull refresh data request, we should fetch first page of characters
    if (isPullData) {
      dispatch(fetchCharacters(0));
      setPullData(false);
      setPageIndex(0);
    }
  }, [isPullData]);

  useEffect(() => {
    if (fetchError) {
      // If there is any errors on server, we should show the dialog for system alert
      setVisible(true);
    }
  }, [fetchError]);

  const resetFeed = () => {
    // If reset button clicked, we should reset the store characters variables and initialize all state variables
    dispatch(intializeCharacters());
    setPullData(false);
    setFetchMore(false);
    setPageIndex(0);
    // Show system alert to notify the user
    setResetAlertVisible(true);
  };

  const hideDialog = () => setVisible(false);
  const hideResetDialog = () => setResetAlertVisible(false);

  const renderCharacterItem = ({item}: {item: Character}) => {
    return <ListItem item={item} />;
  };

  const renderListFooter = () => {
    if (isLoading) {
      return <ActivityIndicator animating={true} color="blue" />;
    } else {
      return null;
    }
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.wrapper}>
        <Text testID="pull-text">Pull to load data</Text>
      </View>
    );
  };

  const RenderList = useMemo(() => {
    return (
      <FlatList
        data={characters}
        initialNumToRender={20}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCharacterItem}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyComponent}
        onEndReached={() => {
          setPageIndex(pageIndex + 1);
          setFetchMore(true);
        }}
        onRefresh={() => setPullData(true)}
        refreshing={isPullData}
        testID="characters-flatlist"
      />
    );
  }, [characters, pageIndex]);

  return (
    <View style={styles.container} testID="character-list-container">
      <Header title="Characters" hasBack={false} />
      <Button
        mode="contained"
        style={styles.button}
        onPress={resetFeed}
        testID="reset-btn">
        Reset
      </Button>
      {RenderList}
      <CustomDialog
        visible={resetAlertVisible}
        hideDialog={hideResetDialog}
        text="All data has been resetted."
      />
      <CustomDialog
        visible={visible}
        hideDialog={hideDialog}
        text={fetchError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
  },
});
