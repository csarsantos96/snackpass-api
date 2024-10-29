import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const Ticket = ({ route }) => {
  const { item, handleProductValidation } = route.params;

  // Inicializa os estados
  const [isValidated, setIsValidated] = useState(item.validated);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantityToValidate, setQuantityToValidate] = useState(1);
  const [currentQuantity, setCurrentQuantity] = useState(item.quantity); 

  const handleValidation = () => {
    if (currentQuantity > 1 && !isValidated) {
      setModalVisible(true); 
    } else if (!isValidated) {
      
      validateProduct(1);
    }
  };

  const validateProduct = (quantity) => {
    if (handleProductValidation) {
        handleProductValidation(item.id, quantity); 
        const newQuantity = currentQuantity - quantity; 
        setCurrentQuantity(newQuantity); 
        if (newQuantity <= 0) {
            setIsValidated(true); 
        }
    } else {
        console.error('handleProductValidation não foi passado');
    }
};

  const confirmValidation = () => {
    const validQuantity = Math.min(quantityToValidate, currentQuantity);
    validateProduct(validQuantity); 
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Image
        source={isValidated
          ? require('../assets/validado.png')
          : require('../assets/validar.png')}
        style={styles.image}
      />

      <TouchableOpacity
        style={[styles.button, isValidated && styles.buttonValidated]}
        onPress={handleValidation}
        disabled={isValidated}
      >
        <Text style={styles.buttonText}>
          {isValidated ? 'Validado' : 'Validar'}
        </Text>
      </TouchableOpacity>

     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              O produto tem {currentQuantity} unidades. Quantas deseja validar?
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(quantityToValidate)}
              onChangeText={(text) => {
                const quantity = parseInt(text);
                if (!isNaN(quantity) && quantity > 0 && quantity <= currentQuantity) {
                  setQuantityToValidate(quantity);
                } else {
                  setQuantityToValidate(1); 
                }
              }}
            />
            <Button title="Validar" onPress={confirmValidation} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
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
    backgroundColor: '#F9F9F9',
  },
  image: {
    width: 293,
    height: 580,
    marginBottom: 30,
  },
  button: {
    position: 'absolute',
    width: 195,
    height: 48,
    bottom: 225,
    backgroundColor: '#000066',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonValidated: {
    backgroundColor: '#28A745',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Ticket;
