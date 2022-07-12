import {Text,TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Button.style'
import { ActivityIndicator} from 'react-native-paper';

export default function Button({ label, color, onPress, loading }) {
  return (
    <TouchableOpacity
    style={[styles.button, {backgroundColor: color }]}
    activeOpacity={0.7}
    onPress={onPress}>
      {loading ? (<ActivityIndicator color='white'/>): 
    <Text style={styles.buttonText}>
    {label}
    </Text>}
  </TouchableOpacity>
  )
}