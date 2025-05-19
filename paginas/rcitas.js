import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { supabase } from '../supabaseclient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GestionarCitaModal = ({ visible, onClose }) => {
  const [idCita, setIdCita] = useState('');

  const handleCancelar = async () => {
    if (!idCita.trim()) {
      Alert.alert('Error', 'Debes ingresar un ID válido.');
      return;
    }

    const { error } = await supabase.from('citas').delete().eq('id', idCita.trim());

    if (error) {
      Alert.alert('Error', 'No se pudo cancelar la cita.');
    } else {
      Alert.alert('Éxito', `Tu cita ha sido cancelada.`);
      setIdCita('');
      onClose();
    }
  };

  const handleReagendar = async () => {
    if (!idCita.trim()) {
      Alert.alert('Error', 'Debes ingresar un ID válido.');
      return;
    }

    try {
      await AsyncStorage.setItem('cita_id_para_reagendar', idCita.trim());
      Alert.alert('Reagendar cita', 'Ahora puedes llenar el formulario nuevamente.');
      setIdCita('');
      onClose();
    } catch (err) {
      Alert.alert('Error', 'No se pudo guardar el ID para reagendar.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modal}>
          <Text style={modalStyles.title}>Gestionar Cita</Text>
          <TextInput
            placeholder="Ingresa tu ID de cita"
            value={idCita}
            onChangeText={setIdCita}
            style={modalStyles.input}
            keyboardType="numeric"
          />
          <View style={modalStyles.buttonGroup}>
            <Pressable style={modalStyles.blackBtn} onPress={handleCancelar}>
              <Text style={modalStyles.btnText}>Cancelar</Text>
            </Pressable>
            <Pressable style={modalStyles.blackBtn} onPress={handleReagendar}>
              <Text style={modalStyles.btnText}>Reagendar</Text>
            </Pressable>
          </View>
          <Pressable onPress={onClose} style={modalStyles.whiteBtn}>
            <Text style={modalStyles.whiteBtnText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blackBtn: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  whiteBtn: {
    marginTop: 10,
    borderColor: '#000',
    borderWidth: 1.2,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  whiteBtnText: {
    color: '#000',
    fontWeight: '600',
  },
});

export default GestionarCitaModal;
