import {Text, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from './BackButton.style'
import { Ionicons } from "@expo/vector-icons";

export default function BackButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="black"
          style={styles.backIcon}
        />
      </TouchableOpacity>
  )
}
