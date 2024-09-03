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
  SPACE_12,
  SPACE_16,
  SPACE_24,
  SPACE_32,
  SPACE_64,
  SPACE_8,
} from '../../constants/sizes';
import {URL, screenNames, strings} from '../../constants/strings';
import {
  firebaseSignInWithEmailAndPassword,
  handleGoogleSignin,
} from '../../services/firebaseClient';

import {SCREEN_WIDTH} from '../../helpers/normalizer';
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
  registerLink: {
    fontSize: SPACE_16,
    textDecorationLine: 'underline',
  },
  bottomLine: {fontSize: SPACE_16, marginTop: SPACE_24},
});

function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const refInput2 = useRef();

  const {colors} = useTheme();
  const {background: backgroundColor, primary, text} = colors;

  const handleEmailLogin = async () => {
    Keyboard.dismiss();
    try {
      const loginStatus = await firebaseSignInWithEmailAndPassword({
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

  const handleRegisterRedirection = () => {
    navigation.navigate(screenNames.Register);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: URL.appIcon,
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
        label={strings.EMAIL}
        value={username}
        onChangeText={updatedText => setUsername(updatedText)}
        autoFocus
        returnKeyType="next"
        onSubmitEditing={() => refInput2.current.focus()}
      />
      <TextInput
        secureTextEntry={showPassword}
        autoCorrect={false}
        selectionColor="transparent"
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
        onPress={handleEmailLogin}
        mode="contained">
        <Text>{strings.LOGIN}</Text>
      </Button>
      <Button
        style={{marginTop: SPACE_12}}
        icon="google"
        theme={{colors: {primary}}}
        onPress={handleGoogleSignin}
        mode="outlined">
        <Text style={{color: text}}>{strings.LOGIN_WITH_GOOGLE}</Text>
      </Button>
      <Text style={[styles.bottomLine, {color: text}]}>
        {strings.DONT_HAVE_ACC}
        <Text
          onPress={handleRegisterRedirection}
          style={[styles.registerLink, {color: primary}]}>
          {strings.REGISTER_HERE}
        </Text>
      </Text>
    </View>
  );
}

export default LoginScreen;
