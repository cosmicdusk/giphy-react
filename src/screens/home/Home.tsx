import React, { useState } from "react";
import { useEffect } from "react";
import {
  Image,
  useWindowDimensions,
  ScrollView,
  View,
  SafeAreaView,
} from "react-native";

import GifsList from "../../components/GifsList";
import { styles } from "./Styles";
import type { GifsListItem } from "../../models/GifsListItem";
import type { HomeProps } from "../../navigations/RootNavigator";

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  // Array of url string, source for GifsList component
  const [gifsSrc, setGifsSrc] = useState<GifsListItem[]>([]);
  // Offset parameter for api fetch
  const [offset, setOffset] = useState<number>(0);
  // Limit parameter for api fetch
  const limit = 10;

  const fetchGifs = async () => {
    if (offset < 100) {
      try {
        const API_KEY = "AkWYlV4FWlJcQgXuTJriDZZJ93ghMbLE";
        const BASE_URL = "http://api.giphy.com/v1/gifs/trending";
        const resJson = await fetch(
          `${BASE_URL}?api_key=${API_KEY}&offset=${offset}&limit=${limit}`
        );
        const res = await resJson.json();
        // increase offset after fetch
        setOffset(offset + 10);
        let tmpList: GifsListItem[] = [];
        for (var gif of res.data) {
          // Check for duplicate
          var isDublicate = gifsSrc.some(function (item) {
            return item.id == gif.id;
          });
          if (!isDublicate) {
            tmpList.push({ id: gif.id, uri: gif.images.fixed_width.url });
          }
        }
        setGifsSrc([...gifsSrc, ...tmpList]);
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
        images={gifsSrc}
        onEndReached={() => {
          fetchGifs();
        }}
        onCallPressImage={(id: string) => {
          navigation.navigate("Detail", { id: id });
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
