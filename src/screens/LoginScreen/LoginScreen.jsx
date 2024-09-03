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
  SafeAreaView,
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
  registerLink: {
    fontSize: SPACE_16,
    textDecorationLine: 'underline',
    color: COLOR_PRIMARY_VARIANT,
  },
  bottomLine: {fontSize: SPACE_16, marginTop: SPACE_24, color: COLOR_CHARCOAL},
});

function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [emailLoading, setEmailLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const refInput2 = useRef();

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
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: URL.appIcon,
        }}
        style={styles.appImage}
      />
      <Text style={[styles.appNameText]}>{strings.APP_NAME}</Text>
      <TextInput
        textColor={COLOR_WHITE}
        theme={{colors: {primary: COLOR_PRIMARY, background: COLOR_BACKGROUND}}}
        style={styles.input}
        keyboardType="email-address"
        mode="outlined"
        label={strings.EMAIL}
        value={username}
        onChangeText={updatedText => setUsername(updatedText)}
        returnKeyType="next"
        onSubmitEditing={() => refInput2.current.focus()}
      />
      <TextInput
        textColor={COLOR_WHITE}
        secureTextEntry={showPassword}
        autoCorrect={false}
        selectionColor="transparent"
        theme={{colors: {primary: COLOR_PRIMARY, background: COLOR_BACKGROUND}}}
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
        loading={emailLoading}
        theme={{colors: {primary: COLOR_PRIMARY}}}
        onPress={() => {
          if (username?.length > 2 && password?.length > 2) {
            setEmailLoading(true);
            handleEmailLogin();
          }
        }}
        mode="contained">
        <Text>{strings.LOGIN}</Text>
      </Button>
      <Button
        loading={loading}
        style={{marginTop: SPACE_12}}
        icon="google"
        theme={{colors: {primary: COLOR_PRIMARY}}}
        onPress={() => {
          setLoading(true);
          handleGoogleSignin();
        }}
        mode="outlined">
        <Text>{strings.LOGIN_WITH_GOOGLE}</Text>
      </Button>
      <Text style={[styles.bottomLine]}>
        {strings.DONT_HAVE_ACC}
        <Text onPress={handleRegisterRedirection} style={[styles.registerLink]}>
          {strings.REGISTER_HERE}
        </Text>
      </Text>
    </SafeAreaView>
  );
}

export default LoginScreen;
