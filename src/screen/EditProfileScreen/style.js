import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fontPixel, heightPixel, widthPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    editProfile_container: {
      flex: 1,
      margin: wp('5%'),
      gap: heightPixel(20),
      marginBottom: hp('4%'),
    },
    bg_img: {
      width: wp('100%'),
      height: heightPixel(200),
      opacity: 0.2,
      position: 'absolute',
    },
    // profileStyle_Container: {
    //   width: wp('70%'),
    //   height: undefined,
    //   resizeMode: 'contain',
    //   aspectRatio: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   alignSelf: 'center',
    // },
    phofileImg: {
      width: wp('40%'),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'stretch',
      borderRadius: wp('10%'),
      alignSelf: 'center',
    },
    camaraIconButton: {
      position: 'absolute',
      bottom: 0,
      right: wp('22%'),
      zIndex: 99,
      padding: heightPixel(8),
      backgroundColor: 'white',
      borderRadius: wp('100%'),
    },
    closeIconButton: {
      position: 'absolute',
      top: wp('3%'),
      right: wp('28%'),
      zIndex: 99,
    },
    iconImg: {
      width: widthPixel(30),
      height: undefined,
      aspectRatio: 1,
    },
    cameraIcon: {
      width: widthPixel(20),
      height: undefined,
      aspectRatio: 1,
    },
    errorDisplayContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
    },
    errorText: {
      color: '#FF0000',
      fontSize: fontPixel(12),
    },
  });
