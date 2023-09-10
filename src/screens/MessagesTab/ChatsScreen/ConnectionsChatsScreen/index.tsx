import React from 'react';
import {StyleSheet} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {ScrollView, View, Animated} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SearchBar} from './SearchBar';
import {ChatsList} from '../ChatsList';
import {ConnectionUpdatesList} from './ConnectionUpdatesList';
import {useListHiddingHeader} from '../../../../hooks/animations/useListHiddingHeader';
import {MessagesRootStackParamList} from '../../../../navigation/navigators/MessagesTabNavigator/MessagesRootStackParamList';

const STORIES_CONTAINER_HEIGHT = 80;

export const ConnectionsChatsScreen = (
  props: NativeStackScreenProps<
    MessagesRootStackParamList,
    'ConnectionsChatsScreen'
  >,
): JSX.Element => {
  const {isHeaderHidden, translateYAnim, onScroll} = useListHiddingHeader({
    initialThreshold: 200,
    topTranslation: -100,
    topSpaceAfterHeaderIsHidden: STORIES_CONTAINER_HEIGHT,
  });

  return (
    <PaperProvider>
      <View style={{flex: 1}}>
        {!isHeaderHidden && (
          <Animated.View
            style={[
              styles.viewContainer,
              {
                transform: [{translateY: translateYAnim}],
              },
            ]}>
            <ConnectionUpdatesList />
          </Animated.View>
        )}
        <Animated.View
          style={[
            {flex: 1},
            {
              transform: [{translateY: translateYAnim}],
            },
          ]}>
          <SearchBar />
          <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
            <ChatsList {...props} />
          </ScrollView>
        </Animated.View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    display: 'flex',
    height: STORIES_CONTAINER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
});
