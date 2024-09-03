import React, { useEffect, useState } from 'react';

import AuthStackHOC from '../screens/AuthScreensHOC/AuthScreensHOC';
import { NavigationContainer } from '@react-navigation/native';
import ProtectedStackHOC from '../screens/ProtectedScreensHOC/ProtectedScreensHOC';
import { createStackNavigator } from '@react-navigation/stack';
import firebaseAuthInstance from '@react-native-firebase/auth';
import navigationRef from './navigationRef';

const Stack = createStackNavigator();

function Navigator() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [firebaseUserObj, setFirebaseUserObj] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setFirebaseUserObj(user);
        if (initializing) setInitializing(false);
    }

    // firebase subscription
    useEffect(() => {
        const subscriber =
            firebaseAuthInstance().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    });

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                {!firebaseUserObj ? (
                    <Stack.Screen
                        name="Public"
                        component={AuthStackHOC}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <Stack.Screen
                        name="Protected"
                        component={ProtectedStackHOC}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;
