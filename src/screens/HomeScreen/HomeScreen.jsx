import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {COLOR_BACKGROUND} from '../../constants/colors';
import React from 'react';
import {TEXT_XS_SIZE} from '../../constants/sizes';
import Topbar from '../../components/Topbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
  },
  bg: {
    backgroundColor: COLOR_BACKGROUND,
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
