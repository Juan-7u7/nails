import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const PerfilScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Nails Studio',
    photo: 'https://via.placeholder.com/150',
  });

  const [highlights, setHighlights] = useState([
    { id: '1', title: 'Gelish', image: 'https://via.placeholder.com/100' },
    { id: '2', title: 'Pedicura', image: 'https://via.placeholder.com/100' },
    { id: '3', title: 'Manicura', image: 'https://via.placeholder.com/100' },
  ]);

  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleEditToggle = () => setEditMode(!editMode);

  const handleChange = (field, value) => setProfile({ ...profile, [field]: value });

  const updateHighlightTitle = (id, newTitle) => {
    setHighlights((prev) =>
      prev.map((highlight) => (highlight.id === id ? { ...highlight, title: newTitle } : highlight))
    );
  };

  const addHighlight = () => {
    const newHighlight = {
      id: (highlights.length + 1).toString(),
      title: `Nuevo ${highlights.length + 1}`,
      image: 'https://via.placeholder.com/100',
    };
    setHighlights([...highlights, newHighlight]);
  };

  const handleLongPress = (highlight) => {
    setSelectedHighlight(highlight);
    setModalVisible(true);
  };

  const deleteHighlight = () => {
    setHighlights((prev) => prev.filter((highlight) => highlight.id !== selectedHighlight.id));
    setModalVisible(false);
    setSelectedHighlight(null);
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate('Home'); // Cambia 'Home' al nombre de tu pantalla principal
  };
  

  return (
    <View style={styles.container}>
      {/* Botón de Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setLogoutModalVisible(true)}
      >
        <Icon name="logout" size={24} color="white" />
      </TouchableOpacity>

      {/* Botón de edición */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
        <Icon name="edit" size={24} color="black" />
      </TouchableOpacity>

      {/* Contenedor de la foto */}
      <View style={styles.photoContainer}>
        <Image source={{ uri: profile.photo }} style={styles.photo} />
        {editMode && (
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={() => alert('Cambiar foto (aquí puedes agregar lógica para subir foto)')}
          >
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Nombre del estudio */}
      {editMode ? (
        <TextInput
          style={styles.nameInput}
          value={profile.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Nombre del estudio"
          placeholderTextColor="#888"
        />
      ) : (
        <Text style={styles.nameText}>{profile.name}</Text>
      )}

      {/* Cifras debajo del nombre */}
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>1200</Text>
          <Text style={styles.statsLabel}>Visitas</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>850</Text>
          <Text style={styles.statsLabel}>Atendidas</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>4.8</Text>
          <Text style={styles.statsLabel}>Valoración</Text>
        </View>
      </View>

      {/* Highlights */}
      <View style={styles.highlightsContainer}>
        <FlatList
          data={highlights}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(item)}
              delayLongPress={300}
            >
              <View style={styles.highlight}>
                <Image source={{ uri: item.image }} style={styles.highlightImage} />
                {editMode ? (
                  <TextInput
                    style={styles.highlightInput}
                    value={item.title}
                    onChangeText={(text) => updateHighlightTitle(item.id, text)}
                  />
                ) : (
                  <Text style={styles.highlightText}>{item.title}</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
        {editMode && (
          <TouchableOpacity style={styles.addHighlightButton} onPress={addHighlight}>
            <Icon name="add" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Modal para eliminar highlights */}
      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              ¿Deseas eliminar el highlight{' '}
              <Text style={{ fontWeight: 'bold' }}>{selectedHighlight?.title}</Text>?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={deleteHighlight}>
                <Text style={styles.modalButtonText}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'gray' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Logout */}
      <Modal
        transparent
        visible={logoutModalVisible}
        animationType="slide"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Deseas cerrar sesión?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'gray' }]}
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
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  photoContainer: {
    marginTop: 60,
    marginBottom: 20,
    alignItems: 'center',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  statsBox: {
    alignItems: 'center',
  },
  highlightsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  highlight: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  highlightImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'black',
  },
  highlightText: {
    marginTop: 5,
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
  highlightInput: {
    marginTop: 5,
    fontSize: 12,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: 'center',
  },
  addHighlightButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PerfilScreen;
