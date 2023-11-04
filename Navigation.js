import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screen/Login';
import HomeLogin from './screen/HomeLogin';

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
  return(
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}