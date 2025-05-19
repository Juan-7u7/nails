import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  useWindowDimensions,
  StyleSheet
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Audio } from 'expo-av';
import { styles } from '../estilos/citas_st';
import { supabase } from '../supabaseclient';
import { Alert } from 'react-native';
import GestionarCitaModal from '../paginas/rcitas';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
  for (let hour = 8; hour <= 20; hour += 2) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return slots;
};


export default function AppointmentScheduler() {
  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === 'web';
  const isMobileWeb = isWeb && width <= 500;
const [modalVisible, setModalVisible] = useState(false);

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
  const [takenTimes, setTakenTimes] = useState([]);


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
    Alert.alert('Error', 'Debes seleccionar una fecha y una hora.');
    return;
  }

  const fecha = selectedDate;
  const hora = `${selectedTime}:00`;

  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../sonidos/exito.mp3')
    );
    await sound.playAsync();
  } catch (error) {
    console.error('Error al reproducir el audio:', error);
  }

  try {
    const idParaReagendar = await AsyncStorage.getItem('cita_id_para_reagendar');

    if (idParaReagendar) {
      // 🟡 Reagendar (UPDATE)
      const { error } = await supabase
        .from('citas')
        .update({
          nombre: name,
          correo: email,
          fecha,
          hora,
          direccion: isHomeAppointment
            ? address
            : 'Bulevar José María Morelos y Pavón, Privada San Miguel #6',
          numero_celular: phone,
        })
        .eq('id', idParaReagendar);

      if (error) {
        Alert.alert('Error', 'No se pudo reagendar la cita.');
        return;
      }

      setAlertMessage(
        `✅ Tu cita ha sido modificada con éxito.\n\n` +
        `ID de cita: ${idParaReagendar}\n` +
        `Guarda este ID si necesitas hacer otro cambio.`
      );
      setShowAlert(true);

      await fetch('https://nails-backend-gric.onrender.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          date: selectedDate,
          time: selectedTime,
          address,
          isHomeAppointment,
          citaId: idParaReagendar,
          fueReagendada: true,
        }),
      });

      await fetch('https://nails-backend-gric.onrender.com/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          date: selectedDate,
          time: selectedTime,
          address,
          isHomeAppointment,
          citaId: idParaReagendar,
          fueReagendada: true,
        }),
      });

      await AsyncStorage.removeItem('cita_id_para_reagendar');

    } else {
      // 🔍 Verificar si ya existe una cita en esa fecha y hora
      const { data: existing } = await supabase
        .from('citas')
        .select('id')
        .eq('fecha', fecha)
        .eq('hora', hora);

      if (existing && existing.length > 0) {
        Alert.alert('Hora no disponible', 'Ya hay una cita agendada a esa hora.');
        return;
      }

      // ✅ Insertar nueva cita
      const { data, error } = await supabase
        .from('citas')
        .insert([{
          nombre: name,
          correo: email,
          fecha,
          hora,
          direccion: isHomeAppointment
            ? address
            : 'Bulevar José María Morelos y Pavón, Privada San Miguel #6',
          numero_celular: phone,
        }])
        .select();

      if (error) {
        Alert.alert('Error', 'No se pudo registrar la cita.');
        return;
      }

      const idCita = data?.[0]?.id;

      const message = `✅ Tu cita ha sido registrada con éxito.\n\n` +
        `Nombre: ${name}\n` +
        `Teléfono: ${phone}\n` +
        `Correo: ${email}\n` +
        `Fecha: ${fecha}\n` +
        `Hora: ${selectedTime}\n` +
        `${isHomeAppointment ? `Dirección: ${address}\n` : ''}` +
        `ID de cita: ${idCita}\n\n` +
        `👉 Guarda este ID para cancelar o reagendar tu cita.`;

      setAlertMessage(message);
      setShowAlert(true);

      await fetch('https://nails-backend-gric.onrender.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          date: selectedDate,
          time: selectedTime,
          address,
          isHomeAppointment,
          citaId: idCita,
        }),
      });

      await fetch('https://nails-backend-gric.onrender.com/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          date: selectedDate,
          time: selectedTime,
          address,
          isHomeAppointment,
          citaId: idCita,
        }),
      });
    }

    // 🔄 Reiniciar
    setFormData({ name: '', phone: '', email: '', address: '' });
    setSelectedTime(null);
    setIsHomeAppointment(false);

  } catch (err) {
    console.error('❗ Error inesperado al guardar cita:', err.message);
    Alert.alert('Error', 'Ocurrió un problema inesperado. Intenta nuevamente.');
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
              calendarBackground: '#F9F9F9',
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
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
  <Text style={styles.buttonText}>Cancelar o Reagendar Cita</Text>
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
          confirmButtonColor="#C490E4"
          onConfirmPressed={() => setShowAlert(false)}
        />
        <GestionarCitaModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
/>

      </View>
      
    </ScrollView>
  );
}
