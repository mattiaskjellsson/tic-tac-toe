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
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameContainer} />
        <Stack.Screen name="Highscore" component={HighScore} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
