import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function HomeScreen({
  navigation
}) {
  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    body: {
      fontSize: 14,
      fontFamily: 'Century Gothic, Futura, sans-serif',
      margin: 20,
    },
  });

  const gotoGame = () => {
    navigation.navigate('Game')
  }

  const gotoHighscore = () => {
    navigation.navigate('Highscore')
  }

  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text>TIC TAC TOE</Text>
            <Button title="Game" onPress={() => gotoGame()} />
            <Button title="Highscore" onPress={() => gotoHighscore()} />
          </View>
        </ScrollView>
      </SafeAreaView>
  )
}