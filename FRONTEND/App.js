import React from "react";
import {
  Center,
  NativeBaseProvider,
  StatusBar
} from "native-base";
import Vendors from "./src/screens/vendors";
import Login from "./src/screens/login";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from "./src/screens/register";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import Home from "./src/screens/home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NativeBaseProvider>
      <StatusBar/>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Vendors" component={Vendors} />
          </Stack.Navigator>
        </NavigationContainer>
    </NativeBaseProvider>
    </Provider>
  );
}


