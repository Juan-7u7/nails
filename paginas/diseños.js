import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

const ContenedorResponsive = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('1');
  const [selectedNailType, setSelectedNailType] = useState('natural');

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleNumberModal = () => {
    setShowNumberModal(!showNumberModal);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diseño</Text>
      <TouchableOpacity style={styles.plusButton} onPress={toggleButtons}>
        <FontAwesome name="plus" size={24} color="#333" />
      </TouchableOpacity>

      {showButtons && (
        <View style={styles.extraButtonsContainer}>
          <TouchableOpacity style={styles.extraButton} onPress={toggleModal}>
            <FontAwesome name="hand-paper-o" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraButton} onPress={toggleNumberModal}>
            <FontAwesome name="hashtag" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tipos de Uñas</Text>
            <Picker
              selectedValue={selectedNailType}
              onValueChange={(itemValue) => setSelectedNailType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Uña Natural" value="natural" />
              <Picker.Item label="Uña Redonda" value="round" />
              <Picker.Item label="Uña Ovalada" value="oval" />
              <Picker.Item label="Uña Cuadrada" value="cuadrada" />
              <Picker.Item label="Uña Squoval" value="squoval" />
              <Picker.Item label="Uña Almendrada" value="almendrada" />
              <Picker.Item label="Uña Pintalabios" value="pintalabios" />
              <Picker.Item label="Uña Abanico" value="abanico" />
              <Picker.Item label="Uña Pico de montaña" value="pico de montaña" />
              <Picker.Item label="Uña Stiletto" value="stiletto" />
              <Picker.Item label="Uña Bailarina" value="bailarina" />
              <Picker.Item label="Uña Punta de flecha" value="flecha" />
            </Picker>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => {
                alert(`Seleccionaste ${selectedNailType === 'natural' ? 'Uña Natural' : 
                       selectedNailType === 'round' ? 'Uña Redonda' : 'Uña Ovalada'}`);
                toggleModal();
              }}
            >
              <Text style={styles.closeButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showNumberModal}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleNumberModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Números de Uña</Text>
            <Picker
              selectedValue={selectedNumber}
              onValueChange={(itemValue) => setSelectedNumber(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="#1" value="1" />
              <Picker.Item label="#2" value="2" />
              <Picker.Item label="#3" value="3" />
              <Picker.Item label="#4" value="4" />
              <Picker.Item label="#5" value="5" />
              <Picker.Item label="#6" value="6" />
              <Picker.Item label="#7" value="7" />
              <Picker.Item label="#8" value="8" />
            </Picker>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => {
                alert(`Seleccionaste Uña #${selectedNumber}`);
                toggleNumberModal();
              }}
            >
              <Text style={styles.closeButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    width: Platform.select({
      ios: '100%',
      android: '100%',
      web: '70%',
    }),
    height: Platform.select({
      ios: '80%',
      android: '80%',
      web: '90%',
    }),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginTop: Platform.select({
      ios: 10,
      android: 0,
      web: 0,
    }),
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
  },  
  plusButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 4,
  },
  extraButtonsContainer: {
    position: 'absolute',
    top: 70,
    left: 10,
  },
  extraButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginBottom: 10,
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  picker: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#F4F4F4',
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ContenedorResponsive;