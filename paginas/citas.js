import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, DatePickerIOS, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AgendarCitas() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('09:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleConfirmAppointment = () => {
    console.log('Cita Agendada');
    console.log('Nombre:', name);
    console.log('Correo:', email);
    console.log('Fecha:', date.toLocaleDateString());
    console.log('Hora:', time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Agendar Cita</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TextInput
            style={styles.input}
            placeholder="Nombre Completo"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Selecciona la Fecha:</Text>
          {Platform.OS === 'ios' ? (
            <DatePickerIOS
              date={date}
              onDateChange={setDate}
              mode="date"
            />
          ) : (
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          )}

          <Text style={styles.label}>Selecciona la Hora:</Text>
          <TextInput
            style={styles.input}
            placeholder="Hora (Ej. 09:00 AM)"
            placeholderTextColor="#aaa"
            value={time}
            onChangeText={setTime}
          />

          <TouchableOpacity style={styles.button} onPress={handleConfirmAppointment}>
            <Icon name="event" size={24} color="#fff" />
            <Text style={styles.buttonText}>Confirmar Cita</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ocupa todo el espacio disponible
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    paddingBottom: 30,
    width: '100%',  // Asegura que los elementos ocupen todo el ancho disponible
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
    width: '100%',  // Asegura que el campo de texto ocupe todo el ancho
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',  // Asegura que el botón ocupe todo el ancho
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
});
