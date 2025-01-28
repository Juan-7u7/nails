import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardWithHorizontalContainers  from '../componentes/canva';

const BlankPage = () => {
  return (
    <View style={styles.container}>
      <CardWithHorizontalContainers />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco
  },
});

export default BlankPage;