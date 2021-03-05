import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export function Square({number, value, onClick}) {
  const styles = StyleSheet.create({
    appButtonContainer: {
      display: 'flex',
      flexGrow: 1,
      elevation: 8,
      backgroundColor: "#ccc",
      borderWidth: 1,
      borderColor: '#aaa',
      textTransform: "uppercase",
      justifyContent: 'center',
      width: 80,
      height: 90,
    },
    appButtonText: {
      fontSize: 36,
      color: "#000",
      fontWeight: "bold",
      alignSelf: "center",
     
    }
  });

  return (
    <TouchableOpacity onPress={() => onClick(number)} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{value}</Text>
    </TouchableOpacity>
  );
}