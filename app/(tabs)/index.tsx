import { ListaObjeto } from '@/assets/types/types';
import FormLista from '@/components/FormLista';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = () => {

  const [modalVisivel , setModalVisivel] = useState(false);
  const [lista, setLista] = useState<ListaObjeto[]>([]);

  const handleSalvarHistorico = async () => {
    try {
      if(lista.length){

        let historicoString = await AsyncStorage.getItem('historico');

        let historico = historicoString ? JSON.parse(historicoString) : [];

        if(!Array.isArray(historico)){
          historico = [];  
        }
        historico.push({id: Number(historico.length) + 1, descricao: "Lista " + historico.length, lista: lista});
        await AsyncStorage.setItem('historico', JSON.stringify(historico));
        setLista([]);
      }else{
        Alert.alert(
          "Atenção!",
          "Não há itens na sua lista atual.",
          [
            { text: "Ok", onPress: () => console.log("Confirmado") }
          ]
        );
      }

    } catch (error) {
      console.error('Erro ao salvar o histórico:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Lista</Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>{item.descricao}</Text>
            <Text style={styles.transactionText}>R$ {Number(item.valor).toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Sem itens listados</Text>}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisivel(true)}
      >
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleSalvarHistorico()}
      >
        <Text style={styles.addButtonText}>Salvar no Histórico</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <FormLista setLista={setLista} setModalVisivel={setModalVisivel} />
      </Modal>

      <StatusBar style="auto" />      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;