import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './screen/Login';

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
        <Stack.Screen name="HomeLogin" component={HomeLogin} 
        options={{
          headerShown: false
        }}/>
      </Stack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();
  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Hans Motors"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
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
          name="AgrergarMantencion" 
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
      <MyTabs />
    </NavigationContainer>
  )
}