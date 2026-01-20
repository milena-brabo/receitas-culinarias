// Navigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./src/screen/Splash";
import Home from "./src/screen/Home";
import Favoritos from "./src/screen/Favoritos";
import Receitas from "./src/screen/Receitas";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Receita" component={Receitas} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
