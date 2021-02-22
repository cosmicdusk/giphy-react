import React, { Component, useEffect, useState } from "react";
import type { DetailProps } from "../../navigations/RootNavigator";
import { styles } from "./Styles";

import { Image, View, Text, Button, Share, Alert } from "react-native";
import { GiphyUser } from "../../models/GiphyUser";
import { GiphyItem } from "../../models/GiphyItem";

const DetailScreen: React.FC<DetailProps> = ({ route, navigation }) => {
  // Image source
  const [imgSource, setImgSource] = useState<GiphyItem>();
  // User detail
  const [user, setUser] = useState<GiphyUser>();

  // You already had the gif in the previous screen, you should not fetch it 
  // again by the ID here. Instead, put the entire GIF object into the route 
  // params instead.
  const fetchGifs = async () => {
    try {
      const API_KEY = "AkWYlV4FWlJcQgXuTJriDZZJ93ghMbLE";
      const BASE_URL = "http://api.giphy.com/v1/gifs/";

      const resJson = await fetch(
        `${BASE_URL}${route.params.id}?api_key=${API_KEY}`
      );
      // What is the type of `res`?
      const res = await resJson.json();
      setUser(res.data.user);
      setImgSource(res.data);
    } catch (error) {
      console.warn(error);
    }
  };

  const onShare = async (url: string) => {
    try {
      await Share.share({
        message: url,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // Instead of using use effect and add listener for the focus event, you should
  // use `useIsFocused` hook. https://reactnavigation.org/docs/use-is-focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGifs();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.view}>
      <Image
        style={{
          resizeMode: "contain",
          width: 350,
          height: 400,
        }}
        source={
          imgSource !== undefined && imgSource?.images.original.url !== ""
            ? { uri: imgSource?.images.original.url }
            : require("../../assets/placeholder.png")
        }
      />
      <View style={styles.info}>
        <Image
          style={{
            resizeMode: "cover",
            width: 50,
            height: 50,
          }}
          source={
            // When checking for undefined, you should use
            // typeof user !== 'undefined' instead
            user !== undefined && user?.avatar_url !== ""
              ? { uri: user?.avatar_url }
              : require("../../assets/placeholder.png")
          }
        />
        <Text style={styles.username}>
          {/* In this case, to simplify this expression, you should write
              user?.display_name || "N/A"
           */}
          {user !== undefined ? user.display_name : "N/A"}
        </Text>
      </View>
      <Text style={styles.title}>
        {imgSource !== undefined ? imgSource.title : "N/A"}
      </Text>
      <Button
        onPress={() => {
          imgSource !== undefined && imgSource?.images.original.url !== ""
            ? onShare(imgSource?.images.original.url)
            : {};
        }}
        title="Share"
      />
    </View>
  );
};

export default DetailScreen;
