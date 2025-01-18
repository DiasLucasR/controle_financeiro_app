import FormLista, { ListaArray } from '@/components/FormLista';
import { Icon } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = () => {

  const [modalVisivel , setModalVisivel] = useState(false);
  const [lista, setLista] = useState<ListaArray[]>([]);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Controle Financeiro</Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>{item.descricao}</Text>
            <Text style={styles.transactionText}>R$ {Number(item.valor).toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Sem transações</Text>}
      />


      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisivel(true)}
      >
        <Text style={styles.addButtonText}>+ Adicionar</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
       <FormLista setLista={setLista} setModalVisivel={setModalVisivel}/>
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
});

export default DashboardScreen;

