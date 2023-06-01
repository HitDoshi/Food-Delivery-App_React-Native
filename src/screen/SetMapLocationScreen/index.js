import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import CustomText, {variants} from '../../component/CustomText';
import {theme} from '../../theme';
import {Screens} from '../../common/screen';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {Rating} from 'react-native-ratings';
import {Icon, Input} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import MapView, {Callout, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Log} from '../../common/displayLog';
import SvgUri from 'react-native-svg-uri';
import LinearGradient from 'react-native-linear-gradient';

const SetMapLocationScreen = ({navigation}) => {
  const schema = useColorScheme();
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);

  useEffect(() => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        Log({msg: currentLatitude + ' ' + currentLongitude});
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  }, [currentLatitude, currentLongitude]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
        } else {
          setLocationStatus('Permission Denied');
          await Linking.openSettings();
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const Data = () => {
    requestLocationPermission();
    return (
      <Marker
        // image={{
        //   uri: 'https://www.jagranimages.com/images/06_11_2014-pchaakki.jpg',
        // }}
        key={'hit'}
        title={'hit'}
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}>
        <Callout onPress={() => {}}>
          <Text>
            {/* {hit.geometry.location.lat + ' , ' + hit.geometry.location.lng} */}
          </Text>
        </Callout>
      </Marker>
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Data />
      </MapView>

      <View style={styles({schema}).searchBar}>
        <Input
          placeholder={String.Search_Hint}
          width="100%"
          py={heightPixel(5)}
          backgroundColor={'white'}
          borderRadius={heightPixel(16)}
          fontSize={heightPixel(14)}
          alignSelf="flex-start"
          autoCapitalize="none"
          InputLeftElement={
            <Icon
              ml="3"
              size={heightPixel(6)}
              as={<Image source={Images.Search_Icon} />}
            />
          }
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
        }}>
        <LinearGradient
          colors={theme.colors[schema].green_gradient}
          style={[styles({schema}).gradientBox]}>
          <View style={styles({schema}).setLocation_Container}>
            <View style={styles({schema}).topPart}>
              <Image source={Images.Map_Pin_Img} style={styles({schema}).img} />
              <CustomText
                TEXT={'4517 Washington Ave. Manchester, Kentucky 39495'}
                SIZE={heightPixel(15)}
                LINE_HEIGHT={heightPixel(20)}
                FAMILY={theme.fonts.BentonSans_Medium}
                CUSTOM_STYLE={{
                  width: widthPercentageToDP('65%'),
                  textAlign: 'left',
                }}
              />
            </View>
            <TouchableOpacity
              style={styles({schema}).setLocation_Button}
              onPress={() => {
                navigation.pop();
              }}>
              <CustomText
                TEXT={String.Set_Location}
                SIZE={fontPixel(14)}
                LINE_HEIGHT={heightPixel(14)}
                COLOR={'#53E88B'}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default SetMapLocationScreen;
