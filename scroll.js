//este codigo si funciona su scroll, pero no tiene la nevagacion entre vistas.

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './estilos/app_st';
import ModalRegistro from './componentes/ModalRegistro'; // Asegúrate de importar correctamente el componente ModalRegistro
import AwesomeAlert from 'react-native-awesome-alerts'; // Cambia la importación

export default function App() {
  const { width, height } = useWindowDimensions();
  const [showServices, setShowServices] = useState(true); // Estado de los servicios
  const [showLoginForm, setShowLoginForm] = useState(false); // Estado del formulario de login
  const [isModalVisible, setModalVisible] = useState(false); // Nuevo estado para controlar la visibilidad del modal
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta
  const [alertServiceName, setAlertServiceName] = useState(''); // Para almacenar el nombre del servicio

  const toggleServicesAndLogin = () => {
    setShowServices(false); // Oculta los servicios
    setShowLoginForm(true); // Muestra el formulario de login
  };

  const toggleBackToServices = () => {
    setShowServices(true); // Muestra los servicios
    setShowLoginForm(false); // Oculta el formulario de login
  };

  const handleServicesClick = () => {
    setShowServices(true); // Muestra los servicios
    setShowLoginForm(false); // Asegúrate de ocultar el login si es visible
  };

  const handleAdminClick = () => {
    setShowServices(false); // Oculta los servicios
    setShowLoginForm(true); // Muestra el formulario de login
  };

  // Función para mostrar el AwesomeAlert cuando se hace clic en un servicio
  const handleServiceClick = (serviceName) => {
    console.log('Botón presionado:', serviceName); // Verificar si se está disparando
    setAlertServiceName(serviceName); // Almacenar el nombre del servicio
    setShowAlert(true); // Mostrar la alerta
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        // barStyle="light-content"
      />
      

      <ScrollView
        contentContainerStyle={styles.scrollView}
        bounces={false}
      >
        <LinearGradient
          colors={['#333333', 'transparent']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          align-items="center"
        >
          <Text style={styles.title}>Bienvenido a Nails ✨</Text>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.text}>Esta es una Aplicacion en la que podras tener los servicios mas completos a tu alcance.</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bienvenida</Text>
            <Text style={styles.cardText}>Sientete comoda en explorar cada uno de nuestros apartados y disfrutar de nuestros servicios.</Text>
          </View>

          <View style={styles.transparentContainer}>
            <Text style={styles.transparentText}>Aqui encontraras nuestros principales canales para servicios o administracion.</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleServicesClick} // Actualizado para mostrar servicios
              >
                <Icon name="design-services" size={20} color="#fff" />
                <Text style={styles.buttonText}>Servicios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleAdminClick} // Actualizado para mostrar administrador
              >
                <Icon name="admin-panel-settings" size={20} color="#fff" />
                <Text style={styles.buttonText}>Administrador</Text>
              </TouchableOpacity>
            </View>

            {showLoginForm && (
              <KeyboardAvoidingView style={styles.loginContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TextInput
                  style={styles.input}
                  placeholder="Correo Electrónico"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  placeholderTextColor="#888"
                  secureTextEntry
                />
                <TouchableOpacity style={styles.loginButton}>
                  <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonBack}
                  onPress={toggleBackToServices}
                >
                  <Text style={styles.buttonText}>Volver a los Servicios</Text>
                </TouchableOpacity>

                {/* Enlace para abrir el modal de registro */}
                <TouchableOpacity
                  style={styles.registerLinkContainer}
                  onPress={() => setModalVisible(true)} // Cambia el estado para mostrar el modal
                >
                  <Text style={styles.registerLinkText}>Regístrate aquí</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            )}

            {showServices && (
              <View style={styles.servicesContainer}>
                <Text style={styles.servicesTitle}>Nuestros Servicios</Text>
                <TouchableOpacity
                  style={styles.serviceButton}
                  onPress={() => handleServiceClick('Agendar citas')}
                >
                  <Icon name="calendar-today" size={20} color="#000" />
                  <Text style={styles.serviceText}>Agendar citas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.serviceButton}
                  onPress={() => handleServiceClick('Cotizar')}
                >
                  <Icon name="attach-money" size={20} color="#000" />
                  <Text style={styles.serviceText}>Cotizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.serviceButton}
                  onPress={() => handleServiceClick('Diseños')}
                >
                  <Icon name="brush" size={20} color="#000" />
                  <Text style={styles.serviceText}>Diseños</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <ModalRegistro visible={isModalVisible} onClose={() => setModalVisible(false)} />

        <LinearGradient
          colors={['transparent', '#333333']}
          style={styles.footer}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </ScrollView>

      {/* Mostrar el alert usando AwesomeAlert */}
      <AwesomeAlert
        show={showAlert}
        title="Has Seleccionado:"
        message={alertServiceName}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#000"
        onConfirmPressed={() => setShowAlert(false)}
      />
    </SafeAreaView>
  );
   
}