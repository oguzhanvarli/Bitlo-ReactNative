import React from "react";
import { TextInput as RNTextInput, View, Text } from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";
import styles from "./Input.style";

export default function Input({ touched, icon, error, ...otherProps }) {
  const validationColor = !touched ? "#223e4b" : error ? "red" : "#32CD32";

  return (
    <View>
      {error && touched ? <Text style={styles.errorMessage}>{error}</Text>: null}
    <View style={[styles.inputContainer, { borderColor: validationColor }]}>
      <View style={styles.iconContainer}>
        <Icon name={icon} style={{ color: validationColor }} size={16} />
      </View>
      <View style={styles.inputSecondContainer}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
          {...otherProps}
        />
      </View>
    </View>
    </View>
  );
}
