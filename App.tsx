import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import { styles } from './components/styles'
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Game } from './components/game'

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <Game />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
