import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import BottomMenu, { MenuItem } from "../components/BottomMenu";
import { listarFavoritos, toggleFavorito } from "../../services/favoritos";
import { styles } from "./styles"; // ✅ usa seu styles.ts

export default function Favoritos() {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    setFavoritos(listarFavoritos());
  }, [isFocused]);

  const removerFavorito = (item: any) => {
    toggleFavorito(item);
    setFavoritos(listarFavoritos());
  };

  const menuItems: MenuItem[] = [
    {
      icon: "home-outline",
      label: "Início",
      onPress: () => navigation.navigate("Home"),
    },
    {
      icon: "heart",
      label: "Favoritos",
      onPress: () => {},
    },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("Receita", { idMeal: item.idMeal })
      }
    >
      <ImageBackground
        source={{ uri: item.strMealThumb }}
        style={styles.recipeCard}        // ✅ reutiliza
        imageStyle={styles.recipeImage} // ✅ reutiliza
      >
        {/* ❤️ ÍCONE FAVORITO */}
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            margin: 10,
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 6,
            borderRadius: 20,
          }}
          onPress={() => removerFavorito(item)}
        >
          <Ionicons name="heart" size={20} color="red" />
        </TouchableOpacity>

        {/* 🔽 NOME COM FUNDO ESCURO */}
        <Text style={styles.recipeTitle}>{item.strMeal}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FB6D01" }}>
      <Header title="Receitas Favoritas ❤️" />

      {favoritos.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 40,
            color: "#fff",
            fontSize: 16,
          }}
        >
          Nenhuma receita favoritada 😕
        </Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <BottomMenu items={menuItems} />
    </View>
  );
}
