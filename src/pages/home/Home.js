import { SafeAreaView, StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { baseService } from "../../network/services/baseService";
import { FlatList } from "react-native";
import MarketCard from "../../components/marketCard/MarketCard";
import Input from "../../components/input/Input";
import { AntDesign } from "@expo/vector-icons";
import styles from "./Home.style";
import { ActivityIndicator } from "react-native-paper";

export default function Home({ navigation }) {
  const [mainData, setMainData] = useState([]);
  const [refreshedData, setRefreshData] = useState([]);
  const [loading, setloading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getData();
    fadeIn();
  }, []);

  const getData = async () => {
    const dataUrl = "https://api4.bitlo.com/market/ticker/all";
    try {
      const data = await baseService.get(dataUrl);
      setMainData(data);
      setRefreshData(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  const renderMarkets = ({ item }) => (
    <MarketCard item={item} onSelect={() => onSelect(item.marketCode)} />
  );
  const onSelect = (marketCode) => {
    navigation.navigate("MarketDetail", { marketCode });
  };
  const goToProfile = () => {
    navigation.navigate("Profile");
  };
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };
  const searchMarket = (text) => {
    const filteredList = mainData.filter((data) => {
      const searchText = text.toUpperCase();
      return data.marketCode.indexOf(searchText) > -1;
    });
    setRefreshData(filteredList);
  };
  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator animating={loading} color="blue" />
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={styles.upContainer}>
              <View style={styles.secondContainer}>
                <Animated.View
                  style={[
                    styles.fadingContainer,
                    {
                      opacity: fadeAnim,
                    },
                  ]}
                >
                  <Text style={styles.brandName}>Bitlo</Text>
                </Animated.View>
                <AntDesign
                  name="user"
                  style={styles.profileIcon}
                  size={34}
                  color="black"
                  onPress={() => goToProfile()}
                />
              </View>
              <Input
                style={styles.search}
                icon="magnifying-glass"
                placeholder="Search..."
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                onChangeText={(text) => searchMarket(text)}
              />
            </View>
          }
          data={refreshedData}
          renderItem={renderMarkets}
        />
      )}
    </SafeAreaView>
  );
}
