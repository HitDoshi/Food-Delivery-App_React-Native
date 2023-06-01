import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fontPixel, heightPixel, widthPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    container_1: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: hp('25%'),
    },
    bg_img: {
      position: 'absolute',
      height: hp('35%'),
      width: wp('100%'),
      resizeMode: 'cover',
    },
    secondPartContainer: {
      height: hp('70%'),
      justifyContent: 'space-evenly',
    },
    container_2: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {},
    social_auth_container: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: wp('90%'),
      gap: wp('5%'),
    },
    socialMedia_auth: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: theme.colors[schema].text,
      borderWidth: 1,
      borderRadius: heightPixel(16),
      width: wp('40%'),
      padding: heightPixel(15),
      justifyContent: 'center',
      gap: widthPixel(10),
    },
    img: {
      width: widthPixel(28),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    shadow: {
      elevation: 1,
      shadowColor: '#52006A',
    },
    errorText: {
      color: '#FF0000',
      fontSize: fontPixel(14),
    },
    errorDisplayContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
    },
  });
