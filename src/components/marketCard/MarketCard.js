import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./MarketCard.style";

export default function MarketCard({ item, onSelect }) {
  return (
    <TouchableOpacity onPress={() => onSelect()}>
      <View style={styles.container}>
        <Text style={styles.marketCode}>{item.marketCode}</Text>
        <Text style={styles.currentQuote}>{item.currentQuote}</Text>
      </View>
    </TouchableOpacity>
  );
}
