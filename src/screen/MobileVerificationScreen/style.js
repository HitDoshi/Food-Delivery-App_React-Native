import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {heightPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    forgotPass_container: {
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
    otpInput: {
      width: wp('80%'),
      height: heightPixel(100),
      alignSelf: 'center',
    },
    button: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    underlineStyleBase: {
      width: wp('15%'),
      height: wp('15%'),
      borderWidth: 2,
      color: theme.colors[schema].text,
    },
    underlineStyleHighLighted: {
      borderColor: theme.colors[schema].text,
    },
    resendOTP: {
      color: theme.colors[schema].text,
      alignSelf: 'center',
      textDecorationLine: 'underline',
      color: '#53E88B',
      fontFamily: theme.fonts.BentonSans_Book,
    }
  });
