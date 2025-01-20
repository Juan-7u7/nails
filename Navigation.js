import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import App from './App'; // Importa App.js
import AgendarCitasScreen from './paginas/citas';
import CotizarScreen from './paginas/cotizar';
import DisenosScreen from './paginas/diseños';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App} options={{ title: 'Inicio' }} />
        <Stack.Screen name="AgendarCitas" component={AgendarCitasScreen} options={{ title: 'Agendar Citas' }} />
        <Stack.Screen name="Cotizar" component={CotizarScreen} options={{ title: 'Cotizar' }} />
        <Stack.Screen name="Disenos" component={DisenosScreen} options={{ title: 'Diseños' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
