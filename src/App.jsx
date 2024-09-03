import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {COLOR_BACKGROUND} from './constants/colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Navigator from './navigation/Navigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user,
      // default is email and profile
      webClientId:
        '317220449573-rgqauu2kp1nqvq01gdquitab0u2d9j7r.apps.googleusercontent.com',
      // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true,
      // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={COLOR_BACKGROUND}
      />
      <Navigator />
    </SafeAreaView>
  );
}

export default App;
