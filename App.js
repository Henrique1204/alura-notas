import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import NotaEditor from "./src/componentes/NotaEditor";

export default function App() {
  const [notas, setNotas] = React.useState([]);

  const mostrarNotas = async () => {
    try {
      const todasAsChaves = await AsyncStorage.getAllKeys();
      const todasAsNotas = await AsyncStorage.multiGet(todasAsChaves);
    
      setNotas(todasAsNotas);
    } catch({ message }) {
      Alert.alert(`Erro ao mostrar notas: ${message}`);
    }
  };

  React.useEffect(() => {
    mostrarNotas();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />

      <NotaEditor atualizarNotas={mostrarNotas} />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
