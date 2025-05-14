import React from 'react';
import { View } from 'react-native';

export const Card = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};
