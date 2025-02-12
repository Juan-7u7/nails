import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Audio } from 'expo-av';
import { styles } from '../estilos/citas_st';

export default function AppointmentScheduler() {
  const { width } = useWindowDimensions();
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(date.toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isHomeAppointment, setIsHomeAppointment] = useState(false); // Nuevo estado para checkbox
  const [address, setAddress] = useState(''); // Nuevo estado para dirección

  const generateTimeSlots = () => {
    const slots = [];
    let hour = 8;
    let minute = 0;

    while (hour < 20) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
      minute += 30;
      hour += 1;

      if (minute >= 60) {
        minute -= 60;
        hour += 1;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleConfirmAppointment = async () => {
    const message = `Nombre: ${name}\nTeléfono: ${phone}\nFecha: ${selectedDate}\nHora: ${selectedTime}${
      isHomeAppointment ? `\nDirección: ${address}` : ''
    }`;
    setAlertMessage(message);
    setShowAlert(true);

    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../sonidos/exito.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error al reproducir el audio:', error);
    }
  };

  const isFormValid = name && phone && selectedTime && (!isHomeAppointment || address.trim() !== '');

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.wrapper, { maxWidth: width > 600 ? 500 : '100%' }]}>
        <Text style={styles.title}>Agendar cita</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.input, Platform.OS === 'web' && styles.inputWeb]}
            placeholder="Nombre completo"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, Platform.OS === 'web' && styles.inputWeb]}
            placeholder="Número de teléfono"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            autoCapitalize="none"
          />
        </View>

        {/* Checkbox para cita a domicilio */}
        <View style={styles.inputGroup}>
          <Pressable
            onPress={() => setIsHomeAppointment(!isHomeAppointment)}
            style={styles.checkboxContainer}
          >
            <View style={[styles.checkbox, isHomeAppointment && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>¿Es una cita a domicilio?</Text>
          </Pressable>
        </View>

        {/* Input de dirección si es a domicilio */}
        {isHomeAppointment && (
          <TextInput
            style={[styles.input, Platform.OS === 'web' && styles.inputWeb]}
            placeholder="Ingrese su dirección"
            placeholderTextColor="#666"
            value={address}
            onChangeText={setAddress}
          />
        )}

        <Text style={styles.sectionTitle}>Elige tu fecha</Text>
        <View style={styles.calendarWrapper}>
          <Calendar
            current={selectedDate}
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#000' },
            }}
            theme={{
              todayTextColor: '#000',
              arrowColor: '#000',
              textDayFontSize: 14,
              textMonthFontSize: 14,
              textDayHeaderFontSize: 14,
              selectedDayBackgroundColor: '#000',
              selectedDayTextColor: '#fff',
              calendarBackground: '#fff',
            }}
          />
        </View>

        <Text style={styles.sectionTitle}>Elige tu hora</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.timeScrollView}
          contentContainerStyle={styles.timeScrollContent}
        >
          {timeSlots.map((time) => (
            <Pressable
              key={time}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.timeSlotSelected,
                Platform.OS === 'web' && styles.timeSlotWeb,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.timeTextSelected,
                ]}
              >
                {time}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleConfirmAppointment}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Confirmar Cita</Text>
        </Pressable>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Cita Confirmada"
          message={alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#000"
          onConfirmPressed={() => setShowAlert(false)}
        />
      </View>
    </ScrollView>
  );
}
