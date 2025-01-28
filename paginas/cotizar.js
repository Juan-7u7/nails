import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import AwesomeAlert from "react-native-awesome-alerts";

const options = [
  { id: 1, question: "¿Qué forma de uñas prefieres?", choices: ["Cuadradas", "Ovaladas", "Almendra", "Stiletto"] },
  { id: 2, question: "¿Qué largo de uñas prefieres?", choices: ["Cortas", "Medianas", "Largas"] },
  { id: 3, question: "¿Quieres algún diseño especial?", choices: ["Francesa", "Decoración a mano", "Brillantes", "Sólido"] },
  { id: 4, question: "¿Quieres esmalte normal o permanente?", choices: ["Normal", "Permanente"] },
];

const prices = {
  Cuadradas: 300,
  Ovaladas: 320,
  Almendra: 350,
  Stiletto: 370,
  Cortas: 0,
  Medianas: 50,
  Largas: 100,
  Francesa: 100,
  "Decoración a mano": 200,
  Brillantes: 150,
  Sólido: 0,
  Normal: 0,
  Permanente: 150,
};

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const toggleOption = useCallback((questionId, choice) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: choice }));
  }, []);

  const calculateTotal = useMemo(() => {
    return Object.values(selectedOptions).reduce((total, choice) => total + (prices[choice] || 0), 0);
  }, [selectedOptions]);

  const handleSubmit = () => {
    setAlertMessage(`El precio total es $${calculateTotal} MXN`);
    setShowAlert(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cotización de Uñas</Text>
      {options.map(({ id, question, choices }) => (
        <View key={id} style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
          {choices.map((choice) => (
            <View key={choice} style={styles.choiceContainer}>
              <Checkbox
                value={selectedOptions[id] === choice}
                onValueChange={() => toggleOption(id, choice)}
                color={selectedOptions[id] === choice ? "#f54291" : "#aaa"}
              />
              <Text style={styles.choiceText}>{choice}</Text>
            </View>
          ))}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Calcular Cotización</Text>
      </TouchableOpacity>
      <AwesomeAlert
        show={showAlert}
        title="Total de la Cotización"
        message={alertMessage}
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showConfirmButton
        confirmText="Aceptar"
        confirmButtonColor="#000"
        onConfirmPressed={() => setShowAlert(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  choiceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  choiceText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
