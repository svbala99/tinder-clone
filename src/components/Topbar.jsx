import * as React from 'react';

import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {COLOR_BACKGROUND, COLOR_SECONDARY} from '../constants/colors';
import {
  SPACE_104,
  SPACE_16,
  SPACE_24,
  SPACE_32,
  SPACE_64,
} from '../constants/sizes';
import {URL, strings} from '../constants/strings';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {firebaseSignOut} from '../services/firebaseClient';

const styles = StyleSheet.create({
  container: {
    height: SPACE_64,
    backgroundColor: COLOR_BACKGROUND,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ml16: {marginLeft: SPACE_16},
  mh16: {marginHorizontal: SPACE_16},
});

const Topbar = () => {
  const handleLogout = () => {
    Alert.alert(strings.APP_NAME, strings.DO_YOU_WANT_TO_LOGOUT, [
      {
        text: strings.NO,
        style: strings.CANCEL,
      },
      {
        text: strings.YES,
        onPress: () => {
          firebaseSignOut();
          ToastAndroid.showWithGravity(
            strings.LOGOUT_SUCCESS,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: URL.topbarIcon}}
        width={SPACE_104}
        height={SPACE_32}
        style={styles.ml16}
      />
      <Pressable style={styles.mh16} onPress={handleLogout}>
        <MaterialIcon name="logout" size={SPACE_24} color={COLOR_SECONDARY} />
      </Pressable>
    </View>
  );
};

export default Topbar;
