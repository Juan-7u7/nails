import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Asegúrate de tener la librería instalada

const CardWithVerticalContainers = () => {
  const [buttons, setButtons] = useState([]); // Estado para los botones adicionales
  const [lastPress, setLastPress] = useState(0); // Para detectar doble clic
  const [inputText, setInputText] = useState(''); // Estado para el texto del input

  // Función para agregar un nuevo botón al estado
  const addButton = () => {
    setButtons([...buttons, { id: Date.now() }]); // Agrega un nuevo botón vacío al estado con un ID único
  };

  // Función para eliminar un botón del estado
  const deleteButton = (id) => {
    setButtons(buttons.filter(button => button.id !== id)); // Filtra el botón que debe eliminarse
  };

  // Función para manejar el doble clic
  const handlePress = (id) => {
    const currentTime = Date.now();
    if (currentTime - lastPress < 300) { // Detecta doble clic si es menor a 300ms
      deleteButton(id);
    }
    setLastPress(currentTime);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      console.log('Texto enviado:', inputText);
      setInputText(''); // Limpiar el input después de enviarlo
    }
  };

  return (
    <View style={styles.card}>
      <View style={[styles.innerContainer, { flex: 0.10 }]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.circleButton}>
            <MaterialIcons name="category" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <MaterialIcons name="pin" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <MaterialIcons name="wallpaper" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <MaterialIcons name="undo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.innerContainer, { flex: 0.55 }]}>
        <Text style={styles.text}>Contenedor 2</Text>
      </View>
      {/* Contenedor 3 dividido en 2 mitades con diferentes anchos */}
      <View style={[styles.innerContainer, { flex: 0.35, flexDirection: 'row' }]}>
        {/* Mitad 1 con 50% de ancho */}
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
          style={styles.scrollView}
        >
          {/* El contenido dentro de esta mitad será desplazable */}
          {/* Botón principal de "+" */}
          <TouchableOpacity style={styles.button} onPress={addButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          {/* Aquí renderizamos los botones adicionales */}
          {buttons.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={styles.button}
              onPress={() => handlePress(button.id)} // Detecta el doble clic o clic prolongado
              onLongPress={() => deleteButton(button.id)} // Detecta clic prolongado
            >
              {/* Aquí puedes reemplazar el texto por un icono de MaterialIcons */}
              {/* <MaterialIcons name="favorite" size={24} color="black" /> */}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Mitad 2 con 75% de ancho */}
        <View style={[styles.halfContainer, { width: '75%', backgroundColor: '#e0e0e0', height: '100%',borderRadius: 10 }]}>
          <Text style={styles.text}>Chat</Text>
          {/* Input y botón */}
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
    width: Dimensions.get("window").width * 0.9, // Ocupa el 90% del ancho de la pantalla
    height: Dimensions.get("window").height * 0.9, // Ocupa el 80% de la altura de la pantalla
    alignSelf: "center", // Centra el card horizontalmente
    marginVertical: 20,
    justifyContent: "flex-start", // Los contenedores se alinean de arriba a abajo
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginVertical: 10, // Espacio entre los contenedores
    alignItems: "center", // Centra el contenido dentro del contenedor
    borderWidth: 2,  // Añadir borde
    borderColor: "#fff",  // Color del borde
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", // Centra los botones horizontalmente
    width: "100%",
    alignItems: "center", // Centra los botones verticalmente
    backgroundColor: "#fff",
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // Esto hace que el botón sea circular
    backgroundColor: "#fff", // Color blanco
    marginHorizontal: 5, // Añade un pequeño margen horizontal para separar los botones
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,  // Elimina el borde
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  halfContainer: {
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
    height: '100%', // Asegura que ocupe toda la altura del contenedor
  },
  inputContainer: {
    flexDirection: 'row', // Alinea el input y el botón en una fila
    width: '100%', // Ancho del contenedor del input
    alignItems: 'center', // Centra los elementos verticalmente
    marginTop: 130, // Un poco de espacio arriba
  },
  input: {
    flex: 1, // El input toma el espacio restante
    height: 40, // Alto del input
    borderColor: '#ccc',
    backgroundColor : '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    shadowColor: '#000',
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // Hacemos que el botón sea circular
    backgroundColor: '#000', // Color del botón
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
  },
  button: {
    width: 60, // tamaño del botón cuadrado
    height: 60, // tamaño del botón cuadrado
    borderRadius: 15, // bordes redondeados
    backgroundColor: '#fff', // color de fondo del botón
    borderWidth: 2, // ancho del borde
    borderColor: '#000', // color del borde negro
    alignItems: 'center', // alinea el contenido (el símbolo '+')
    justifyContent: 'center', // centra el texto
    margin: 10, // margen alrededor del botón
  },
  buttonText: {
    fontSize: 30, // tamaño del texto
    color: '#000', // color del texto
    fontWeight: 'bold', // texto en negrita
  },
  scrollView: {
    width: '100%', // Esto asegura que ocupe el 100% del ancho disponible
    height: Dimensions.get('window').height * 0.22, // Establece la altura del ScrollView
    overflow: 'scroll', // Habilita el desplazamiento si el contenido excede la altura
  },
});

export default CardWithVerticalContainers;
