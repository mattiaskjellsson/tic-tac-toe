import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './components/homeScreen';
import { GameContainer } from './components/gameContainer';
import { HighScore } from './components/hishScore';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        headerMode="none"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTransparent: true,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Game"
          component={GameContainer}
          options={{
            headerTransparent: true,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Highscore"
          component={HighScore}
          options={{
            headerTransparent: true,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
