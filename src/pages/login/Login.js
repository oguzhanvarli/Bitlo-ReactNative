import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import styles from "./Login.syle";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../network/config/firebase";
import { useDispatch} from "react-redux";
import { signin } from "../../network/store/authSlice";



const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required!"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(10, "Too Long!")
    .required("Required!"),
});

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { email: "", password: "" },
      onSubmit: () => handleLogin(),
    });
  const handleLogin = async () => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      dispatch(signin())
      navigation.navigate("Home");
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error.code.includes('user-not-found')) {
        Alert.alert('Error', 'Please check your email address')
      }else if (error.code.includes('wrong-password')) {
        Alert.alert('Error', 'Please check your password')
      }
      console.log(error.code)
    }
  };
  const goRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <View style={styles.inputContainer}>
        <Input
          onBlur={handleBlur("email")}
          error={errors.email}
          touched={touched.email}
          icon="mail"
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
          icon="key"
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
      <Button label="Login" color="#e94832" loading={loading} onPress={handleSubmit} />
      <Button
        label="Create Account"
        color="#008B8B"
        onPress={() => goRegister()}
      />
    </View>
  );
}
