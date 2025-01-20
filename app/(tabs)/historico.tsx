import { HistoricoObjeto, ListaHistoricoProps } from '@/assets/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, Modal, ScrollView } from 'react-native';

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
      setListaHistorico(historicoArray);
    } catch (erro) {
      console.error('Erro ao buscar histórico:', erro);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    handleBuscarHistorico();
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
          data={listaHistorico.lista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item.descricao}</Text>
              <Text style={styles.listText}>R$ {item.valor}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Sem transações</Text>}
        />
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Historico de Listas</Text>
      <ScrollView>
        {listaHistorico.length > 0 ? (
          listaHistorico.map((item) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setListaSelecionada(item);
                  setModalVisivel(true);
                }}
              >
                <View key={String(item.id)} style={styles.listItem}>

                  <Text>{item.descricao}</Text>
                </View>
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
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listItem: {
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
    width: '98%'
  },
  listText: {
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
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white', // Opacidade total
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryScreen;