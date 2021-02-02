import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import MasonryList from 'react-native-masonry-list';

const state = {
  onLoading: true,
  offset: 0,
};

// [1] Since you're using Functional Components, refrain from using the static
// `Dimensions.get()` function. Use the `useWindowDimensions` hook instead. 
// (Refer to the comment section also marked with [1] below.)

const numColumns = 2;

// [4] What purpose does this global array serves? If it's a temporary variable,
// define it in the scope. If it is a global variable, one should have a very
// strong reason to use it. Generally, avoid global singletons as much as you
// can. Especially those typed with `any`.
// (Refer to the comment section also marked with [4] below.)
// let tmp: any[] = [];

// [2] We should define a type for the GIFs instead of using `any`. In our code,
// we try to avoid using `any` as much as we can, because if we use `any`, then
// it is no better than just using JavaScript (sometimes could be worse because
// VS Code can still infer the type using IntelliSense). If you are unfamiliar
// with the type of the object, you may use Postman to send a test query.
// (Refer to the comment section also marked with [2] below.)
interface GiphyTrendingResponse {
  data: Array<{
    images: {
      original: {
        url: string
      }
    }
  }>
}

interface GiphySource {
  url: string
}

// [6] Constants should live outside of Functional Components. If not it will be
// redefined for every render loop.
// API settings
const limit = 20;

export default () => {
  // [1] Instead of using `Dimensions.get()` here I'm using a React Native hook
  // to get the screen width. You are now just writing for iOS and Android,
  // which screen size remains constant most of the time. However, React Native
  // can now also compile for Windows and macOS, where the user can resize the
  // window. Screen width is now therefore reactive, not static.
  const { width: screenWidth } = useWindowDimensions()
  const tileSize = screenWidth / numColumns

  const [gifsSrc, setGifsSrc] = useState<Array<GiphySource>>([]);

  // [3] Refer to comment also marked [3] below
  const [offset, setOffset] = useState(0);

  // [5] Refer to comment also marked [5] below
  const [isLoading, setIsLoading] = useState(false)

  // [6] Refer to comment also marked [6] above
  // const limit = 20;

  async function fetchGifs() {
    console.log('run');
    // [3] Where is this `state` property from? When using React Functional
    // Components, stay within convetions and stick with React Functional
    // Component; avoid using Class-based Component APIs. Also, even in
    // Component-based API, `state` should not be modified directly. Should use
    // `setState()` instead.
    if (offset < 100) {
      try {
        const API_KEY = 'AkWYlV4FWlJcQgXuTJriDZZJ93ghMbLE';
        const BASE_URL = 'http://api.giphy.com/v1/gifs/trending';
        const resJson = await fetch(
          `${BASE_URL}?api_key=${API_KEY}&offset=${state.offset}&limit=${limit}`,
        );
        // [2] Cast the type of the expected response.
        const res = (await resJson.json()) as GiphyTrendingResponse;

        // [3] Update offset using hook. Also, adding the offset by the raw
        // number 20 is dangerous. What if server does not return 20 results? Maybe
        // there was a server error, maybe we have reached the end. Whatever
        // the case, adding `res.data.length` to the offset is more correct than
        // adding the raw 20. (And, if we really wanna add the 20, we should use
        // `offset + limit` instead of raw number 20.)
        setOffset(offset + res.data.length)
        
        // Use JavaScript functional programming interface for brevity
        const newGifSources: Array<GiphySource> = res.data.map((image) => ({ url: image.images.original.url }))
        setGifsSrc([...gifsSrc, ...newGifSources]);
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
          // [6] Like I said above, avoid using `state` in functional components and use hooks.
          if (!isLoading) {
            setIsLoading(true);
            fetchGifs();
          }
        }}
        onImagesResolveEnd={() => {
          // [6]
          setIsLoading(false)
        }}
      />
    </View>
  );
};

// [7] Styles go last in the file. Be mindful of others reading your code. When
// they open a file of code you write, are they interested in the rendering
// function of the component, or are they interested in the styles of the
// component? Can their brain render the styles in their mind just by looking at
// your code?
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
  }
});
