import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import styles from '../estilos/modal_st'; 

const ModalRegistro = ({ visible, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [estudio, setEstudio] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleRegister = () => {
    // Aquí puedes agregar la lógica para registrar al usuario
    console.log("Registrando usuario:", { nombre, estudio, correo, contrasena });
    onClose(); // Cierra el modal después de registrar
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Formulario de Registro</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Estudio"
              value={estudio}
              onChangeText={setEstudio}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={correo}
              onChangeText={setCorreo}
              placeholderTextColor="#888"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={contrasena}
              onChangeText={setContrasena}
              placeholderTextColor="#888"
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ModalRegistro;
