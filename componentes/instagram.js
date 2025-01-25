import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Usando FontAwesome para el ícono de Instagram

const InstagramLink = () => {
  const handlePress = () => {
    Linking.openURL('https://www.instagram.com/belengilcarrera/');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
        <Icon name="instagram" size={40} color="#000" />
      </TouchableOpacity>
      <Text style={styles.description}>
        Mira nuestros diseños en nuestra cuenta de Instagram, tambien puedes agendar citas por instagram.
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

export default InstagramLink;