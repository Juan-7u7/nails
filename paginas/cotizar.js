import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";

const options = [
  { id: 1, question: "¿Se necesita retiro de algún servicio anterior?", choices: ["Si", "No"] },
  {
    id: 2,
    question: "¿Qué servicio desea realizarse?",
    choices: ["Gelish en manos", "Gelish en pies", "Acrilico", "Retoque de acrilico", "Baño de acrilico"],
  },
  {
    id: 3,
    question: "¿Qué largo de uña desea? (Si el servicio no será acrílico, omita esta parte)",
    choices: ["No1", "No2", "No3", "No4", "No5"],
  },
  {
    id: 4,
    question: "¿Tiene algún diseño, efecto o decoración extra?",
    choices: ["Frances", "Encapsulado", "Ojo de gato", "Stickers", "Diseño a mano alzada", "Piedras", "Marmoleado"],
  },
];

const prices = {
  Si: 70,
  No: 0,
  "Gelish en manos": 100,
  "Gelish en pies": 100,
  Acrilico: 200,
  "Retoque de acrilico": 170,
  "Baño de acrilico": 160,
  No1: 0,
  No2: 20,
  No3: 40,
  No4: 60,
  No5: 80,
  Frances: 20,
  Encapsulado: 60,
  "Ojo de gato": 30,
  Stickers: 20,
  "Diseño a mano alzada": 50,
  Piedras: 10,
  Marmoleado: 40,
};

export default function CotizarScreen() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigation = useNavigation();

  const isMultipleChoice = (id) => id === 4;

  const toggleOption = useCallback((questionId, choice) => {
    setSelectedOptions((prev) => {
      if (isMultipleChoice(questionId)) {
        const current = prev[questionId] || [];
        const updated = current.includes(choice)
          ? current.filter((c) => c !== choice)
          : [...current, choice];
        return { ...prev, [questionId]: updated };
      } else {
        return { ...prev, [questionId]: choice };
      }
    });
  }, []);

  const calculateTotal = useMemo(() => {
    let total = 0;

    for (const [id, value] of Object.entries(selectedOptions)) {
      const numId = parseInt(id);

      // Si no se seleccionó un servicio acrílico, ignoramos la pregunta del largo
      if (
        numId === 3 &&
        !["Acrilico", "Retoque de acrilico", "Baño de acrilico"].some((s) =>
          Array.isArray(selectedOptions[2])
            ? selectedOptions[2].includes(s)
            : selectedOptions[2] === s
        )
      ) {
        continue;
      }

      if (Array.isArray(value)) {
        total += value.reduce((sum, v) => sum + (prices[v] || 0), 0);
      } else {
        total += prices[value] || 0;
      }
    }

    return total;
  }, [selectedOptions]);

  const handleSubmit = () => {
    setAlertMessage(`El precio total es $${calculateTotal} MXN`);
    setShowAlert(true);
  };

  const handleAgendar = () => {
    setShowAlert(false);
    navigation.navigate("AgendarCitas");
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
                value={
                  isMultipleChoice(id)
                    ? selectedOptions[id]?.includes(choice) || false
                    : selectedOptions[id] === choice
                }
                onValueChange={() => toggleOption(id, choice)}
                color={
                  isMultipleChoice(id)
                    ? selectedOptions[id]?.includes(choice)
                      ? "#000"
                      : "#aaa"
                    : selectedOptions[id] === choice
                    ? "#000"
                    : "#aaa"
                }
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
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
//        showCancelButton
        showConfirmButton
        // cancelText="Agendar cita"
        confirmText="Aceptar"
        confirmButtonColor="#000"
        cancelButtonColor="#555"
        onConfirmPressed={() => setShowAlert(false)}
//        onCancelPressed={handleAgendar}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f3ff",
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
    backgroundColor: "#F9F9F9",
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
