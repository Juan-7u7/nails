import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
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
  const [alertEmailExists, setAlertEmailExists] = useState(false);

  const handleRegister = async () => {
    console.log("Verificando existencia del correo:", correo);

    // Verificar si el correo ya está registrado
    const { data: existingUsers, error: fetchError } = await supabase
      .from('administradores')
      .select('correo')
      .eq('correo', correo);

    if (fetchError) {
      console.error("Error al verificar el correo:", fetchError);
      setErrorMessage(fetchError.message);
      setAlertError(true);
      return;
    }

    if (existingUsers.length > 0) {
      console.warn("El correo ya está registrado:", correo);
      setAlertEmailExists(true);
      return;
    }

    console.log("Registrando usuario:", { nombre, estudio, correo, contrasena });

    const { data, error } = await supabase
      .from('administradores')
      .insert([{ nombre, estudio, correo, pass: contrasena }]);

    if (error) {
      console.error("Error al registrar usuario:", error);
      setErrorMessage(error.message);
      setAlertError(true);
      return;
    }

    console.log("Usuario registrado:", data);
    setAlertSuccess(true);
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

      {/* Alerta de Correo Existente */}
      <AwesomeAlert
        show={alertEmailExists}
        title="Correo ya registrado"
        message="El correo ingresado ya está registrado. Intente con otro."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#000"
        onConfirmPressed={() => {
          setAlertEmailExists(false);
        }}
      />

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
          onClose();
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