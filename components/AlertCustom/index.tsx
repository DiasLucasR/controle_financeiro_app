import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const CustomAlert = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showAlert = () => setModalVisible(true);
  const hideAlert = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showAlert} style={styles.button}>
        <Text style={styles.buttonText}>Mostrar Alerta</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Atenção!</Text>
          <Text style={styles.alertMessage}>
            Esta é uma mensagem personalizada.
          </Text>
          <View style={styles.alertButtons}>
            <TouchableOpacity onPress={hideAlert} style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideAlert} style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  alertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  alertButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  alertButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomAlert;