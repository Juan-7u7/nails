import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: Platform.OS === 'web' ? 'min(65%, 600px)' : '100%', // Máximo 90% en web, pero sin exceder 600px
    maxWidth: 600, // Para evitar que crezca demasiado en pantallas grandes
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
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  inputWeb: {
    outlineStyle: 'none',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarWrapper: {
    marginBottom: 20,
  },
  timeScrollView: {
    marginBottom: 20,
  },
  timeScrollContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  timeSlot: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  timeSlotSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  timeSlotWeb: {
    cursor: 'pointer',
  },
  timeText: {
    color: '#000',
  },
  timeTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonWeb: {
    cursor: 'pointer',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 10,
  },
  
  checkboxChecked: {
    backgroundColor: '#000',
  },
  
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
  },
  
});