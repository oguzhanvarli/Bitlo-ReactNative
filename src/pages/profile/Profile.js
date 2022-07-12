import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { auth } from "../../network/config/firebase";
import { signOut } from "firebase/auth";
import styles from "./Profile.style";
import Button from "../../components/button/Button";
import {
  Button as DiologButton,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import { logout } from "../../network/store/authSlice";
import { useDispatch } from "react-redux";

export default function Profile({ navigation }) {
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout())
      navigation.navigate("Login");
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View style={styles.secondContainer}>
          <Text style={styles.information}>Name Surname :</Text>
          <Text style={styles.userInformation}>{user.displayName}</Text>
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.information}>Email :</Text>
          <Text style={styles.userInformation}>{user.email}</Text>
        </View>
        <Button label="Logout" color="red" onPress={showDialog} />
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Logout</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Do you want to Logout?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <DiologButton onPress={handleLogout}>Yes</DiologButton>
              <DiologButton onPress={hideDialog}>Done</DiologButton>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
}
