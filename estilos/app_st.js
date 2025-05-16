import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontStyle: 'italic', // Aplica cursiva al texto
    fontWeight: 'bold',  // Puedes agregar negrita también si lo deseas
  },
  container: {
    flex: 1,
    backgroundColor: '#efe7ff',
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0.15, // Añade padding en la parte inferior
  },
  header: {
    width: screenWidth, // Usa el ancho de la pantalla
    paddingVertical: Platform.OS === 'ios' ? 50 : 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  footer: {
    height: 60,
    width: '120%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0, // Asegura que esté en el borde superior
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 10,
    marginRight: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
    paddingBottom: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#FBFBFB',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  transparentContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  transparentText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  servicesContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center', // Centra el texto
  },
  serviceButton: {
    flexDirection: 'row', // Asegura que el icono y el texto estén alineados en fila
  alignItems: 'center', // Centra verticalmente el icono y el texto
  justifyContent: 'center', // Centra horizontalmente el contenido
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#000',
  width: '100%', // Asegura un ancho consistente
  },
  serviceText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  loginContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonBack: {
    width: '100%',
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  registerLinkContainer: {
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
  },
  registerLinkText: {
    color: '#000',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default styles;