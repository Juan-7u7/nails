import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Usando FontAwesome para el ícono de Facebook

const FacebookLink = () => {
  const handlePress = () => {
    Linking.openURL('https://www.facebook.com/belen.gilcarrera');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
        <Icon name="facebook" size={40} color="#000" />
      </TouchableOpacity>
      <Text style={styles.description}>
        Síguenos en nuestra cuenta de Facebook para ver más de nuestros diseños.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default FacebookLink;
