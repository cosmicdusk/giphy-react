import React, { useState } from 'react';
import { useEffect } from 'react';
import { Image, View } from 'react-native';

import GifsList from '../../components/GifsList';
import { styles } from './Styles';
import type { GifsListItem } from '../../models/GifsListItem';

export default () => {
  // Array of url string, source for GifsList component
  const [gifsSrc, setGifsSrc] = useState<GifsListItem[]>([]);
  // Offset parameter for api fetch
  const [offset, setOffset] = useState<number>(0);
  // Limit parameter for api fetch
  const limit = 10;

  async function fetchGifs() {
    if (offset < 100) {
      try {
        const API_KEY = 'AkWYlV4FWlJcQgXuTJriDZZJ93ghMbLE';
        const BASE_URL = 'http://api.giphy.com/v1/gifs/trending';
        const resJson = await fetch(
          `${BASE_URL}?api_key=${API_KEY}&offset=${offset}&limit=${limit}`,
        );
        // Result data not cast to the required type. It's `any` here.
        const res = await resJson.json();
        // increase offset after fetch
        // Offset still +10. From previous PR review, this should be changed to
        // the actual fetched size instead.
        setOffset(offset + 10);

        // Like I said in the previous PR, you should familiarize yourself with
        // JS functional programming instead of relying on traditional, mutable
        // imperative programming.
        // Instead of creating a new mutable array and modify it one by one, use `.map()`
        //
        // const newGifs = res.data.map(gif => ({ uri: gif.images.fixed_width.url }))
        // setGifsSrc([...gifsSrc, ...newGifs])
        //
        let tmpList: GifsListItem[] = [];
        for (var gif of res.data) {
          tmpList.push({ uri: gif.images.fixed_width.url });
        }
        setGifsSrc([...gifsSrc, ...tmpList]);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <View style={styles.view}>
      <Image source={require('../../assets/giphy.gif')} />
      <View style={styles.space} />
      <GifsList
        images={gifsSrc}
        onEndReached={() => {
          fetchGifs();
        }}
      />
    </View>
  );
};
