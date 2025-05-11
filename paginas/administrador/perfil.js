import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function ServiciosAdmin() {
  const navigation = useNavigation();
  const viewShotRef = useRef();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [nuevoServicio, setNuevoServicio] = useState('');
  const [nuevoCosto, setNuevoCosto] = useState('');
  const [seleccionados, setSeleccionados] = useState([]);
  const [mostrarTicket, setMostrarTicket] = useState(false);

  const agregarServicio = () => {
    if (nuevoServicio && nuevoCosto) {
      const nuevo = {
        id: Date.now().toString(),
        nombre: nuevoServicio,
        costo: parseFloat(nuevoCosto),
      };
      const actualizados = [...servicios, nuevo];
      setServicios(actualizados);
      setNuevoServicio('');
      setNuevoCosto('');
    }
  };

  const toggleSeleccionado = (item) => {
    if (seleccionados.includes(item.id)) {
      setSeleccionados(seleccionados.filter(id => id !== item.id));
    } else {
      setSeleccionados([...seleccionados, item.id]);
    }
  };

  const total = servicios
    .filter(item => seleccionados.includes(item.id))
    .reduce((sum, item) => sum + item.costo, 0);

  const handleLogout = () => {
    setLogoutModalVisible(false);
    setServicios([]);
    setSeleccionados([]);
    setMostrarTicket(false);
    navigation.navigate('Home');
  };

  const generarTicket = () => {
    setMostrarTicket(true);
  };

  const compartirTicket = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const newPath = FileSystem.documentDirectory + 'ticket.jpg';
      await FileSystem.moveAsync({ from: uri, to: newPath });
      await Sharing.shareAsync(newPath);
    } catch (error) {
      console.error('Error al capturar o compartir:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModalVisible(true)}>
        <Icon name="logout" size={20} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Servicios</Text>

      <TextInput
        placeholder="Nombre del servicio"
        value={nuevoServicio}
        onChangeText={setNuevoServicio}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Costo"
        value={nuevoCosto}
        onChangeText={setNuevoCosto}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.addButton} onPress={agregarServicio}>
        <Text style={styles.addButtonText}>Agregar Servicio</Text>
      </TouchableOpacity>

      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSeleccionado(item)}
            style={[styles.serviceItem, seleccionados.includes(item.id) && styles.selectedItem]}
          >
            <Text style={styles.serviceText}>{item.nombre}</Text>
            <Text style={styles.serviceText}>${item.costo.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        style={styles.serviceList}
      />

      <TouchableOpacity style={styles.ticketButton} onPress={generarTicket}>
        <Text style={styles.ticketButtonText}>Generar Ticket</Text>
      </TouchableOpacity>

      {mostrarTicket && (
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} style={styles.ticketBox}>
          <Text style={styles.ticketTitle}>Nota de Servicios</Text>
          {servicios.filter(item => seleccionados.includes(item.id)).map(item => (
            <View key={item.id} style={styles.ticketItem}>
              <Text style={styles.ticketText}>{item.nombre}</Text>
              <Text style={styles.ticketText}>${item.costo.toFixed(2)}</Text>
            </View>
          ))}
          <Text style={styles.ticketTotal}>Total: ${total.toFixed(2)}</Text>
          <Text style={styles.footerText}>Visítanos: https://nailspage.netlify.app/</Text>
        </ViewShot>
      )}

      {mostrarTicket && (
        <TouchableOpacity style={styles.shareButton} onPress={compartirTicket}>
          <Text style={styles.shareButtonText}>Compartir por WhatsApp</Text>
        </TouchableOpacity>
      )}

      <Modal transparent visible={logoutModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Deseas cerrar sesión?</Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 60,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#111',
    padding: 8,
    borderRadius: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#222',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 6,
    color: '#222',
  },
  addButton: {
    backgroundColor: '#222',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  serviceList: {
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#e0f7fa',
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
  },
  ticketButton: {
    backgroundColor: '#00695c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  ticketButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ticketBox: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ticketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  ticketText: {
    fontSize: 16,
    color: '#333',
  },
  ticketTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  footerText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#25D366',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  modalButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#888',
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