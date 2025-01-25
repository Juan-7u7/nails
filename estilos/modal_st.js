import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente oscuro
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff', // Fondo blanco para el modal
    borderRadius: 10, // Bordes redondeados
    padding: 20,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Gris oscuro
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd', // Gris claro para los bordes
    backgroundColor: '#f9f9f9', // Fondo gris claro para los inputs
    fontSize: 16,
    color: '#333', // Gris oscuro para el texto
  },
  button: {
    width: '100%',
    backgroundColor: '#000', // Negro para el botón
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonClose: {
    width: '100%',
    backgroundColor: '#000', // Gris para el botón de cerrar
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Texto blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
