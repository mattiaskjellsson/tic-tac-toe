import React from 'react';
import { Button } from 'react-native'

export function Square({value, onClick}) {
  return (
    <Button 
      // className="square" 
      onPress={onClick}
      title=""
    >
    </Button>
  );
}