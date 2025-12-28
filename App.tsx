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

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SuccessScreen />
        {
          //<AuthScreen />
          //<Camra />
          // <VerifryScreen />
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#132440',
  },
});
export default App;
