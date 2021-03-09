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
  Modal, TextInput,
} from 'react-native';

const uuid = require('react-native-uuid');

import { Colors } from 'react-native/Libraries/NewAppScreen';
export function HighScore({ 
  navigation,
  route
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

  // useEffect(() => {
  //   getHighScores()
  //   .then((res) => {
  //     setLoadError(false)
  //     const c = res.sort((a, b) => a.wins > b.wins ? -1 : 1)
  //     setHighscores(c)
  //   })
  //   .catch((e) => {
  //     console.error(e)
  //     console.log('set loading error true')
  //     setLoadError(true)
  //   })
  //   .finally(() => setLoading(false))
  // }, [])

  useFocusEffect(
    React.useCallback(() => {
      getHighScores()
      .then(res => {
        const c = res.sort((a, b) => a.wins > b.wins ? -1 : 1)
        setHighscores(c)
        
        if (route?.params?.winner) {
          if (route.params.winner.x > res[res.length -1].wins) {
            setPlayerEditing('x')
            setModalVisible(true)
            // setHighscores(
            //   res.concat({ 
            //     id: (res.length + 1).toString(),
            //     name: 'x', 
            //     wins: route.params.winner.x
            //   }).sort((a, b) => a.wins > b.wins ? -1 : 1)
            // )
          }
    
          if (route.params.winner.o > res[res.length -1].wins) {
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
    console.log(route.params.winner)
    console.log(playerName)

    const body = {
      name: playerName, 
      wins: playerEditing === 'x' ? route.params.winner.x : route.params.winner.o
    }

    setHighscores(highscores.concat(body).sort((a, b) => a.wins > b.wins ? -1 : 1))
    sendNewHighscore(body)

    setModalVisible(false)
    setPlayerEditing('')
    setPlayerName('')
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

const sendNewHighscore = async (body) => {
  try {
    const response = await fetch()
    fetch('http://localhost/highscore/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getHighScores = async () => {
  try {
    const highscores = await fetch('http://localhost:3000/highscore')
    return highscores.json()
  } catch (e) {
    throw e
  }
}