import {Button, TextInput} from 'react-native-paper';
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

// import { LOGO } from '../../constants/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  bottomLine: {fontSize: SPACE_16, marginTop: SPACE_24},
});

function RegisterScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const refInput2 = useRef();

  const {colors} = useTheme();
  const {background: backgroundColor, primary, text} = colors;

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
      <Text style={[styles.appNameText, {color: text}]}>
        {strings.APP_NAME}
      </Text>
      <TextInput
        theme={{colors: {primary, background: backgroundColor}}}
        contentStyle={{color: text}}
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
        theme={{colors: {primary, background: backgroundColor}}}
        contentStyle={{color: text}}
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
        theme={{colors: {primary}}}
        onPress={handleEmailRegister}
        mode="contained">
        <Text>Register</Text>
      </Button>
      <Text style={[styles.bottomLine, {color: text}]}>
        {'Already have an account? '}
        <Text
          onPress={handleLoginRedirection}
          style={[styles.loginLink, {color: primary}]}>
          Login here
        </Text>
      </Text>
    </View>
  );
}

export default RegisterScreen;
