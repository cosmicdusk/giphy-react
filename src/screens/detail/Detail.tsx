import React, { Component, useEffect, useState } from "react";
import type { DetailProps } from "../../navigations/RootNavigator";

import {
  Image,
  View,
  Text,
  Button,
  Share,
  Alert,
  StyleSheet,
} from "react-native";
import { GiphyUser } from "../../models/GiphyUser";
import { GiphyItem } from "../../models/GiphyItem";

const DetailScreen: React.FC<DetailProps> = ({ route, navigation }) => {
  // Image source
  const [imgSource, setImgSource] = useState<GiphyItem>();
  // User detail
  const [user, setUser] = useState<GiphyUser>();
  // Style sheet
  const styles = StyleSheet.create({
    view: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: 10,
      backgroundColor: "black",
    },
    space: {
      flex: 0.01,
    },
    info: {
      width: "90%",
      margin: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    title: {
      color: "cyan",
      fontWeight: "bold",
      fontSize: 20,
      marginLeft: 5,
      textAlign: "center",
    },
    username: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
      marginLeft: 5,
      textAlign: "center",
    },
  });

  const fetchGifs = async () => {
    try {
      const API_KEY = "AkWYlV4FWlJcQgXuTJriDZZJ93ghMbLE";
      const BASE_URL = "http://api.giphy.com/v1/gifs/";

      const resJson = await fetch(
        `${BASE_URL}${route.params.id}?api_key=${API_KEY}`
      );
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
            user !== undefined && user?.avatar_url !== ""
              ? { uri: user?.avatar_url }
              : require("../../assets/placeholder.png")
          }
        />
        <Text style={styles.username}>
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
