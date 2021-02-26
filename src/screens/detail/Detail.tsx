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
import { GiphyItem } from "../../models/GiphyItem";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const DetailScreen: React.FC<DetailProps> = ({ route, navigation }) => {
  // Gif detail
  const [gifDetail, setGifDetail] = useState<GiphyItem>();
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
  const isFocused = useIsFocused();

  const onShare = async (url: string) => {
    try {
      await Share.share({
        message: url,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setGifDetail(route.params.gif);
    }, [])
  );

  return (
    <View style={styles.view}>
      {isFocused && (
        <>
          <Image
            style={{
              resizeMode: "contain",
              width: 350,
              height: 400,
            }}
            source={
              typeof gifDetail !== "undefined" &&
              gifDetail?.images.original.url !== ""
                ? { uri: gifDetail?.images.original.url }
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
                typeof gifDetail?.user?.avatar_url !== "undefined"
                  ? { uri: gifDetail?.user.avatar_url }
                  : require("../../assets/placeholder.png")
              }
            />
            <Text style={styles.username}>
              {gifDetail?.user?.display_name || "N/A"}
            </Text>
          </View>
          <Text style={styles.title}>{gifDetail?.title || "N/A"}</Text>
          <Button
            onPress={() => {
              typeof gifDetail !== "undefined" &&
              gifDetail?.images.original.url !== ""
                ? onShare(gifDetail?.images.original.url!)
                : {};
            }}
            title="Share"
          />
        </>
      )}
    </View>
  );
};

export default DetailScreen;
