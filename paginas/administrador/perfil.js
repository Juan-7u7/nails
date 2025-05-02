import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const IMAGE_URL = 'https://nailsco.es/wp-content/uploads/2024/12/gel-y-acrilico-realizadas9.jpg';
const screenWidth = Dimensions.get('window').width;
const spacing = 4;
const numColumns = 3;
const imageSize = (screenWidth - spacing * (numColumns + 1)) / numColumns;

const estilosUnas = [
  'Uñas acrílicas',
  'Francesa clásica',
  'Gelish pastel',
  'Manicura rusa',
  'Diseño con piedras',
  'Estilo animal print',
  'Baby boomer',
  'Uñas neón',
  'Diseño minimalista',
  'Uñas mate',
  'Efecto mármol',
  'Francesa invertida',
];

const pruebasIniciales = estilosUnas.map((desc, index) => ({
  id: (index + 1).toString(),
  image: { uri: IMAGE_URL },
  description: desc,
}));

export default function PerfilMaqueta() {
  const navigation = useNavigation();
  const [pruebas, setPruebas] = useState(pruebasIniciales);
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAgregar = () => {
    setSelectedItem(null);
    setDescripcion('');
    setModalVisible(true);
  };

  const handleGuardar = () => {
    if (selectedItem) {
      setPruebas((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id ? { ...item, description: descripcion } : item
        )
      );
    } else {
      const nuevaPrueba = {
        id: Date.now().toString(),
        image: { uri: IMAGE_URL },
        description: descripcion || 'Sin descripción',
      };
      setPruebas((prev) => [...prev, nuevaPrueba]);
    }
    setModalVisible(false);
    setDescripcion('');
    setSelectedItem(null);
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setDescripcion(item.description);
    setModalVisible(true);
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate('Home'); // Cambia esto al nombre real de tu pantalla inicial
  };

  return (
    <View style={styles.container}>
      {/* Botón Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setLogoutModalVisible(true)}
      >
        <Icon name="logout" size={22} color="white" />
      </TouchableOpacity>

      <Image source={require('../../assets/perfil.png')} style={styles.profileImage} />
      <Text style={styles.title}>Nails Studio</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAgregar}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <FlatList
        data={pruebas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gallery}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.gridItem}>
            <Image source={item.image} style={styles.gridImage} />
          </TouchableOpacity>
        )}
      />

      {/* Modal de agregar/editar prueba */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedItem ? 'Editar prueba' : 'Agregar prueba'}
            </Text>
            <Image source={{ uri: IMAGE_URL }} style={[styles.modalImage]} />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              placeholderTextColor="#888"
              value={descripcion}
              onChangeText={setDescripcion}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleGuardar}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setDescripcion('');
                setSelectedItem(null);
              }}
              style={[styles.modalButton, { backgroundColor: '#888' }]}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de logout */}
      <Modal
        transparent
        visible={logoutModalVisible}
        animationType="slide"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Deseas cerrar sesión?</Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#888' }]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  profileImage: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    borderRadius: screenWidth * 0.2,
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  addButton: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: 'white',
  },
  addButtonText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  gallery: {
    paddingBottom: 100,
    paddingHorizontal: spacing,
  },
  gridItem: {
    width: imageSize,
    height: imageSize,
    margin: spacing,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalImage: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '100%',
    marginBottom: 20,
    fontSize: 14,
    color: 'black',
    paddingVertical: 6,
  },
  modalButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
});
