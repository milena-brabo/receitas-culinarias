import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import BottomMenu, { MenuItem } from "../components/BottomMenu";
import { listarFavoritos, toggleFavorito, isFavorito } from "../../services/favoritos";

export default function Favoritos() {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused(); // detecta quando a tela volta a ficar ativa
  const [favoritos, setFavoritos] = useState<any[]>([]);

  // Atualiza a lista sempre que a tela for exibida
  useEffect(() => {
    setFavoritos(listarFavoritos());
  }, [isFocused]);

  // Alterna favorito (adiciona ou remove)
  const alternarFavorito = (item: any) => {
    toggleFavorito(item); // remove ou adiciona
    setFavoritos(listarFavoritos()); // atualiza a lista
  };

  const menuItems: MenuItem[] = [
    { icon: "home-outline", label: "Início", onPress: () => navigation.navigate("Home") },
    { icon: "heart-outline", label: "Favoritos", onPress: () => {} },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      {/* Clicar na receita abre a tela Receita */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Receita", { idMeal: item.idMeal })}
      >
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{item.strMeal}</Text>
      </TouchableOpacity>

      {/* Coração para remover favorito */}
      <TouchableOpacity onPress={() => alternarFavorito(item)}>
        <Ionicons
          name="heart"
          size={24}
          color={isFavorito(item.idMeal) ? "red" : "#fff"} // vermelho se favoritado
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Favoritos" onBack={() => navigation.goBack()} />

      {favoritos.length === 0 ? (
        <Text style={styles.empty}>Nenhum favorito ainda</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        />
      )}

      <BottomMenu items={menuItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FB6D01" },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  item: { flexDirection: "row", alignItems: "center" },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  title: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  empty: { fontSize: 16, textAlign: "center", marginTop: 32, color: "#fff" },
});






