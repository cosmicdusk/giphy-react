import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MasonryList from 'react-native-masonry-list';

const state = {
  onLoading: true,
  offset: 0,
};

const screenWidth = Dimensions.get('window').width;

const numColumns = 2;

const tileSize = screenWidth / numColumns;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    margin: 10,
    width: '100%',
    height: 50,
    color: 'white',
  },
  image: {
    width: tileSize,
    height: 150,
    marginBottom: 5,
  },
  flatList: {
    width: screenWidth,
  },
});

let tmp: any[] = [];

export default () => {
  const [gifsSrc, setGifsSrc] = useState<any>([]);

  // API settings
  const limit = 20;

  async function fetchGifs() {
    console.log('run');
    if (state.offset < 100) {
      try {
        const API_KEY = 'AkWYlV4FWlJcQgXuTJriDZZJ93ghMbLE';
        const BASE_URL = 'http://api.giphy.com/v1/gifs/trending';
        const resJson = await fetch(
          `${BASE_URL}?api_key=${API_KEY}&offset=${state.offset}&limit=${limit}`,
        );
        const res = await resJson.json();
        state.offset += 20;
        // This part need fixing
        for (var gif of res.data) {
          const url = gif.images.original.url;
          tmp.push({ uri: url });
        }
        setGifsSrc([...gifsSrc, ...tmp]);
        tmp = [];
      } catch (error) {
        console.warn(error);
      }
    }
  }

  useEffect(() => {
    fetchGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.view}>
      <MasonryList
        rerender={false}
        images={gifsSrc}
        columns={2}
        containerWidth={screenWidth}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!state.onLoading) {
            state.onLoading = true;
            fetchGifs();
          }
        }}
        onImagesResolveEnd={() => {
          state.onLoading = false;
        }}
      />
    </View>
  );
};
