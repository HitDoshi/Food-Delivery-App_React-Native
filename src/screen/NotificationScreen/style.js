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
      height: hp('30%'),
      position: 'absolute',
      opacity: 0.2,
    },
    rootContainer: {
      gap: heightPixel(20),
      marginBottom: 20,
      marginHorizontal: wp('5%'),
    },
    img: {
      width: wp('12%'),
      height: undefined,
      resizeMode: 'contain',
      aspectRatio: 1,
      alignSelf: 'center',
    },
    msgContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors[schema].cardColor,
      borderRadius: heightPixel(16),
      padding: 24,
    },
    textPart: {
      justifyContent: 'center',
      gap: 5,
      marginLeft: 10,
    },
  });
