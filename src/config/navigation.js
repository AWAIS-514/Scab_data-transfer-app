import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screen/home';
 import Sender from '../screen/sender';
 import Reciever from '../screen/reciever';

const Stack = createStackNavigator();

function AppNavigation() {
    return (
      <NavigationContainer>
 <Stack.Navigator
  screenOptions={{
    headerShown: false
  }}
>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sender" component={Sender} />
          <Stack.Screen name="Reciever" component={Reciever} />

   </Stack.Navigator>
        
      </NavigationContainer>
    );
  }
  





  export default AppNavigation;