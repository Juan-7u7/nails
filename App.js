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
import Administrador from './paginas/administrador';
import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabaseclient'; // Ajusta la ruta si es necesario
// import { supabase } from '../nails/supabaseclient';
import { Alert } from 'react-native';
import CitasPreviewScreen from './paginas/administrador/CitasPreviewScreen';




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
          <Stack.Screen
  name="VistaPreviaCitas"
  component={CitasPreviewScreen}
  options={{ title: 'Vista previa PDF' }}
/>
          <Stack.Screen
  name="Administrador"
  component={Administrador}
  options={{ title: 'Panel de Administrador', headerShown: false }}
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

  // const { width, height } = useWindowDimensions();
  // const [showServices, setShowServices] = useState(true);
  // const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState(''); // Estado para el correo
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingrese su correo y contraseña.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Buscar en la tabla "administradores" si el usuario existe
      const { data, error } = await supabase
        .from('administradores')
        .select('correo, contraseña') // Asegúrate de que el campo se llama "contraseña" en la DB
        .eq('correo', email)
        .eq('contraseña', password) // Comparar la contraseña con la base de datos
        .maybeSingle(); // Devuelve un solo registro si existe
  
      if (error) {
        throw error;
      }
  
      if (!data) {
        Alert.alert("Error", "Correo o contraseña incorrectos.");
        setLoading(false);
        return;
      }
  
      console.log("Inicio de sesión exitoso:", data);
      navigation.replace("Administrador"); // Redirigir al panel de administración
  
    } catch (error) {
      console.log("Error en el inicio de sesión:", error);
      Alert.alert("Error", "Hubo un problema con la conexión.");
    } finally {
      setLoading(false);
    }
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
              <KeyboardAvoidingView 
                style={styles.loginContainer} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Correo Electrónico"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail} // Capturar el valor ingresado
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  placeholderTextColor="#888"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword} // Capturar la contraseña ingresada
                />
                <TouchableOpacity 
                  style={styles.loginButton} 
                  onPress={handleLogin} 
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>{loading ? "Cargando..." : "Iniciar Sesión"}</Text>
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
