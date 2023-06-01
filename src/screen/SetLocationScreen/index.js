import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import {Screens} from '../../common/screen';
import {Input, Icon, Stack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme';
import CustomText from '../../component/CustomText';
import {useColorScheme} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Log} from '../../common/displayLog';
import {fontPixel, heightPixel} from '../../scale/scaling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Key} from '../../common/storagekey';
// import Geocoder from 'react-native-geocoder';

const SetLocationScreen = ({navigation}) => {
  const schema = useColorScheme();
  const [address, setAddress] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
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
          getOneTimeLocation();
        } else {
          setLocationStatus('Permission Denied');
          await Linking.openSettings();
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // async function getAddressFromCoordinates({latitude, longitude}) {
  //   try {
  //     const res = await Geocoder.geocodePosition({latitude, longitude});
  //     setAddress(res);
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const getOneTimeLocation = () => {
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
        // getAddressFromCoordinates(currentLatitude, currentLongitude);
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
  };

  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({schema}).setLocation_container}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              source={Images.Back}
              style={{
                width: heightPixel(48),
                height: undefined,
                aspectRatio: 1,
              }}
            />
          </TouchableOpacity>
          <View>
            <CustomText
              SIZE={fontPixel(24)}
              LINE_HEIGHT={heightPixel(32)}
              TEXT={String.Set_Your_Location}
              FAMILY={theme.fonts.BentonSans_Bold}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
          </View>
          <View>
            <CustomText
              SIZE={fontPixel(14)}
              LINE_HEIGHT={heightPixel(22)}
              TEXT={String.Security_D1}
              FAMILY={theme.fonts.BentonSans_Book}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            <CustomText
              SIZE={fontPixel(14)}
              LINE_HEIGHT={heightPixel(22)}
              TEXT={String.Security_D2}
              FAMILY={theme.fonts.BentonSans_Book}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
          </View>
          <View style={styles({schema}).setLocation_Container}>
            <View style={styles({schema}).topPart}>
              <Image source={Images.Map_Pin_Img} style={styles({schema}).img} />
              <CustomText
                TEXT={String.Your_Location}
                SIZE={fontPixel(15)}
                LINE_HEIGHT={heightPixel(20)}
                FAMILY={theme.fonts.BentonSans_Medium}
              />
            </View>
            <TouchableOpacity
              style={styles({schema}).setLocation_Button}
              onPress={() => requestLocationPermission()}>
              <CustomText
                TEXT={String.Set_Location}
                SIZE={fontPixel(14)}
                LINE_HEIGHT={heightPixel(16)}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <CustomText
                TEXT={currentLatitude}
                SIZE={fontPixel(14)}
                LINE_HEIGHT={heightPixel(16)}
              />
              <CustomText
                TEXT={(' , ')}
                SIZE={fontPixel(14)}
                LINE_HEIGHT={heightPixel(16)}
              />
              <CustomText
                TEXT={currentLongitude}
                SIZE={fontPixel(14)}
                LINE_HEIGHT={heightPixel(16)}
              />
            </View>
          </View>
          <View style={styles({schema}).button}>
            <CustomButton
              title={String.Finish}
              onPress={async () => {
                await AsyncStorage.setItem(
                  Key.IsFirstTime,
                  JSON.stringify(false),
                );
                navigation.popToTop();
                navigation.navigate(Screens.SuccessScreen, {
                  msg: String.Profile_Success_Msg,
                  renderScreen: Screens.BottomTab,
                });
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SetLocationScreen;
