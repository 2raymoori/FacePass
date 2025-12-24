import { StyleSheet, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useRef } from 'react';
import TextLayer1 from './Components/TextLayer1.tsx';
import TextLayer2 from './Components/TextLayer2.tsx';
import TextLayer3 from './Components/TextLayer3.tsx';
import VerificationActionButton from './Components/VerificationActionButton.tsx';

const Camra = ()=>{
  useEffect(()=>{
    requestCameraPermission().then(() =>{
    } ).catch(()=>{
      console.log('Permissions denied')});
  },[])


  const camera = useRef<Camera>(null)
  const device = useCameraDevice('front');
  const takePicture = async () => {
    const photo = await camera.current.takePhoto();
    console.log(photo)
  };

  return (
    <View style={styles.mainContainer}>
      <View >
        <View style={{marginBottom:40,marginTop:50}}>
          <TextLayer2 text={'Verify Identity'} />
        </View>

        <View style={{gap:15}}>
          <TextLayer1 text={'Position face in frame'} />
          <TextLayer3 text={'Make sure there is enough light'} />
        </View>
      </View>

      <View style={styles.cameraContainer}>
        <Camera  style={styles.camera} device={device} isActive={true} photo={true} ref={camera} />
      </View>

      <VerificationActionButton onPress={takePicture} label={'Clock In'} />
    </View>
  );
}

async function requestCameraPermission() {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: 'Camera Permission',
      message: 'This app needs access to your camera',
      buttonPositive: 'OK',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems:"center",
    height:500,
    paddingHorizontal:50,
},
  camera: {
    height: 300,
    width: "100%",
  },
});


export default Camra;