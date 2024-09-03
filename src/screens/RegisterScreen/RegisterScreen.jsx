import {Button, TextInput} from 'react-native-paper';
import {
  COLOR_BACKGROUND,
  COLOR_CHARCOAL,
  COLOR_PRIMARY,
  COLOR_PRIMARY_VARIANT,
  COLOR_WHITE,
} from '../../constants/colors';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  SPACE_16,
  SPACE_24,
  SPACE_32,
  SPACE_64,
  SPACE_8,
} from '../../constants/sizes';
import {screenNames, strings} from '../../constants/strings';

import {SCREEN_WIDTH} from '../../helpers/normalizer';
import {firebaseCreateUserWithEmailAndPassword} from '../../services/firebaseClient';
import {useTheme} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
  input: {
    width: SCREEN_WIDTH - SPACE_24,
    marginBottom: SPACE_8,
  },
  appNameText: {
    fontSize: SPACE_24,
    marginBottom: SPACE_32,
    fontWeight: '500',
  },
  appImage: {width: SPACE_64 * 2, height: SPACE_64 * 2},
  loginLink: {
    fontSize: SPACE_16,
    textDecorationLine: 'underline',
    color: COLOR_PRIMARY_VARIANT,
  },
  bottomLine: {fontSize: SPACE_16, marginTop: SPACE_24, color: COLOR_CHARCOAL},
});

function RegisterScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const refInput2 = useRef();

  const handleEmailRegister = async () => {
    Keyboard.dismiss();
    try {
      const loginStatus = await firebaseCreateUserWithEmailAndPassword({
        username,
        password,
      });
      ToastAndroid.showWithGravity(
        loginStatus,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } catch (_) {}
  };

  const handleLoginRedirection = () => {
    navigation.navigate(screenNames.Login);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://download.logo.wine/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.png',
        }}
        style={styles.appImage}
      />
      <Text style={[styles.appNameText]}>{strings.APP_NAME}</Text>
      <TextInput
        theme={{colors: {primary: COLOR_PRIMARY, background: COLOR_BACKGROUND}}}
        contentStyle={{color: COLOR_WHITE}}
        style={styles.input}
        keyboardType="email-address"
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={updatedText => setUsername(updatedText)}
        autoFocus
        returnKeyType="next"
        onSubmitEditing={() => refInput2.current.focus()}
      />
      <TextInput
        autoCorrect={false}
        selectionColor="transparent"
        curs
        secureTextEntry={showPassword}
        theme={{colors: {primary: COLOR_PRIMARY, background: COLOR_BACKGROUND}}}
        contentStyle={{color: COLOR_WHITE}}
        style={styles.input}
        ref={refInput2}
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={updatedText => setPassword(updatedText)}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye' : 'eye-off'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        theme={{colors: {primary: COLOR_PRIMARY}}}
        onPress={handleEmailRegister}
        mode="contained">
        <Text>Register</Text>
      </Button>
      <Text style={[styles.bottomLine]}>
        {'Already have an account? '}
        <Text
          onPress={handleLoginRedirection}
          style={[styles.loginLink, {color: COLOR_PRIMARY_VARIANT}]}>
          {'Login here'}
        </Text>
      </Text>
    </View>
  );
}

export default RegisterScreen;
