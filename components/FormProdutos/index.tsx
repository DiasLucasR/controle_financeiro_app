import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export interface FormPagamentosProps {
    setTrasacoes: React.SetStateAction<{ id: string; descricao: string; valor: string }[]>

    setModalVisivel: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export default function FormPagamentos({ setTrasacoes, setModalVisivel}: FormPagamentosProps) {
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
      descricao: '',
      valor: '',
    });

    const handleAddTransaction = () => {
        if (form.descricao && form.valor) {
          setTrasacoes((prev) => [
            ...prev,
            { id: Date.now().toString(), ...form },
          ]);
          setForm({ descricao: '', valor: '' });
        }
      };
    

  return (
    <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Adicionar Transação</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={form.descricao}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, descricao: text }))
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Valor (R$)"
        value={form.valor}
        keyboardType="numeric"
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, valor: text }))
        }
      />

      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisivel(false)}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleAddTransaction}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

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