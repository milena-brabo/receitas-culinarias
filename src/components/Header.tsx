import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onBack?: () => void; // função opcional para botão voltar
  onMenu?: () => void; // função opcional para menu
}

const Header: React.FC<HeaderProps> = ({ title, onBack, onMenu }) => {
  return (
    <View style={styles.header}>
      {/* LADO ESQUERDO */}
      {onBack ? (
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 26 }} />
      )}

      {/* TÍTULO */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* LADO DIREITO */}
      {onMenu ? (
        <TouchableOpacity onPress={onMenu}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28 }} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#FB6D01',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


