import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../screen/styles";

interface HeaderProps {
  title: string;
  logo?: any;
  onBack?: () => void;
  onMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  logo,
  onBack,
  onMenu,
}) => {
  return (
    <View style={styles.header}>
      {/* BLOCO ESQUERDO: LOGO + TÍTULO */}
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        {onBack ? (
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        ) : logo ? (
          <Image
            source={logo}
            style={{
              width: 36,
              height: 36,
              resizeMode: "contain",
              marginRight: 10, // 🔥 aproxima do texto
            }}
          />
        ) : null}

        <Text
          style={[
            styles.headerTitle,
            { textAlign: "left" }, // 🔥 alinha com a logo
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* MENU DIREITO */}
      {onMenu && (
        <TouchableOpacity onPress={onMenu}>
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
