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

export function HighScore({ 
  navigation,
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

  const gotoHome = () => {
    console.log('Goto home')
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text>Highscore</Text>

            <Button title="Home" onPress={() => gotoHome()} />
          </View>
        </ScrollView>
      </SafeAreaView>
  )
}