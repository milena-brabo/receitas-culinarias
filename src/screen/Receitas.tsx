import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import Header from "../components/Header";
import BottomMenu, { MenuItem } from "../components/BottomMenu";
import { toggleFavorito, isFavorito } from "../../services/favoritos";

interface RouteParams {
  idMeal: string;
}

export default function Receitas() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { idMeal } = route.params as RouteParams;

  const [receita, setReceita] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    async function buscarReceita() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        const data = await response.json();
        if (data.meals) setReceita(data.meals[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    buscarReceita();
  }, [idMeal]);

  useEffect(() => {
    setFavorito(isFavorito(idMeal));
  }, [idMeal]);

  const favoritarReceita = () => {
    toggleFavorito(receita);
    setFavorito(isFavorito(idMeal));
  };

  const link ="exp://172.28.123.127:8081";
  const compartilharReceita = async () => {
    
    try {
      await Share.share({
        // message: `🍽️ Receita: ${receita.strMeal}\n\n${receita.strInstructions}`,
        message: `🍽️ Receita: ${receita.strMeal}\n\n${link}`,
      });
    } catch {
      Alert.alert("Erro", "Não foi possível compartilhar");
    }
  };

  const menuItems: MenuItem[] = [
    { icon: "home-outline", label: "Início", onPress: () => navigation.navigate("Home") },
    { icon: "heart-outline", label: "Favoritos", onPress: () => navigation.navigate("Favoritos") },
  ];

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FB6D01" />
      </View>
    );
  }

  const ingredientes = () => {
    if (!receita) return [];
    const lista: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingrediente = receita[`strIngredient${i}`];
      const medida = receita[`strMeasure${i}`];
      if (ingrediente && ingrediente.trim() !== "") {
        lista.push(`${medida ?? ""} ${ingrediente}`.trim());
      }
    }
    return lista;
  };

  return (
    <View style={styles.container}>
      <Header title={receita.strMeal} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Image source={{ uri: receita.strMealThumb }} style={styles.image} />

        <View style={styles.titleOverlay}>
          <Text style={styles.title}>{receita.strMeal}</Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={favoritarReceita}>
              <Ionicons
                name="heart"
                size={22}
                color={favorito ? "red" : "#fff"} // vermelho se favoritado
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={compartilharReceita}>
              <Ionicons name="share-social-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          {ingredientes().map((item, index) => (
            <Text key={index} style={styles.text}>• {item}</Text>
          ))}

          <Text style={styles.sectionTitle}>Modo de preparo</Text>
          <Text style={styles.text}>{receita.strInstructions}</Text>
        </View>
      </ScrollView>

      <BottomMenu items={menuItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FB6D01" },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "100%", height: 240 },
  titleOverlay: {
    position: "absolute",
    top: 200,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  icons: { flexDirection: "row", gap: 12 },
  content: { marginTop: 24, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 12, marginBottom: 6, color: "#000" },
  text: { fontSize: 14, marginBottom: 6, color: "#000", lineHeight: 20 },
});






