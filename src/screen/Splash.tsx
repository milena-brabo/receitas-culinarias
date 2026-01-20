import React, { useEffect } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); // vai para a Home e remove a Splash
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#204E20" barStyle="light-content" />
      <Image
        source={require("../../assets/logo3.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>
        O melhor da cozinha americana na sua casa.
      </Text>
    </View>
  );
}


