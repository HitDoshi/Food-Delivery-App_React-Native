/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './src/screen/SplashScreen';

let persistor = persistStore(store);

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
