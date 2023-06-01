import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {heightPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({scheme}) =>
  StyleSheet.create({
    paymentMethod_container: {
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
    paymentMethod_Img_Container: {
      width: wp('90%'),
      borderRadius: heightPixel(22),
      // borderColor: theme.colors[scheme].text,
      // borderWidth: 1,
      alignItems: 'center',
      backgroundColor: theme.colors[scheme].cardColor,
    },
    img: {
      width: heightPixel(100),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
      tintColor: scheme == 'dark' && 'white',
    },
    button: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });
