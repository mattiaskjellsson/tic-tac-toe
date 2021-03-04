import React, { useState } from 'react';
import { View } from 'react-native';
import { Square } from './square'

export function Board({squares, squareClicked}) {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={squareClicked(i)}
      />
    );
  }

  return (
    <View>
      <View className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
    </View>
  );
}