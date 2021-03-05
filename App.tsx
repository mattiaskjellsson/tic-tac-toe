import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Game } from './components/game'

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

const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Game />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
