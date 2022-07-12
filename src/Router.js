import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import MarketDetail from "./pages/marketDetail/MarketDetail";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function Router() {
  const user = useSelector((state) => state.auth.user)
  return (
    <NavigationContainer>
      {user ? (
         <Stack.Navigator>
         <Stack.Screen
           name="Home"
           component={Home}
           options={{
             headerShown: false,
           }}
         />
         <Stack.Screen
           name="Profile"
           component={Profile}
           options={{
             headerShown: false,
           }}
         />
         <Stack.Screen
           name="MarketDetail"
           component={MarketDetail}
           options={{
             headerShown: false,
           }}
         />
       </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
