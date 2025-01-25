import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Modal, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Asegúrate de tener instalada esta librería para los íconos

const ContenedorResponsive = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para el modal de tipos de uñas
  const [showNumberModal, setShowNumberModal] = useState(false); // Estado para el modal de números de uña

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const toggleModal = () => {
    setShowModal(!showModal); // Cambia el estado de visibilidad del modal de tipos de uñas
  };

  const toggleNumberModal = () => {
    setShowNumberModal(!showNumberModal); // Cambia el estado de visibilidad del modal de números de uñas
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diseño</Text>
      {/* Botón principal con el símbolo "+" */}
      <TouchableOpacity style={styles.plusButton} onPress={toggleButtons}>
        <FontAwesome name="plus" size={24} color="#333" />
      </TouchableOpacity>

      {/* Botones adicionales que se muestran al hacer clic en el "+" */}
      {showButtons && (
        <View style={styles.extraButtonsContainer}>
          {/* Botón de la uña que abrirá el modal de tipos de uñas */}
          <TouchableOpacity style={styles.extraButton} onPress={toggleModal}>
            <FontAwesome name="hand-paper-o" size={24} color="#333" />
          </TouchableOpacity>
          {/* Botón # que abrirá el modal con números de uñas */}
          <TouchableOpacity style={styles.extraButton} onPress={toggleNumberModal}>
            <FontAwesome name="hashtag" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      )}

      {/* Modal de tipos de uñas */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal} // Cerrar el modal si el usuario presiona el botón de atrás
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tipos de Uñas</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => alert('Seleccionaste Uña 1')}>
              <Text style={styles.modalButtonText}>Uña Natural</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => alert('Seleccionaste Uña 2')}>
              <Text style={styles.modalButtonText}>Uña Redonda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => alert('Seleccionaste Uña 3')}>
              <Text style={styles.modalButtonText}>Uña Ovalada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de números de uñas */}
      <Modal
        visible={showNumberModal}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleNumberModal} // Cerrar el modal si el usuario presiona el botón de atrás
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Números de Uña</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => alert('Seleccionaste Uña #1')}>
              <Text style={styles.modalButtonText}>#1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => alert('Seleccionaste Uña #2')}>
              <Text style={styles.modalButtonText}>#2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => alert('Seleccionaste Uña #3')}>
              <Text style={styles.modalButtonText}>#3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleNumberModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
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
      ios: '100%', // Para dispositivos móviles y tabletas (iOS)
      android: '100%', // Para dispositivos móviles y tabletas (Android)
      web: '70%', // Para escritorio
    }),
    height: Platform.select({
      ios: '80%', // Para dispositivos móviles (iOS)
      android: '80%', // Para dispositivos móviles (Android)
      web: '90%', // Para escritorio
    }),
    alignSelf: 'center', // Centra el contenedor en el centro de la pantalla
    justifyContent: 'center', // Centra el contenido dentro del contenedor
    borderRadius: 16, // Bordes redondeados
    padding: 16, // Espaciado interno (opcional)
    shadowColor: '#000', // Sombra para dar profundidad (opcional)
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Sombra para Android
    marginTop: Platform.select({
      ios: 10, // Solo en móviles iOS
      android: 0, // Solo en móviles Android
      web: 0, // Sin margen superior en escritorio
    }),
    position: 'relative', // Necesario para posicionar los botones adicionales
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Color del texto del título
    textAlign: 'center', // Centra el título horizontalmente
    position: 'absolute', // Posiciona el título de manera absoluta
    top: 10, // Lo coloca en la parte superior del contenedor (puedes ajustar el valor)
    left: 0,
    right: 0,
  },  
  plusButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 50, // Botón redondeado
    elevation: 4, // Sombra para Android
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
    elevation: 4, // Sombra para Android
  },
  // Estilos del Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo transparente negro
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
