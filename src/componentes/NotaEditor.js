import React, { useState } from "react";

import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { adicionarNota, atualizarNota, deletarNota } from "../servicos/Notas";

// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotaEditor({
  atualizarNotas: atualizarListagemDeNotas,
  modalVisivel,
  setModalVisivel,
  notaSelecionada,
  limparNotaSelecionada,
}) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Pessoal");
  const [texto, setTexto] = useState("");

  // const gerarId = async () => {
  //   const todasAsChaves = await AsyncStorage.getAllKeys();

  //   return (todasAsChaves.length + 1).toString();
  // };

  // const salvarNota = async () => {
  //   try {
  //     const id = await gerarId();

  //     const umaNota = {
  //       id,
  //       texto,
  //     };

  //     await AsyncStorage.setItem(umaNota.id, umaNota.texto);

  //     setModalVisivel(false);
  //     setTexto("");

  //     await atualizarNotas();
  //   } catch ({ message }) {
  //     Alert.alert(`Ocorreu algum erro ao salvar nota: ${message}`);
  //   }
  // };

  const abrirModal = () => {
    setModalVisivel(true);

    preencherModal(notaSelecionada);
  };

  const preencherModal = (nota) => {
    setTitulo(nota?.titulo || "");
    setCategoria(nota?.categoria || "Pessoal");
    setTexto(nota?.texto || "");
  };

  const fecharModal = () => {
    setModalVisivel(false);

    preencherModal();
    limparNotaSelecionada();
  };

  const salvarNota = async () => {
    try {
      const novaNota = {
        titulo,
        categoria,
        texto,
      };

      if (!notaSelecionada) {
        const feedback = await adicionarNota(novaNota);
        Alert.alert(feedback);
      } else {
        const feedback = await atualizarNota({
          ...novaNota,
          id: notaSelecionada.id,
        });
        Alert.alert(feedback);
      }

      fecharModal();

      await atualizarListagemDeNotas();
    } catch ({ message }) {
      Alert.alert(`Ocorreu algum erro ao salvar nota: ${message}`);
    }
  };

  const excluirNota = async () => {
    try {
      const feedback = await deletarNota(notaSelecionada.id);

      Alert.alert(feedback);

      fecharModal();

      await atualizarListagemDeNotas();
    } catch ({ message }) {
      Alert.alert(`Ocorreu algum erro ao salvar nota: ${message}`);
    }
  };

  React.useEffect(() => {
    if (notaSelecionada) abrirModal();
  }, [notaSelecionada]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(false);
        }}
      >
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Criar nota</Text>

              <Text style={estilos.modalSubTitulo}>T??tulo da nota</Text>

              <TextInput
                style={estilos.modalInput}
                onChangeText={setTitulo}
                placeholder="Digite aqui o t??tulo da nota"
                value={titulo}
              />

              <Text style={estilos.modalSubTitulo}>Categoria da nota</Text>

              <View style={estilos.modalPicker}>
                <Picker selectedValue={categoria} onValueChange={setCategoria}>
                  <Picker.Item label="Pessoal" value="Pessoal" />
                  <Picker.Item label="Trabalho" value="Trabalho" />
                  <Picker.Item label="Outros" value="Outros" />
                </Picker>
              </View>

              <Text style={estilos.modalSubTitulo}>Conte??do da nota</Text>

              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={setTexto}
                placeholder="Digite aqui seu lembrete"
                value={texto}
              />

              <View style={estilos.modalBotoes}>
                <TouchableOpacity
                  style={estilos.modalBotaoSalvar}
                  onPress={salvarNota}
                >
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>

                {!!notaSelecionada && (
                  <TouchableOpacity
                    style={estilos.modalBotaoDeletar}
                    onPress={excluirNota}
                  >
                    <Text style={estilos.modalBotaoTexto}>Excluir</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={estilos.modalBotaoCancelar}
                  onPress={fecharModal}
                >
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <TouchableOpacity onPress={abrirModal} style={estilos.adicionarMemo}>
        <Text style={estilos.adicionarMemoTexto}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const estilos = StyleSheet.create({
  centralizaModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  modal: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginTop: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 18,
  },
  modalInput: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#FF9A94",
  },
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    marginBottom: 12,
  },
  modalSubTitulo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBotaoSalvar: {
    backgroundColor: "#2ea805",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoDeletar: {
    backgroundColor: "#d62a18",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoCancelar: {
    backgroundColor: "#057fa8",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoTexto: {
    color: "#FFFFFF",
  },
  adicionarMemo: {
    backgroundColor: "#54ba32",
    justifyContent: "center",
    height: 64,
    width: 64,
    margin: 16,
    alignItems: "center",
    borderRadius: 9999,
    position: "absolute",
    bottom: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  adicionarMemoTexto: {
    fontSize: 32,
    lineHeight: 40,
    color: "#FFFFFF",
  },
});
