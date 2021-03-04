import React from 'react';
import { Button } from 'react-native'
import { styles } from './styles'

export function Square({number, value, onClick}) {
  console.log(number, value)
  return (
    <Button 
      style={styles.squareButton}
      onPress={() => onClick(number)}
      title={value}
    >
    </Button>
  );
}