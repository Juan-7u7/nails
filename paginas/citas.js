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
import { supabase } from '../supabaseclient';

// Componente reutilizable de input estilizado
const StyledInput = ({ ...props }) => (
  <TextInput
    style={[styles.input, Platform.OS === 'web' && styles.inputWeb]}
    placeholderTextColor="#666"
    autoCapitalize="none"
    {...props}
  />
);

// Generador optimizado de horarios
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 8 * 60; i < 20 * 60; i += 30) {
    const hour = Math.floor(i / 60);
    const minute = i % 60;
    slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
  }
  return slots;
};

export default function AppointmentScheduler() {
  const { width } = useWindowDimensions();

const isWeb = Platform.OS === 'web';
const isMobileWeb = isWeb && width <= 500;

  const [date] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(date.toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isHomeAppointment, setIsHomeAppointment] = useState(false);

  const timeSlots = generateTimeSlots();

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    const { name, phone, email, address } = formData;
    return name && phone && email && selectedTime && (!isHomeAppointment || address.trim() !== '');
  };

  const handleConfirmAppointment = async () => {
    const { name, phone, email, address } = formData;

    if (!selectedDate || !selectedTime) {
      console.error('❗ selectedDate o selectedTime no están definidos');
      return;
    }

    const fecha = selectedDate;
    const hora = `${selectedTime}:00`;

    const message = `Nombre: ${name}\nTeléfono: ${phone}\nCorreo: ${email}\nFecha: ${fecha}\nHora: ${selectedTime}${
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

    try {
      const { data, error } = await supabase.from('citas').insert([
        {
          nombre: name,
          correo: email,
          fecha,
          hora,
          direccion: isHomeAppointment ? address : 'En consultorio',
          numero_celular: phone,
        },
      ]);

      console.log('Resultado insert →', { data, error });

      if (error) {
        console.error('❌ Error al guardar la cita:', error.message);
      } else {
        console.log('✅ Cita registrada correctamente en Supabase.');
        setFormData({ name: '', phone: '', email: '', address: '' });
        setSelectedTime(null);
        setIsHomeAppointment(false);
      }
    } catch (err) {
      console.error('❗ Error inesperado:', err.message);
    }
  };

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={{
    flexGrow: 1,
    paddingBottom: 32,
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
  }}
>

<View
  style={[
    styles.wrapper,
    isMobileWeb && { width: '60%' },        // ✅ ancho amplio en web móvil
    isWeb && !isMobileWeb && { width: '60%' } // ✅ más angosto en escritorio web
  ]}
>

        <Text style={styles.title}>Agendar cita</Text>

        <View style={styles.inputGroup}>
          <StyledInput
            placeholder="Nombre completo"
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <StyledInput
            placeholder="Número de teléfono"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />
          <StyledInput
            placeholder="E-mail"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Pressable
            onPress={() => setIsHomeAppointment(!isHomeAppointment)}
            style={styles.checkboxContainer}
          >
            <View style={[styles.checkbox, isHomeAppointment && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>¿Es una cita a domicilio?</Text>
          </Pressable>
        </View>

        {isHomeAppointment && (
          <StyledInput
            placeholder="Ingrese su dirección"
            value={formData.address}
            onChangeText={(text) => handleChange('address', text)}
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
          style={[styles.button, !isFormValid() && styles.buttonDisabled]}
          onPress={handleConfirmAppointment}
          disabled={!isFormValid()}
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
