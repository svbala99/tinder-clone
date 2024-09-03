import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {SPACE_16} from '../../constants/sizes';
import {useTheme} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE_16,
  },
});

function SearchScreen() {
  const {colors} = useTheme();
  const {background: backgroundColor} = colors;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text>Search screen</Text>
    </View>
  );
}

export default SearchScreen;
