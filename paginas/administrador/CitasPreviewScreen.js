import React, { useRef } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const CitasPreviewScreen = ({ route }) => {
  const { htmlContent } = route.params;
  const pdfUriRef = useRef(null);

  const generarPDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      pdfUriRef.current = uri;
      Alert.alert('PDF generado', 'El archivo está listo para compartir o guardar.');
    } catch (error) {
      console.error('Error al generar PDF:', error);
      Alert.alert('Error', 'No se pudo generar el archivo.');
    }
  };

  const compartirPDF = async () => {
    if (!pdfUriRef.current) {
      await generarPDF(); // generar si aún no existe
    }

    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(pdfUriRef.current);
      } else {
        Alert.alert('No disponible', 'Compartir no está disponible en este dispositivo.');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      Alert.alert('Error', 'No se pudo compartir el archivo.');
    }
  };

  return (
    <View style={styles.container}>
      <WebView originWhitelist={['*']} source={{ html: htmlContent }} style={{ flex: 1 }} />
      <View style={styles.buttonContainer}>
        <Button title="Guardar PDF" onPress={generarPDF} color="#111" />
        <View style={{ height: 10 }} />
        <Button title="Compartir PDF" onPress={compartirPDF} color="#444" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
});

export default CitasPreviewScreen;
