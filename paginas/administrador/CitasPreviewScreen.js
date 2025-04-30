import React, { useRef } from 'react';
import { View, StyleSheet, Button, Alert, Platform } from 'react-native';
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
      await generarPDF();
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

  const imprimirEnWeb = () => {
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
  };

  return (
    <View style={styles.container}>
      {/* Botones arriba */}
      <View style={styles.buttonContainer}>
        {Platform.OS !== 'web' ? (
          <>
            <Button title="Guardar PDF" onPress={generarPDF} color="#111" />
            <View style={{ height: 10 }} />
            <Button title="Compartir PDF" onPress={compartirPDF} color="#444" />
          </>
        ) : (
          <Button title="Imprimir desde el navegador" onPress={imprimirEnWeb} color="#007AFF" />
        )}
      </View>

      {/* WebView o HTML en móvil */}
      <View style={{ flex: 1 }}>
        <WebView originWhitelist={['*']} source={{ html: htmlContent }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default CitasPreviewScreen;
