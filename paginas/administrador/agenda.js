import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { supabase } from '../../supabaseclient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Platform, Linking } from 'react-native';


const CitasScreen = () => {
  const [citas, setCitas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    const { data, error } = await supabase.from('citas').select('*');
    if (error) {
      Alert.alert('Error al cargar citas', error.message);
    } else {
      setCitas(data);
    }
  };

  const generarPDF = () => {
    const htmlContent = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          padding: 20px;
          background: #f8f8f8;
          color: #333;
        }
        h2 {
          text-align: center;
          margin-bottom: 24px;
          color: #222;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        th, td {
          padding: 12px 8px;
          text-align: left;
        }
        th {
          background-color: #000;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }
        tr:nth-child(even) {
          background-color: #f4f4f4;
        }
        tr:hover {
          background-color: #eaeaea;
        }
        td {
          font-size: 13px;
        }
      </style>
    </head>
    <body>
      <h2>Citas Agendadas</h2>
      <table>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Dirección</th>
          <th>Celular</th>
        </tr>
        ${citas
          .map(
            (cita) => `
            <tr>
              <td>${cita.nombre}</td>
              <td>${cita.correo}</td>
              <td>${cita.fecha}</td>
              <td>${cita.hora}</td>
              <td>${cita.direccion}</td>
              <td>${cita.numero_celular}</td>
            </tr>`
          )
          .join('')}
      </table>
    </body>
  </html>
`;


if (Platform.OS === 'web') {
  // en la web, abrimos una nueva pestaña con el contenido HTML en base64
  const htmlEncoded = encodeURIComponent(htmlContent);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
} else {
  // en móvil, usamos la WebView normal
  navigation.navigate('VistaPreviaCitas', { htmlContent });
}

  };

  const renderHeader = () => (
    <View style={[styles.row, styles.headerRow]}>
      <Text style={styles.headerCell}>Nombre</Text>
      <Text style={styles.headerCell}>Correo</Text>
      <Text style={styles.headerCell}>Fecha</Text>
      <Text style={styles.headerCell}>Hora</Text>
      <Text style={styles.headerCell}>Dirección</Text>
      <Text style={styles.headerCell}>Celular</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AGENDA DE CITAS</Text>

      <ScrollView>
  <View style={styles.table}>
    <View style={[styles.row, styles.headerRow]}>
      <Text style={styles.headerCell}>Nombre</Text>
      <Text style={styles.headerCell}>Correo</Text>
      <Text style={styles.headerCell}>Fecha</Text>
      <Text style={styles.headerCell}>Hora</Text>
      <Text style={styles.headerCell}>Dirección</Text>
      <Text style={styles.headerCell}>Celular</Text>
    </View>

    {citas.map((item, index) => (
      <View
        key={index}
        style={[
          styles.row,
          index % 2 === 0 ? styles.rowEven : styles.rowOdd,
        ]}
      >
        <Text style={styles.cell}>{item.nombre}</Text>
        <Text style={styles.cell}>{item.correo}</Text>
        <Text style={styles.cell}>{item.fecha}</Text>
        <Text style={styles.cell}>{item.hora}</Text>
        <Text style={styles.cell}>{item.direccion}</Text>
        <Text style={styles.cell}>{item.numero_celular}</Text>
      </View>
    ))}
  </View>
</ScrollView>


      <TouchableOpacity style={styles.pdfButton} onPress={generarPDF}>
        <Icon name="picture-as-pdf" size={20} color="white" />
        <Text style={styles.pdfButtonText}>Vista previa PDF</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#E8F9FF',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center',
      color: '#222',
    },
    table: {
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3,
    },
    row: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 6,
      alignItems: 'center',
    },
    headerRow: {
      backgroundColor: '#000',
    },
    headerCell: {
      flex: 1,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 13,
    },
    cell: {
      flex: 1,
      fontSize: 12,
      color: '#333',
    },
    rowEven: {
      backgroundColor: '#f4f4f4',
    },
    rowOdd: {
      backgroundColor: '#fff',
    },
    pdfButton: {
      marginTop: 16,
      backgroundColor: 'black',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
    },
    pdfButtonText: {
      color: 'white',
      marginLeft: 8,
      fontWeight: 'bold',
    },
  });
  

export default CitasScreen;
