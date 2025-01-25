import React, { useEffect, useState } from 'react';
import { View, Text, Platform, TouchableOpacity, Linking, StyleSheet } from 'react-native';

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

  const handleDownload = () => {
    // Reemplaza esta URL con el enlace de descarga de tu APK
    const apkUrl = 'https://tu-enlace-de-apk.com/download';
    Linking.openURL(apkUrl);
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
