import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextLayer1 from '../Components/TextLayer1.tsx';
import TextLayer3 from '../Components/TextLayer3.tsx';
import TextLayer2 from '../Components/TextLayer2.tsx';
import VerificationActionButton from '../Components/VerificationActionButton.tsx';

const AuthScreen: React.FC = () => {
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
        <View style={{ marginVertical: 60 }}>
          <View style={styles.layer}>
            <TextLayer1 text={'Good Morning'} />
          </View>
          <View style={{ ...styles.layer, marginTop: 20 }}>
            <TextLayer3 text={'Welcome back to the office'} />
          </View>
        </View>
        <View style={{ ...styles.layer, gap: 10 }}>
          <TextLayer2 text={'08:58 AM'} />
          <TextLayer3 text="Mon, 22nd Dec" />
        </View>
      </View>

      <VerificationActionButton onPress={() => { console.log("This is a logging...") }} label={"Start Facial Pass"} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#132440',
    paddingVertical: 40
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