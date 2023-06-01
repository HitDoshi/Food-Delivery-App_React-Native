import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {heightPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    uploadPhoto_container: {
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
    uploadPhoto_Img_Container: {
      width: wp('90%'),
      padding: heightPixel(20),
      gap: 10,
      borderRadius: heightPixel(22),
      // borderColor: theme.colors[schema].borderColor,
      // borderWidth: 1,
      backgroundColor: theme.colors[schema].cardColor,
      alignItems: 'center',
    },
    img: {
      width: heightPixel(55),
      height: undefined,
      aspectRatio: 1,
    },
    button: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });
