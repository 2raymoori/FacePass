import { StyleSheet, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect } from 'react';



const Camra = ()=>{
  useEffect(()=>{
    requestCameraPermission().then(() =>{

    } ).catch(()=>{
      console.log('Permissions denied')});
  },[])


  const device = useCameraDevice('front');
  return (
    <View style={styles.camraContainer}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
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
  camraContainer:{
    height: "100%",
    width: "100%"
  }
})


export default Camra;