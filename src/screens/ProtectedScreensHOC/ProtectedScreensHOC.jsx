import {Alert, Pressable, ToastAndroid} from 'react-native';
import {
  COLOR_BACKGROUND,
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
} from '../../constants/colors';
import {SPACE_16, SPACE_24} from '../../constants/sizes';
import {screenNames, strings} from '../../constants/strings';

import ChatScreen from '../ChatScreen/ChatScreen';
import GoldStarScreen from '../GoldStarScreen/GoldStarScreen';
import HomeScreen from '../HomeScreen/HomeScreen';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicon from 'react-native-vector-icons/Octicons';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import React from 'react';
import SearchScreen from '../SearchScreen/SearchScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {firebaseSignOut} from '../../services/firebaseClient';

const Tab = createBottomTabNavigator();

function LeftIcon({iconColor = 'black', handleBackPress = () => {}}) {
  return (
    <Pressable style={{marginHorizontal: SPACE_16}} onPress={handleBackPress}>
      <MaterialIcon name="arrow-back" size={SPACE_24} color={iconColor} />
    </Pressable>
  );
}

function RightIcon({iconColor = 'black', handleLogout = () => {}}) {
  return (
    <Pressable style={{marginHorizontal: SPACE_16}} onPress={handleLogout}>
      <MaterialIcon name="logout" size={SPACE_24} color={iconColor} />
    </Pressable>
  );
}

function TabBarIcon({route = '', color = 'black', size = 24}) {
  const iconNames = {
    Home: <IonicIcon name={'flame'} size={size} color={color} />,
    Search: (
      <MaterialCommunityIcon
        name={'feature-search'}
        size={size}
        color={color}
      />
    ),
    GoldStar: <IonicIcon name={'sparkles'} size={size} color={color} />,
    Chat: <IonicIcon name={'chatbubbles'} size={size} color={color} />,
    Profile: <Octicon name={'person-fill'} size={size} color={color} />,
  };
  return iconNames[route.name];
}

function ProtectedStackHOC() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => TabBarIcon({color, size, route}),
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLOR_PRIMARY,
        tabBarInactiveTintColor: COLOR_TEXT_SECONDARY,
        tabBarStyle: {backgroundColor: COLOR_BACKGROUND, borderTopWidth: 0},
      })}
      initialRouteName={screenNames.Home}>
      <Tab.Screen
        name={screenNames.Home}
        options={() => ({
          headerShown: false,
        })}
        component={HomeScreen}
      />
      <Tab.Screen
        name={screenNames.Search}
        component={SearchScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={screenNames.GoldStar}
        component={GoldStarScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={screenNames.Chat}
        component={ChatScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={screenNames.Profile}
        component={ProfileScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
}

export default ProtectedStackHOC;
