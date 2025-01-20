import { HistoricoObjeto, ListaHistoricoProps } from '@/assets/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, Modal, ScrollView } from 'react-native';
// import { API_URL } from '../api/config';


const HistoryScreen = () => {
  const [listaSelecionada, setListaSelecionada] = useState<HistoricoObjeto>({});
  const [listaHistorico, setListaHistorico] = useState<HistoricoObjeto[]>([]);

  const [loading, setLoading] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);

  const handleBuscarHistorico = async () => {
    try {
      let historicoString = await AsyncStorage.getItem('historico');
      let historico = historicoString ?? '[]';
      let historicoArray = JSON.parse(historico) as HistoricoObjeto[];
      setListaHistorico(historicoArray)
    } catch (erro) {

    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    handleBuscarHistorico()
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }



  const ListaHistoricoComponent: React.FC<ListaHistoricoProps> = ({ listaHistorico, setModalVisivel }) => {

    return (
      <SafeAreaView style={styles.modalContainer}>
        <FlatList
          nestedScrollEnabled
          data={listaSelecionada.lista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem} >
              <Text style={styles.transactionText}>{item.descricao}</Text>
              <Text style={styles.transactionText}>R$ {item.valor}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Sem transações</Text>}
        />
      </SafeAreaView>
    )
  }
  console.log(listaHistorico)
  return (
  <SafeAreaView style={styles.container}>
 
       <Text style={styles.header}>Controle Financeiro</Text>
      <ScrollView>
        {listaHistorico && listaHistorico.length > 0 ? (
          listaHistorico.map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <TouchableOpacity
                onPress={() => {
                  setListaSelecionada(item);
                  setModalVisivel(true);
                }}
              >
                <Text>{item.descricao}</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Sem transações</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleBuscarHistorico()}
      >
        <Text style={styles.addButtonText}>Buscar Historico</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <ListaHistoricoComponent listaHistorico={listaSelecionada} setModalVisivel={setModalVisivel} />
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    marginTop: 20
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});



export default HistoryScreen;

