import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";
import BottomMenu, { MenuItem } from "../components/BottomMenu";
import { styles as homeStyles } from "./styles";

type Receita = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function Home() {
  const navigation = useNavigation<any>();

  const [busca, setBusca] = useState("");
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔄 BUSCAR RECEITAS DA API
  const buscarReceitas = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=American"
      );

      const data = await response.json();

      if (data.meals) {
        setReceitas(data.meals);
      } else {
        setReceitas([]);
      }
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      setReceitas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarReceitas();
  }, []);

  // 🔍 FILTRO DA BARRA DE BUSCA
  const receitasFiltradas = receitas.filter((item) =>
    item.strMeal.toLowerCase().includes(busca.toLowerCase())
  );

  // 🔽 MENU INFERIOR
  const menuItems: MenuItem[] = [
    {
      icon: "home-outline",
      label: "Início",
      onPress: () => navigation.navigate("Home"),
    },
    {
      icon: "heart-outline",
      label: "Favoritos",
      onPress: () => navigation.navigate("Favoritos"),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* ✅ HEADER COM LOGO CENTRALIZADO */}
      <Header
        title="American Kitchen"
        logo={require("../../assets/logo3.png")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[homeStyles.homeScroll, { paddingBottom: 120 }]}
      >
        {/* 🔍 BARRA DE BUSCA */}
        <View style={homeStyles.searchContainer}>
          <Text style={homeStyles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Buscar receita"
            placeholderTextColor="#999"
            style={homeStyles.searchInput}
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        {/* TÍTULO */}
        <Text style={homeStyles.sectionTitle}>Receitas</Text>

        {/* ⏳ LOADING */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#FB6D01"
            style={{ marginTop: 20 }}
          />
        )}

        {/* 🍽️ LISTA DE RECEITAS */}
        {!loading &&
          receitasFiltradas.map((item) => (
            <TouchableOpacity
              key={item.idMeal}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("Receita", {
                  idMeal: item.idMeal,
                })
              }
            >
              <ImageBackground
                source={{ uri: item.strMealThumb }}
                style={homeStyles.recipeCard}
                imageStyle={homeStyles.recipeImage}
              >
                <Text style={homeStyles.recipeTitle}>
                  {item.strMeal}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}

        {/* ❌ SEM RESULTADOS */}
        {!loading && receitasFiltradas.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "#555",
            }}
          >
            Nenhuma receita encontrada 😕
          </Text>
        )}
      </ScrollView>

      {/* 🔽 MENU INFERIOR */}
      <BottomMenu items={menuItems} />
    </View>
  );
}
