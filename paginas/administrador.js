import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importar la pantalla de perfil
import PerfilScreen from './administrador/perfil';

const Tab = createBottomTabNavigator();

// Pantalla genérica para tabs vacías
const PlaceholderScreen = ({ route }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Estás en {route.name}</Text>
  </View>
);

export default function Administrador() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: 'white' },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Agenda') iconName = 'event';
            else if (route.name === 'Servicios') iconName = 'list';
            else if (route.name === 'Perfil') iconName = 'person';
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Agenda" component={PlaceholderScreen} />
        <Tab.Screen name="Servicios" component={PlaceholderScreen} />
        <Tab.Screen name="Perfil" component={PerfilScreen} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
