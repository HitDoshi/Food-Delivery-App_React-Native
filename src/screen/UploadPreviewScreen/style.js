import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {heightPixel, widthPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    uploadPhotoPreview_container: {
      flex: 1,
      margin: wp('5%'),
      gap: heightPixel(20),
      marginBottom: wp('4%'),
    },
    bg_img: {
      width: wp('100%'),
      height: heightPixel(200),
      opacity: 0.2,
      position: 'absolute',
    },
    profileStyle_Container: {
      width: wp('70%'),
      height: hp('30%'),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: heightPixel(22),
    },
    phofileImg: {
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
      borderRadius: heightPixel(22),
    },
    closeIconButton: {
      position: 'absolute',
      top: heightPixel(15),
      right: widthPixel(15),
    },
    closeIconImg: {
      width: widthPixel(30),
      height: undefined,
      aspectRatio: 1,
    },
    button: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });
