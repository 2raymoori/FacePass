import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import TextLayer1 from './Components/TextLayer1.tsx';
import TextLayer2 from './Components/TextLayer2.tsx';
import TextLayer3 from './Components/TextLayer3.tsx';
import VerificationActionButton from './Components/VerificationActionButton.tsx';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import ImageAvatar from './Components/ImageAvatar.tsx';
import { useIsFocused } from '@react-navigation/native';

const Camra = (props) => {
  //const [loading, setLoading] = useState(false);

  const getBaseUrl = () => {
    if (Platform.OS === 'android') {
      //return 'http://10.0.2.2:8000'; // emulator
      return 'http://192.168.0.105:8000'; // real device
    }
    return 'http://localhost:8000'; // iOS
  };

  const testConnection = async (backendUrl: string) => {
    const url = getBaseUrl();

    try {
      const response = await fetch(`${url}/`);
      console.log('Connection OK:', response.status);
      return url;
    } catch (error) {
      console.error('Connection failed:', error);
      return null;
    }

    /*
    try {
      const response = await fetch(`${backendUrl}/`, {
        method: 'GET',
        timeout: 5000,
      });
      console.log('Connection test:', response.status);
      return true;
    }
    catch (error) {
      console.error('Connection test failed:', error);
      // Try different URLs for Android
      const urlsToTry = [
        backendUrl,
        backendUrl.replace('localhost', '192.168.0.104'), // Your actual IP
      ];

      console.log("#########################",urlsToTry);

      for (const url of urlsToTry) {
        try {
          const test = await fetch(url, { method: 'GET', timeout: 3000 });
          console.log(`Found working URL: ${url}`);
          return url;
        } catch (e) {
          console.log(`URL ${url} failed:`, e.message);
        }
      }
      return false;
    }
    */
  };

  useEffect(() => {

    fetch('http://192.168.0.105:8000/health', { headers: { "Content-Type": "application/json", "Accept": "application/json" } })

      .then(() => {
        console.log('connection OK');
      })
      .catch(err => {
        console.log(err);
      });

    requestCameraPermission().then(() => {
    }).catch(() => {
      console.log('Permissions denied')
    });
    hasAndroidPermission().then(r => { }).catch(() => { })
  }, [])

  const camera = useRef<Camera>(null)
  const device = useCameraDevice('front');
  const isFocused = useIsFocused()


  const takePicture = async () => {
    //setLoading(true);
    const loginTimeStamp = new Date();
    const time_fragment = loginTimeStamp.toString().split(" ")
    const loginDate = time_fragment[0] + " " + time_fragment[1] + " " + time_fragment[2]
    const loginTime = time_fragment[4]

    const userPassword = props.route.params.password;
    console.log("##############################################")

    try {
      const photo = await camera.current.takePhoto();
      console.log('Photo path:', photo.path);
      const photoPath = photo.path;
      const response = await uploadPhotoToBackend(photoPath, 'http://192.168.0.105:8000', userPassword);
      if (response?.success) {
        //setLoading(false);
        // Success Screen 
        props.navigation.navigate('success', { loginDate: loginDate, loginTime: loginTime, userDetails: response.user });

      } else {
        //setLoading(false);
        // Error Screen...
        props.navigation.navigate('error');
      }
      console.log(response);
      /*
            // Save to Camera Roll
            const savedPhoto = await CameraRoll.save(photoPath, {
              type: 'photo',
              album: 'MyAppPhotos', // Optional: specify album name
            });
      
            console.log('Photo saved to gallery:', savedPhoto);
      */
      //return savedPhoto;
    } catch (error) {
      console.error('Error saving photo:', error.message);
      console.error('Error saving photo:', error);
      props.navigation.navigate('error');
      //setLoading(false);
    }

  };

  const takePictureoldd = async () => {
    try {
      //setLoading(true);
      const loginTimeStamp = new Date();
      const time_fragment = loginTimeStamp.toString().split(" ")
      const loginDate = time_fragment[0] + " " + time_fragment[1] + " " + time_fragment[2]
      const loginTime = time_fragment[4]

      const userPassword = props.route.params.password;
      console.log("##############################################")

      const photo = await camera.current.takePhoto();
      console.log('Photo path:', photo.path);
      const photoPath = photo.path;
      await uploadPhotoToBackend(photoPath, 'http://192.168.0.105:8000', "811532");
      /*
            // Save to Camera Roll
            const savedPhoto = await CameraRoll.save(photoPath, {
              type: 'photo',
              album: 'MyAppPhotos', // Optional: specify album name
            });
      
            console.log('Photo saved to gallery:', savedPhoto);
            */
      //return savedPhoto;
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={() => { props.navigation.goBack() }} style={styles.backBtn}>


        <FontAwesome6 name="arrow-left-long" color={'red'} iconStyle='solid' size={20} />
      </Pressable>
      <View >
        <View style={{ marginBottom: 40, marginTop: 50 }}>
          <TextLayer2 text={'Verify Identity'} />
        </View>

        <View style={{ gap: 15 }}>
          <TextLayer1 text={'Position face in frame'} />
          <TextLayer3 text={'Make sure there is enough light'} />
        </View>
      </View>


      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} device={device} isActive={isFocused} photo={true} ref={camera} />

      </View>

      <VerificationActionButton onPress={takePicture} label={'Clock In'} />
    </View>
  );
}

const uploadPhotoToBackend = async (photoPath: string, backendUrl: string, userPassword: string) => {
  try {
    // Create FormData
    const formData = new FormData();

    // Get file name from path
    const filename = photoPath.split('/').pop();

    // Fix file path for Android
    const cleanPath = Platform.OS === 'android' && !photoPath.startsWith('file://')
      ? `file://${photoPath}`
      : photoPath;

    // Append file to form data
    formData.append('photo', {
      uri: cleanPath,
      type: 'image/jpeg',
      name: filename || 'photo.jpg',
    });

    // Optional: Add metadata
    formData.append('timestamp', new Date().toISOString());
    formData.append('device', 'This is '); // You can get this from metadata
    formData.append('password', userPassword);

    // Upload to server
    const response = await fetch(`${backendUrl}/api/upload`, {
      method: 'POST',
      body: formData,
      // Let fetch set the correct Content-Type with boundary
    });
    console.log(response)

    if (!response.ok) {
      //throw new Error(`Upload failed: ${response.status}`);
      //props.navigation.navigate('error');
    }

    return await response.json();
  } catch (error) {
    //console.error('Upload error:', error);
    //throw error;
  }
};

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

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (Platform.OS !== 'ios') {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Platform.OS !== 'ios') {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    }
  };

  return await getRequestPermissionPromise();
}



const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: "40%",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#132440',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: "center",
    height: 500,
    paddingHorizontal: 50,
  },
  camera: {
    height: 300,
    width: "100%",
  },
});


export default Camra;