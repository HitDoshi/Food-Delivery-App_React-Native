import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Navigation from './src/navigation/navigation';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  const schema = useColorScheme();
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer
          theme={schema === 'dark' ? DarkTheme : DefaultTheme}>
          <Navigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
