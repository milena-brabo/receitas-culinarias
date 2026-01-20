import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Cada botão do menu
export interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  color?: string; // opcional para ícone ativo
}

// Props do BottomMenu
interface BottomMenuProps {
  items: MenuItem[];
}

const BottomMenu: React.FC<BottomMenuProps> = ({ items }) => {
  return (
    <View style={styles.bottomMenu}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={item.onPress}
        >
          <Ionicons name={item.icon} size={24} color={item.color || "#000"} />
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomMenu;

const styles = StyleSheet.create({
  bottomMenu: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FB6D01",
    borderTopWidth: 1,
    borderColor: "#00000030",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    fontSize: 12,
    marginTop: 4,
  },
});

