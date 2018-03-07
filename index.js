import React from 'react';
import { AppRegistry } from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  }
};

function Networker() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent('Networker', () => Networker);