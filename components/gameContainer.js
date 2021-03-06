import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { Game } from './game'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function GameContainer({ 
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

  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Game navigation={navigation}/>
          </View>
        </ScrollView>
      </SafeAreaView>
  )
}