/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
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
import {fontPixel, heightPixel, widthPixel} from '../../scale/scaling';
import {Rating} from 'react-native-ratings';
import {Icon, Input} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import MapView, {Callout, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Log} from '../../common/displayLog';
import MapViewDirections from 'react-native-maps-directions';
import SvgUri from 'react-native-svg-uri';
import LinearGradient from 'react-native-linear-gradient';

const TrackOrderScreen = ({navigation}) => {
  const schema = useColorScheme();
  const [currentLongitude, setCurrentLongitude] = useState();
  const [currentLatitude, setCurrentLatitude] = useState();
  const [locationStatus, setLocationStatus] = useState();

  const [coordinates] = useState([
    {
      latitude: 21.226,
      longitude: 72.8312,
    },
    {
      latitude: 21.2092,
      longitude: 72.8301,
    },
  ]);

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
        key={'hit'}
        coordinate={{
          latitude: coordinates[1].latitude,
          longitude: coordinates[1].longitude,
        }}>
        <Image
          source={Images.Track_Marker}
          style={{
            width: heightPixel(32),
            height: undefined,
            aspectRatio: 1,
            resizeMode: 'contain',
          }}
        />
        <Callout onPress={() => {}}>
          <View
            style={{
              flexDirection: 'row',
              gap: widthPixel(4),
              justifyContent: 'center',
              width: heightPixel(60),
            }}>
            <Image
              source={Images.Clock_Icon}
              style={{
                width: heightPixel(16),
                height: undefined,
                aspectRatio: 1,
                resizeMode: 'contain',
              }}
            />
            <Text style={{}}>25 min</Text>
          </View>
        </Callout>
      </Marker>
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={styles({schema}).map}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={'AIzaSyCnPCmmYjo5f5w5MAzF26QXXnSR855LsRQ'} // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        />
        <Data />
        <Marker coordinate={coordinates[0]} />
      </MapView>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}
        style={{
          position: 'absolute',
          top: 50,
          marginHorizontal: widthPercentageToDP('5%'),
        }}>
        <SvgUri
          source={require('../../../assets/images/CommonImage/Back_Icon.svg')}
        />
      </TouchableOpacity>
      <View style={styles({schema}).setLocation_Container}>
        <CustomText
          TEXT={String.Track_Orders}
          SIZE={heightPixel(14)}
          LINE_HEIGHT={heightPixel(20)}
          FAMILY={theme.fonts.BentonSans_Bold}
          CUSTOM_STYLE={{
            textAlign: 'left',
            marginTop: heightPixel(8),
          }}
        />
        <View style={styles({schema}).topPart}>
          <Image
            source={Images.Delivery_Men_Photo}
            style={styles({schema}).img}
          />
          <View style={{alignItems: 'flex-start'}}>
            <CustomText
              TEXT={'Mr Kemplas'}
              SIZE={heightPixel(15)}
              LINE_HEIGHT={heightPixel(20)}
              FAMILY={theme.fonts.BentonSans_Medium}
            />
            <View
              style={{
                flexDirection: 'row',
                gap: widthPixel(8),
                alignItems: 'center',
              }}>
              <Image
                source={Images.Direction_Icon}
                style={{
                  width: heightPixel(16),
                  height: undefined,
                  aspectRatio: 1,
                  resizeMode: 'contain',
                }}
              />
              <CustomText
                TEXT={'25 minutes on the way'}
                SIZE={heightPixel(15)}
                LINE_HEIGHT={heightPixel(20)}
              />
            </View>
          </View>
        </View>
        <View style={styles({schema}).buttonContainer}>
          <LinearGradient
            colors={theme.colors[schema].green_gradient}
            style={[
              styles({schema}).gradientBox,
              styles({schema}).submitButton,
            ]}>
            <TouchableOpacity
              style={styles({schema}).submitButton}
              onPress={() => {
                // navigation.popToTop();
                navigation.replace(Screens.CallScreen);
              }}>
              <Image
                source={Images.Call_Icon}
                style={{
                  width: heightPixel(16),
                  height: undefined,
                  aspectRatio: 1,
                  resizeMode: 'contain',
                  tintColor: 'white',
                }}
              />
              <CustomText TEXT={String.Call} CUSTOM_STYLE={{fontWeight: 500}} />
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity
            style={styles({schema}).msgButton}
            onPress={() => {
              // navigation.popToTop();
              navigation.replace(Screens.ChatScreen);
            }}>
            <Image
              source={Images.Message_Icon}
              style={{
                width: heightPixel(50),
                height: undefined,
                aspectRatio: 1,
                resizeMode: 'stretch',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TrackOrderScreen;
