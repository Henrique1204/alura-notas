import React from "react";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";

import NotaEditor from "./src/componentes/NotaEditor";
import { Nota } from "./src/componentes/Nota";
import { buscarNotas, criaTabela } from "./src/servicos/Notas";

export default function App() {
  const [notas, setNotas] = React.useState([]);
  const [notaSelecionada, setNotaSelecionada] = React.useState();
  const [modalVisivel, setModalVisivel] = React.useState(false);

  // const mostrarNotas = async () => {
  //   try {
  //     const todasAsChaves = await AsyncStorage.getAllKeys();
  //     const todasAsNotas = await AsyncStorage.multiGet(todasAsChaves);

  //     setNotas(todasAsNotas);
  //   } catch ({ message }) {
  //     Alert.alert(`Erro ao mostrar notas: ${message}`);
  //   }
  // };

  const mostrarNotas = async () => {
    try {
      const todasAsNotas = await buscarNotas();

      setNotas(todasAsNotas);
    } catch ({ message }) {
      Alert.alert(`Erro ao mostrar notas: ${message}`);
    }
  };

  React.useEffect(() => {
    criaTabela();
    mostrarNotas();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />

      <FlatList
        data={notas}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setNotaSelecionada(item)}>
            <Nota {...item} />
          </TouchableOpacity>
        )}
      />

      <NotaEditor
        atualizarNotas={mostrarNotas}
        modalVisivel={modalVisivel}
        setModalVisivel={setModalVisivel}
        limparNotaSelecionada={() => setNotaSelecionada(undefined)}
        notaSelecionada={notaSelecionada}
      />
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
