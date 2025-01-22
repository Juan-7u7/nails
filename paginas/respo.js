import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

// Componente personalizado para Alert multiplataforma
const showAlert = ({ title, message, onPress }) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n\n${message}`);
    onPress?.();
  } else {
    Alert.alert(title, message, [{ text: 'Aceptar', onPress }]);
  }
};

export default function AppointmentScheduler() {
  const { width } = useWindowDimensions(); // Obtener el ancho de la ventana
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(date.toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const generateTimeSlots = () => {
    const slots = [];
    let hour = 8;
    let minute = 0;

    while (hour < 20 || (hour === 20 && minute === 0)) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour += 1;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleConfirmAppointment = () => {
    showAlert({
      title: 'Cita Confirmada',
      message: `Tu cita ha sido agendada exitosamente:\n\nNombre: ${name}\nTeléfono: ${phone}\nFecha: ${selectedDate}\nHora: ${selectedTime}`,
      onPress: () => console.log('Cita confirmada'),
    });
  };

  const isFormValid = name && phone && selectedTime;

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
          style={[
            styles.button,
            !isFormValid && styles.buttonDisabled,
            Platform.OS === 'web' && styles.buttonWeb,
          ]}
          onPress={handleConfirmAppointment}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Confirmar cita</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  inputWeb: {
    outlineStyle: 'none',
    cursor: 'text',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  calendarWrapper: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  timeScrollView: {
    marginBottom: 20,
  },
  timeScrollContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeSlot: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  timeSlotSelected: {
    backgroundColor: '#000',
  },
  timeText: {
    color: '#000',
  },
  timeTextSelected: {
    color: '#fff',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
