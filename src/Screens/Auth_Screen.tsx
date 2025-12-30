import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TextLayer1 from '../Components/TextLayer1.tsx';
import TextLayer3 from '../Components/TextLayer3.tsx';
import TextLayer2 from '../Components/TextLayer2.tsx';
import VerificationActionButton from '../Components/VerificationActionButton.tsx';
import ClockInPad from '../Components/ClockInPad.tsx';
import { useState } from 'react';
import { dayOrMorning, getCurrentTime } from '../Utilities/Utilities.ts';

const AuthScreen: React.FC = (props) => {
  const [password, setPassword] = useState<string>('')

  const onPasswordChange = (currChar: string, deleteChar?: boolean): void => {
    if (deleteChar) {
      setPassword(password.slice(0, password.length - 1))
    } else {
      setPassword(password + currChar)
    }
    console.log(currChar, deleteChar)
  }

  const onNavigateToClockIn = () => {
    console.log(props)
    props.navigation.navigate("camera")
  }
  const timeDetails = getCurrentTime();
  return (
    <View style={styles.container}>
      <View >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image
              source={require('../Assets/njiesTech.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <View style={{ marginVertical: 20 }}>
          <View style={styles.layer}>
            <TextLayer1 text={dayOrMorning(timeDetails.split('^')[0])} />
          </View>
        </View>


        <View style={{ ...styles.layer }}>
          <TextLayer2 text={timeDetails.split('^')[0]} />
          <TextLayer3 text={timeDetails.split('^')[1]} />
        </View>

      </View>

      <View style={{ marginVertical: 20, gap: 15 }}>
        <View style={{ borderRadius: 10, padding: 0, marginHorizontal: 10 }}>
          <TextInput
            secureTextEntry={true}
            readOnly={true}
            value={password}
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              fontSize: 40,
            }}
            placeholder="Enter your ID" />
        </View>
        <ClockInPad onPasswordChange={onPasswordChange} />
        <VerificationActionButton onPress={() => { onNavigateToClockIn() }} label={"Start Facial Pass"} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#132440',
    paddingTop: 40
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',

  },
  logo: {
    height: 120,
    width: 120,
    borderRadius: 10,
    elevation: 1,
  },
  scanBtn: {
    borderRadius: 10,
    shadowColor: 'black',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#3B9797',
  },
  scanBtnText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  layer: {
    justifyContent: 'center',
    alignItems: 'center',

  }
});
export default AuthScreen;