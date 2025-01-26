import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av'; // Importar Audio
import styles from './estilos/app_st';
import ModalRegistro from './componentes/ModalRegistro';
import AwesomeAlert from 'react-native-awesome-alerts';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AgendarCitas from './paginas/citas';
import Cotizar from './paginas/cotizar';
import Diseños from './paginas/diseños';
import ComponenteWeb from './componentes/descargar';
import InstagramLink from './componentes/instagram';
import WhatsappLink from './componentes/whatsapp';
import FacebookLink from './componentes/facebook';

const Stack = createStackNavigator();

// Componente App principal
export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AgendarCitas"
            component={AgendarCitasScreen}
            options={{ title: 'Agendar Citas' }}
          />
          <Stack.Screen
            name="Cotizar"
            component={CotizarScreen}
            options={{ title: 'Cotizar' }}
          />
          <Stack.Screen
            name="Diseños"
            component={DiseñosScreen}
            options={{ title: 'Diseños' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ScrollView>
  );
}

// Componente HomeScreen separado
function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [showServices, setShowServices] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertServiceName, setAlertServiceName] = useState('');

  // Estado para manejar el audio
  const [sound, setSound] = useState();

  // Función para reproducir el sonido de bienvenida
  const playWelcomeSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./sonidos/welcome.mp3') // Ruta del archivo de audio
    );
    setSound(sound);
    await sound.playAsync(); // Reproduce el sonido
  };

  // Reproduce el sonido al montar el componente
  useEffect(() => {
    playWelcomeSound();

    return () => {
      sound && sound.unloadAsync(); // Descargar el sonido cuando el componente se desmonte
    };
  }, []);

  const handleServiceClick = (screenName) => {
    navigation.navigate(screenName);
  };

  const toggleServicesAndLogin = () => {
    setShowServices(false);
    setShowLoginForm(true);
  };

  const toggleBackToServices = () => {
    setShowServices(true);
    setShowLoginForm(false);
  };

  const handleServicesClick = () => {
    setShowServices(true);
    setShowLoginForm(false);
  };

  const handleAdminClick = () => {
    setShowServices(false);
    setShowLoginForm(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#333333', 'transparent']}
        style={styles.header}
      >
        <Text style={[styles.title,]}>Nails</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          <Text style={styles.text}>Esta es una Aplicacion en la que podras tener los servicios mas completos a tu alcance.</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bienvenida</Text>
            <Text style={styles.cardText}>Sientete comoda en explorar cada uno de nuestros apartados y disfrutar de nuestros servicios.</Text>
          </View>

          <View style={styles.transparentContainer}>
            <Text style={styles.transparentText}>Aqui encontraras nuestros principales canales para servicios o administracion.</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleServicesClick}>
                <Icon name="design-services" size={20} color="#fff" />
                <Text style={styles.buttonText}>Servicios</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleAdminClick}>
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

                <TouchableOpacity style={styles.buttonBack} onPress={toggleBackToServices}>
                  <Text style={styles.buttonText}>Volver a los Servicios</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerLinkContainer} onPress={() => setModalVisible(true)}>
                  <Text style={styles.registerLinkText}>Regístrate aquí</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            )}

            {showServices && (
              <View style={styles.servicesContainer}>
                <Text style={styles.servicesTitle}>Nuestros Servicios</Text>
                <TouchableOpacity
                  style={styles.serviceButton}
                  onPress={() => handleServiceClick('AgendarCitas')}
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
            <ComponenteWeb />
            <InstagramLink />
            <WhatsappLink />
            <FacebookLink />
          </View>
        </View>

        <ModalRegistro visible={isModalVisible} onClose={() => setModalVisible(false)} />
      </ScrollView>
      <LinearGradient
        colors={['transparent', '#333333']}
        style={styles.footer}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </SafeAreaView>
  );
}

function AgendarCitasScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AgendarCitas />
    </View>
  );
}

function CotizarScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Cotizar />
    </View>
  );
}

function DiseñosScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Diseños />
    </View>
  );
}
