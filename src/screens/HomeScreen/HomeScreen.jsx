import {SPACE_16, TEXT_XS_SIZE} from '../../constants/sizes';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {COLOR_BLACK} from '../../constants/colors';
import React from 'react';
import Topbar from '../../components/Topbar';
import {useTheme} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BLACK,
  },
  bg: {
    backgroundColor: COLOR_BLACK,
    flex: 1,
    borderRadius: TEXT_XS_SIZE,
  },
});

function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <Topbar />
      <View style={styles.bg}>
        <Text>Home screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
