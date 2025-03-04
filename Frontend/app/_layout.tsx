// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AuthScreen from './AuthScreen';
// import MainScreen from './MainScreen';
// import CommunityScreen from './CommunityScreen';

// const Tab = createBottomTabNavigator();

// export default function RootLayout() {
//   return (
//     <Tab.Navigator initialRouteName="Auth">
//       <Tab.Screen name="Auth" component={AuthScreen} />
//       <Tab.Screen name="Main" component={MainScreen} />
//       <Tab.Screen name="Community" component={CommunityScreen} />
//     </Tab.Navigator>
//   );
// }
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthScreen from './AuthScreen';
import MainScreen from './MainScreen';
import CommunityScreen from './CommunityScreen';
import { supabase } from '../supabaseClient';
import { View, Text, Button, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function LogoutScreen({ navigation }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate('Auth'); // Navigate to AuthScreen after logout
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
}

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuthStatus();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => authListener?.subscription?.unsubscribe();
  }, []);

  return (
    <Tab.Navigator initialRouteName={isAuthenticated ? 'Main' : 'Auth'} screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Tab.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Tab.Screen name="Main" component={MainScreen} />
          <Tab.Screen name="Community" component={CommunityScreen} />
          <Tab.Screen name="Logout" component={LogoutScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
