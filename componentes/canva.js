import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Image, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CardWithVerticalContainers = () => {
  const [inputText, setInputText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (inputText.trim()) {
      try {
        setLoading(true);

        // Detectamos si el usuario escribió más de un color
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

  return (
    <View style={styles.card}>
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

        {/* Disclaimer */}
        {/* <Text style={styles.disclaimer}>
          Ejemplo: "Degradado azul y rojo" o "Rosa pastel"
        </Text> */}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe tu idea..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <MaterialIcons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.9,
    alignSelf: "center",
    marginVertical: 20,
    justifyContent: "flex-start",
  },
  innerContainer: {
    backgroundColor: "#fff",
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
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    shadowColor: '#000',
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default CardWithVerticalContainers;
