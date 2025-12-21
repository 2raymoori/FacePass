/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import {
  StatusBar,
  useColorScheme
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Camra from './src/Camra.tsx';
import AuthScreen from './src/Screens/Auth_Screen.tsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <AuthScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default App;
