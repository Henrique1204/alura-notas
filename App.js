import React from "react";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import NotaEditor from "./src/componentes/NotaEditor";
import { Nota } from "./src/componentes/Nota";

export default function App() {
  const [notas, setNotas] = React.useState([]);

  const mostrarNotas = async () => {
    try {
      const todasAsChaves = await AsyncStorage.getAllKeys();
      const todasAsNotas = await AsyncStorage.multiGet(todasAsChaves);

      setNotas(todasAsNotas);
    } catch ({ message }) {
      Alert.alert(`Erro ao mostrar notas: ${message}`);
    }
  };

  React.useEffect(() => {
    mostrarNotas();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />

      <FlatList
        data={notas}
        keyExtractor={([id]) => id}
        renderItem={({ item: [_, conteudo] }) => <Nota>{conteudo}</Nota>}
      />

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
