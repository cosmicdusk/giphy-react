import { GiphyItem } from "models/GiphyItem";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Image,
  useWindowDimensions,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import GifsList from "../../components/GifsList";
import type { GiphyTrendingResponse } from "../../models/GiphyTrendingResponse";
import type { HomeProps } from "../../navigations/RootNavigator";

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  // Array of giphy item to store gif info
  const [gifsSrc, setGifsSrc] = useState<GiphyItem[]>([]);
  // Offset parameter for api fetch
  const [offset, setOffset] = useState<number>(0);
  // Limit parameter for api fetch
  const limit = 10;
  // Style sheet
  const styles = StyleSheet.create({
    view: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: 0,
      backgroundColor: "black",
    },
    space: {
      flex: 0.01,
    },
  });

  const fetchGifs = async () => {
    if (offset < 100) {
      try {
        const API_KEY = "AkWYlV4FWlJcQgXuTJriDZZJ93ghMbLE";
        const BASE_URL = "http://api.giphy.com/v1/gifs/trending";
        const resJson = await fetch(
          `${BASE_URL}?api_key=${API_KEY}&offset=${offset}&limit=${limit}`
        );
        const res = (await resJson.json()) as GiphyTrendingResponse;
        // increase offset after fetch
        setOffset(offset + limit);
        const newGifs = res.data.map((gif) => ({
          id: gif.id,
          images: {
            original: {
              url: gif.images.original.url,
            },
            fixed_width: {
              url: gif.images.fixed_width.url,
            },
          },
          title: gif.title,
          user: {
            avatar_url: gif.user?.avatar_url,
            display_name: gif.user?.display_name,
          },
        })) as GiphyItem[];

        setGifsSrc(() => {
          let seen = new Set();
          // Check for duplicates
          return [...gifsSrc, ...newGifs].filter((item) => {
            let k = JSON.stringify(item);
            return seen.has(k) ? false : seen.add(k);
          });
        });
      } catch (error) {
        console.warn(error);
      }
    }
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  const windowWidth = useWindowDimensions().width;

  return (
    <SafeAreaView style={styles.view}>
      <Image
        style={{
          resizeMode: "stretch",
          height: 150,
          width: windowWidth,
        }}
        source={require("../../assets/giphy.gif")}
      />
      <View style={styles.space} />
      <GifsList
        images={gifsSrc.map((gif) => ({
          id: gif.id,
          source: { uri: gif.images.fixed_width.url },
        }))}
        onEndReached={() => {
          fetchGifs();
        }}
        onCallPressImage={(index: number) => {
          navigation.navigate("Detail", { gif: gifsSrc[index] });
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
