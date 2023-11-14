import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './screen/Login';
import AgregarAutomovil from './screen/AgregarAutomovil';
import AgrergarMantencion from './screen/AgregarMantencion';
import Cuenta from './screen/Cuenta';
import Patente from './screen/Patente';
import Inventario from './screen/Inventario';

import Scanner from './screen/TextScanner';
import DatosEscaneados from './screen/DatosEscaneados';

import EditarUser from './screen/EditarUser';
import Loading from './Loading';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function Navigation () {

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const Stack = createNativeStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator 
        systemUiVisibility={false}
      >
        <Stack.Screen name="Login" component={Login} 
        options={{
          headerShown: false
        }}/>
        <Stack.Screen name="Election" component={MyTabs}
        options={{
          headerShown: false
        }}/>
        <Stack.Screen name="Agregar Automovil" component={AgregarAutomovil}/>
        <Stack.Screen name="Editar Usuario" component={EditarUser}/>
        <Stack.Screen name="Datos Escaneados" component={DatosEscaneados}/>
      </Stack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();
  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Hans Motors"
        screenOptions={{
          tabBarActiveTintColor: '#0077B6',
          tabBarInactiveTintColor: '#000000',
          tabBarActiveBackgroundColor: '#FFFFFF',
          tabBarInactiveBackgroundColor: '#FFFFFF',
        }}
      >
        <Tab.Screen 
          name="Inventario" 
          component={Inventario} 
          options={{
            tabBarLabel: 'Inventario',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="list-ul" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Patente" 
          component={Patente}
          options={{
            tabBarLabel: 'Patente',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="car-side" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Scanner" 
          component={Scanner} 
          options={{
            tabBarLabel: 'Scanner',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="scan1" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Agregar Mantencion" 
          component={AgrergarMantencion} 
          options={{
            tabBarLabel: 'Mantencion',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="pluscircleo" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cuenta"
          component={Cuenta}
          options={{
            headerShown: false,
            tabBarLabel: 'Cuenta',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return(
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}