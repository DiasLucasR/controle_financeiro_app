import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
// import { API_URL } from '../api/config';

const dadosHistorico = [
  { id: "1", descricao: "Produto A", valor: "100.00" },
  { id: "2", descricao: "Produto B", valor: "200.00" },
  { id: "3", descricao: "Produto C", valor: "300.00" },
  { id: "4", descricao: "Produto D", valor: "400.00" },
  { id: "5", descricao: "Produto E", valor: "500.00" },
];

const listaHistorico = [
  { id: "1", descricao: "Lista A", lista: dadosHistorico },
  { id: "1", descricao: "Lista B", lista: dadosHistorico },
]

const HistoryScreen = () => {
  const [listaSelecionada, setListaSelecionada] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisivel , setModalVisivel] = useState(false);
  

  // const fetchTransactions = async () => {
  //   try {
  //     // Aqui você deve obter o user_id do estado global ou AsyncStorage
  //     const user_id = 1; // Exemplo, substitua pelo ID real do usuário logado
  //     // const response = await fetch(`${API_URL}/transactions/${user_id}`);
  //     const data = await response.json();

  //     if (response.ok) {
  //       setTransactions(data);
  //     } else {
  //       console.error('Erro ao buscar transações:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao buscar transações:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    console.log(listaSelecionada)
  }, [listaSelecionada]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    // fetchTransactions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }



  const ListaHistorico = (listaHistorico : any[], setModalVisivel: React.Dispatch<React.SetStateAction<any[]>>) => {

    return (
      <View>
        <FlatList
          data={listaHistorico.lista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>{item.descricao}</Text>
              <Text style={styles.transactionText}>R$ {item.valor}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Sem transações</Text>}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Controle Financeiro</Text>

      <FlatList
        data={listaHistorico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <TouchableOpacity onPress={() => {setListaSelecionada(item)
                                              setModalVisivel(true)
                                            console.log("s")
            }}>
              <Text>{item.descricao}</Text></TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Sem transações</Text>}
      />

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
       <ListaHistorico listaHistorico={listaSelecionada} setModalVisivel={setModalVisivel}/>
      </Modal>

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

