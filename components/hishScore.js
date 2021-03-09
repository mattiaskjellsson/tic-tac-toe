import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Modal, 
  TextInput,
} from 'react-native';

const uuid = require('react-native-uuid');

import { Colors } from 'react-native/Libraries/NewAppScreen';
export function HighScore({ 
  navigation,
  route,
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
    textInput: {
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 10,
      lineHeight: 16,
      fontSize: 14
    },
  });

  const [isLoading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [highscores, setHighscores] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerEditing, setPlayerEditing] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      getHighScores()
      .then(res => {
        const c = res.sort((a, b) => a.wins > b.wins ? -1 : 1)
        setHighscores(c)
        if (route?.params?.winner) {
          const winner = route.params.winner
          const lowestCurrentWins = c[c.length-1].wins
          const nrHighscores = c.length

          if (winner.x > winner.o)
            if (winner.x > lowestCurrentWins || nrHighscores < 10) {
              setPlayerEditing('x')
              setModalVisible(true)
            }
          else
            if (winner.o > lowestCurrentWins || nrHighscores < 10) {
              setPlayerEditing('o')
              setModalVisible(true)
            }
        }

        setLoadError(false)
      })
      .catch((e) => {
        setLoadError(true)
        console.error(e)
        console.log('set loading error true')
      })
      .finally(() => {
        setLoading(false)
        console.log(`LoadError: ${loadError}`)
      })

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const gotoHome = () => {
    navigation.navigate('Home')
  }

  const saveHighscore = () => {
    const body = {
      name: playerName, 
      wins: playerEditing === 'x' ? route.params.winner.x : route.params.winner.o
    }

    sendNewHighscore(body)

    setModalVisible(false)
    setPlayerEditing('')
    setPlayerName('')
  }

  const sendNewHighscore = async (body) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    fetch('http://localhost:3000/highscore/', requestOptions)
    .then(response => response.json())
    .then(data => {
      highscores
      .concat({ name: data.name, wins: data.wins})
      .sort((a, b) => a.wins > b.wins ? -1 : 1)
    })
    .catch(e => console.error(e))
  }
  
  const getHighScores = async () => {
    if (highscores.length > 0) return highscores

    try {
      const hi = await fetch('http://localhost:3000/highscore')
      return hi.json()
    } catch (e) {
      throw e
    }
  }

  return (
    isLoading 
        ? <ActivityIndicator /> 
        : loadError 
          ? <Text>Error loading stuff from the server, please try again</Text>
          : <SafeAreaView>
            <View style={styles.body}>
              <Text>Highscore</Text>
              <FlatList
                data={highscores}
                keyExtractor={({ id }, index) => uuid.v4()}
                renderItem={({ item }) => (
                  <Text>{item.name}, {item.wins}</Text>
                )}
              />
              <Button title="Home" onPress={() => gotoHome()} />
            </View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              style={styles.body}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={{ flex: 1, marginTop: 50}}>
                <Text>Hello! Enter Player {playerEditing}'s name to save it to the highscore</Text>
                <TextInput
                  onChangeText={text => setPlayerName(text)}
                  style={styles.textInput}
                  value={playerName}
                  placeholder='Player name'
                />
                <Button title='Save' onPress={() => saveHighscore()} />
              </View>
            </Modal>
            </SafeAreaView>
  )
}
