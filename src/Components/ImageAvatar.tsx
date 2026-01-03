import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

const ImageAvatar = () => {
    return (
        <View style={styles.logoContainer}>

            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ff0044ff" />
            </View>

            <Image
                source={require('../Assets/veri_logo.png')}
                style={styles.logo}
                resizeMode={'stretch'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
    },
    logoContainer: {
        borderWidth: 2,
        borderColor: 'red',
        position: 'relative',
        width: '80%',
        height: '50%',
        borderRadius: 20,
        marginTop: 60,
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    loaderContainer: {

        position: 'absolute',
        top: 120,
        zIndex: 1,
        left: 0,
        right: 0,
    }
});

export default ImageAvatar;