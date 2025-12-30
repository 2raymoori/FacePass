/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { StatusBar, StyleSheet, useColorScheme } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Camra from './src/Camra.tsx';
import AuthScreen from './src/Screens/Auth_Screen.tsx';
import VerifryScreen from './src/Screens/Verify_Screen.tsx';
import SuccessScreen from './src/Screens/Success_screen.tsx';
import ErrorScreen from './src/Screens/Error_Screen.tsx';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="auth" component={AuthScreen} />
            <Stack.Screen name="camera" component={Camra} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#132440',

  },
});
export default App;

<SafeAreaProvider>
  <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="camera" component={Camra} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
</SafeAreaProvider>

