import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, KeyboardAvoidingViewComponent, Text, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import styles from "./Register.style";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../network/config/firebase";
import BackButton from "../../components/backButton/BackButton";

const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required!"),
  surname: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required!"),
  email: Yup.string().
  email("Invalid email").
  required("Required!"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(10, "Too Long!")
    .required("Required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords not match!")
    .required("Required"),
});

export default function Register({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { name: "", surname: "", email: "", password: "" },
      onSubmit: () => signUp(),
    });

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: `${values.name} ${values.surname}`,
      });
      navigation.navigate("Login");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code.includes("email-already")) {
        Alert.alert("Error", "This email is already in use");
      }
    }
  };
  const goLogin = () => {
    navigation.navigate("Login");
  };

  return (
    
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <BackButton onPress={ () => goLogin()} />
        <View style={styles.secondContainer}>
        <Text style={styles.headerText}>Register</Text>
        <View style={styles.inputContainer}>
          <Input
            onBlur={handleBlur("name")}
            error={errors.name}
            touched={touched.name}
            placeholder="Enter your name"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange("name")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            onBlur={handleBlur("surname")}
            error={errors.surname}
            touched={touched.surname}
            placeholder="Enter your surname"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            onChangeText={handleChange("surname")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            placeholder="Enter your email"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange("email")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            placeholder="Enter your password"
            secureTextEntry
            autoCompleteType="password"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            onChangeText={handleChange("password")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            onBlur={handleBlur("confirmPassword")}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            placeholder="Enter your password again"
            secureTextEntry
            autoCompleteType="password"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            onChangeText={handleChange("confirmPassword")}
          />
        </View>
        <Button
          label="Create"
          color="#e94832"
          loading={loading}
          onPress={handleSubmit}
        />
        </View>
      </KeyboardAvoidingView>
  );
}
