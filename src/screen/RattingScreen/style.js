import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {heightPixel, widthPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    bg_img: {
      width: wp('100%'),
      height: hp('40%'),
      position: 'absolute',
    },
    tickImg: {
      width: wp('40%'),
      justifyContent: 'flex-end',
    },
    img: {
      width: wp('40%'),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'cover',
      borderWidth: widthPixel(5),
      borderRadius: wp('20%'),
      borderColor: 'green',
    },
    msgPart: {},
    textContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: heightPixel(24),
    },
    customRatingBarStyle: {
      justifyContent: 'center',
      flexDirection: 'row',
      gap: widthPixel(10),
      marginBottom: heightPixel(40),
    },
    starImageStyle: {
      width: widthPixel(30),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'cover',
    },
    bottomContainer: {
      gap: heightPixel(20),
    },
    chatBox: {
      width: wp('90%'),
      alignSelf: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: wp('90%'),
    },
    submitButton: {
      width: wp('55%'),
    },
    skipButton: {
      width: wp('30%'),
      justifyContent: 'center',
      borderRadius: heightPixel(16),
      // borderColor: theme.colors[schema].text,
      // borderWidth: 1,
      backgroundColor: theme.colors[schema].cardColor,
    },
  });
