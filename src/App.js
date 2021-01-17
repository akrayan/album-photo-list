import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

import Navigation from "./navigation";
import store from "./store"

function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
    </Provider>
  );
}

registerRootComponent(App)