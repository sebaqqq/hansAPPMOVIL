import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './screen/Login';
import AgregarAutomovil from './screen/AgregarAutomovil';

//la navegacion de la app
import EscanerPatente from './screen/ScanerPatente';
import AgrergarMantencion from './screen/AgregarMantencion';
import Cuenta from './screen/Cuenta';

import { AntDesign } from '@expo/vector-icons';

export default function Navigation () {
  const Stack = createNativeStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
        options={{
          headerShown: false
        }}/>
        <Stack.Screen name="Election" component={MyTabs}
        options={{
          headerShown: false
        }}/>
        <Stack.Screen name="Agregar Automovil" component={AgregarAutomovil}/>
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
        }}
      >
        <Tab.Screen 
          name="EscanerPatente" 
          component={EscanerPatente} 
          options={{
            tabBarLabel: 'Escaner',
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