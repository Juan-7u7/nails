import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

const CardWithVerticalContainers = () => {
  const [inputText, setInputText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const cardRef = useRef();

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const handleSend = async () => {
    if (inputText.trim()) {
      try {
        setLoading(true);

        const multipleColors = inputText.includes(",") || inputText.toLowerCase().includes(" y ");

        const enhancedPrompt = multipleColors
          ? `Five isolated nail-shaped containers, each one showing a design that combines these colors: ${inputText}. Each nail should have a creative mix of the colors mentioned, placed on a solid white background, no hands, no fingers, no skin, no objects, minimalistic, clean, vector illustration.`
          : `Five isolated nail-shaped containers, each with the color: ${inputText}, placed on a solid white background, no hands, no fingers, no skin, no objects, minimalistic, clean, vector illustration.`;

        const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: enhancedPrompt }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error generando imagen:', errorData);
          throw new Error('Error generando imagen');
        }

        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setImageUri(base64data);
          setLoading(false);
        };
        reader.readAsDataURL(blob);

      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
      setInputText('');
    }
  };

  const handleCaptureAndSave = async () => {
    if (!permissionResponse?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert('Permiso requerido', 'No se puede guardar sin permiso.');
        return;
      }
    }

    try {
      const uri = await captureRef(cardRef, {
        format: 'jpg',
        quality: 0.9,
      });

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('NailDesigns', asset, false);
      Alert.alert('Captura guardada', 'Se guardó la imagen en tu galería.');
    } catch (error) {
      console.error('Error capturando imagen:', error);
      Alert.alert('Error', 'No se pudo capturar la tarjeta.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card} ref={cardRef}>
        {/* Imagen generada */}
        <View style={[styles.innerContainer, { flex: 0.6, padding: 0 }]}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.text}>No hay imagen aún</Text>
          )}
        </View>

        {/* Input para escribir prompt */}
        <View style={[styles.innerContainer, { flex: 0.4 }]}>
          <Text style={styles.text}>Generador de Ideas</Text>

          <View style={styles.inputContainer}>
            {/* Botón cámara a la izquierda */}
            <TouchableOpacity style={styles.captureButton} onPress={handleCaptureAndSave}>
              <MaterialIcons name="photo-camera" size={24} color="white" />
            </TouchableOpacity>

            {/* Campo de texto */}
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Escribe tu idea..."
            />

            {/* Botón enviar */}
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <MaterialIcons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#f7f3ff',
  },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 10, // agregado para dar más espacio horizontal
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Dimensions.get("window").width * 0.95, // antes 0.9
    height: Dimensions.get("window").height * 0.85,
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  innerContainer: {
    backgroundColor: "#f7f3ff",
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 5, // nuevo
    marginTop: 20,
  },
  captureButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 6, // reducido de 10 a 6
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0, // nuevo
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});


export default CardWithVerticalContainers;
