import { Alert, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { auth } from "../../network/config/firebase";
import { signOut } from "firebase/auth";
import styles from "./Profile.style";
import Button from "../../components/button/Button";
import { logout } from "../../network/store/authSlice";
import { useDispatch } from "react-redux";
import BackButton from '../../components/backButton/BackButton'

export default function Profile({ navigation }) {
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  }
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout())
      navigation.navigate("Login");
    } catch (error) {
      console.log(error)
    }
  };
  const askLogout = () => {
    Alert.alert(
      'Logout',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress : () => handleLogout()
        }
      ]
    )
  }
  return (
      <SafeAreaView style={styles.container}>
        <BackButton onPress={() => goBack()} />
        <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <Text style={styles.information}>Name Surname :</Text>
          <Text style={styles.userInformation}>{user.displayName}</Text>
        </View>
        <View style={styles.thirdContainer}>
          <Text style={styles.information}>Email :</Text>
          <Text style={styles.userInformation}>{user.email}</Text>
        </View>
        <Button label="Logout" color="red" onPress={askLogout} />
        </View>
      </SafeAreaView>
  );
}
