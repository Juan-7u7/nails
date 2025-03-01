import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from '../estilos/modal_st';
import { supabase } from '../supabaseclient';

const ModalRegistro = ({ visible, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [estudio, setEstudio] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar el registro del usuario
  const handleRegister = async () => {
    setIsLoading(true);

    // Validación de campos
    if (!nombre || !estudio || !correo || !contrasena) {
      setErrorMessage("Todos los campos son obligatorios.");
      setAlertError(true);
      setIsLoading(false);
      return;
    }

    // Validación del formato del correo electrónico
    if (!/\S+@\S+\.\S+/.test(correo)) {
      setErrorMessage("Por favor, introduce un correo electrónico válido.");
      setAlertError(true);
      setIsLoading(false);
      return;
    }

    // Validación de la longitud de la contraseña
    if (contrasena.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      setAlertError(true);
      setIsLoading(false);
      return;
    }

    try {
      console.log("Registrando usuario:", { nombre, estudio, correo });

      // Insertar el usuario en la base de datos
      const { data, error } = await supabase
        .from('administradores')
        .insert([{ nombre, estudio, correo, pass: contrasena }]);

      if (error) {
        console.error("Error al registrar usuario:", error);

        // Manejo de errores específicos
        if (error.code === '23505') {
          if (error.message.includes('administradores_correo_key')) {
            setErrorMessage("El correo electrónico ya está registrado.");
          } else if (error.message.includes('administradores_estudio_key')) {
            setErrorMessage("El estudio ya está registrado.");
          } else {
            setErrorMessage("El registro ya existe. Verifica los datos.");
          }
        } else {
          setErrorMessage("Hubo un problema al registrar el usuario.");
        }

        setAlertError(true);
        setIsLoading(false);
        return;
      }

      console.log("Usuario registrado:", data);
      setAlertSuccess(true); // Muestra la alerta de éxito
    } catch (error) {
      console.error("Error en el proceso de registro:", error);
      setErrorMessage("Hubo un problema al registrar el usuario.");
      setAlertError(true);
    } finally {
      setIsLoading(false);

      // Limpiar los campos del formulario
      setNombre('');
      setEstudio('');
      setCorreo('');
      setContrasena('');
    }
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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
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

            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Registrarse</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>

      {/* Alerta de Éxito */}
      <AwesomeAlert
        show={alertSuccess}
        title="¡Registro Exitoso!"
        message="El usuario ha sido registrado correctamente."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#000"
        onConfirmPressed={() => {
          setAlertSuccess(false);
          onClose(); // Cierra el modal al confirmar
        }}
      />

      {/* Alerta de Error */}
      <AwesomeAlert
        show={alertError}
        title="Error al Registrar"
        message={errorMessage || "Hubo un problema al registrar el usuario."}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#000"
        onConfirmPressed={() => {
          setAlertError(false);
        }}
      />
    </Modal>
  );
};

export default ModalRegistro;