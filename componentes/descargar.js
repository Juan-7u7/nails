import React, { useEffect, useState } from 'react';
import { View, Text, Platform, TouchableOpacity, Linking, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const ComponenteWeb = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta si está en un dispositivo móvil en la web
    if (Platform.OS === 'web') {
      const handleResize = () => {
        // Cambia el estado si el ancho de la ventana es menor a 768px (típico de móviles)
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Llama al handler al cargar la página para verificar el tamaño inicial

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (Platform.OS !== 'web' || !isMobile) {
    return null; // No renderiza el componente en plataformas que no sean web o si no es móvil
  }

  const handleDownload = async () => {
    // Enlace directo de descarga en Dropbox
    const apkUrl = 'https://www.dropbox.com/scl/fi/pu4rz8h96dvgkdjxhkvim/Nails.apk?rlkey=qj1xfmvqe5jk82fg9xtf5t2g9&st=7upvzjey&dl=1';

    // Verificar si la URL puede ser abierta
    const supported = await Linking.canOpenURL(apkUrl);
    if (supported) {
      try {
        // Intentamos abrir el enlace de Dropbox directamente (esto puede funcionar en algunos dispositivos móviles)
        await Linking.openURL(apkUrl);
      } catch (err) {
        console.error("Error al intentar abrir el enlace: ", err);
      }
    } else {
      // Si no se puede abrir, se maneja la descarga manualmente
      try {
        const downloadResumable = FileSystem.createDownloadResumable(
          apkUrl,
          FileSystem.documentDirectory + 'Nails.apk'
        );
        const { uri } = await downloadResumable.downloadAsync();
        Alert.alert("Descarga completada", `El archivo se ha descargado en: ${uri}`);
      } catch (err) {
        console.error("Error al intentar descargar el archivo: ", err);
        Alert.alert("Error", "Hubo un problema al intentar descargar el archivo.");
      }
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Prueba nuestra APP</Text>
      <Text style={styles.descripcion}>
        ¡Agenda tus citas fácilmente en nuestro estudio de uñas! Disfruta de la comodidad de gestionar tu
        agenda desde tu móvil, sin complicaciones y de manera rápida.
      </Text>
      <TouchableOpacity style={styles.boton} onPress={handleDownload}>
        <Text style={styles.botonTexto}>Descargar aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
  },
  botonTexto: {
    fontSize: 18,
    color: 'white',
  },
});

export default ComponenteWeb;
