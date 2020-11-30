import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/Routes/routes';

export default function App() {
  return (
  <>
    <StatusBar barStyle= 'light-content' backgroundColor='fc6963'/>
    <Routes/>
  </>
  );
}
