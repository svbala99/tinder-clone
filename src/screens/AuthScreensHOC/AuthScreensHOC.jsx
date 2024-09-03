import LoginScreen from '../LoginScreen/LoginScreen';
import React from 'react';
import RegisterScreen from '../RegisterScreen/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

function AuthStackHOC() {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerBackTitle: '' }}>
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
}

export default AuthStackHOC;
