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
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const Camra = () => {
  const getBaseUrl = () => {
    if (Platform.OS === 'android') {
      //return 'http://10.0.2.2:8000'; // emulator
      return 'http://192.168.0.104:8000'; // real device
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

    fetch('http://192.168.0.104:8000/health', { headers: { "Content-Type": "application/json", "Accept": "application/json" } })

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

  const takePicture = async () => {
    try {
      const photo = await camera.current.takePhoto();
      console.log('Photo path:', photo.path);
      const photoPath = photo.path;
      await uploadPhotoToBackend(photoPath, 'http://192.168.0.104:8000');

      // Save to Camera Roll
      const savedPhoto = await CameraRoll.save(photoPath, {
        type: 'photo',
        album: 'MyAppPhotos', // Optional: specify album name
      });

      console.log('Photo saved to gallery:', savedPhoto);
      //return savedPhoto;
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
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
        <Camera style={styles.camera} device={device} isActive={true} photo={true} ref={camera} />
      </View>

      <VerificationActionButton onPress={takePicture} label={'Clock In'} />
    </View>
  );
}

const uploadPhotoToBackend = async (photoPath: string, backendUrl: string) => {
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
    formData.append('device', 'iPhone 12'); // You can get this from metadata

    // Upload to server
    const response = await fetch(`${backendUrl}/api/upload`, {
      method: 'POST',
      body: formData,
      // Let fetch set the correct Content-Type with boundary
    });
    console.log(response)

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
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