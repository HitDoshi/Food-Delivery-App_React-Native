import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {heightPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    setLocation_container: {
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
    setLocation_Container: {
      borderRadius: heightPixel(22), //22
      padding: heightPixel(10),
      gap: heightPixel(20),
      // borderWidth: 1,
      // borderColor: theme.colors[schema].text,
      backgroundColor: theme.colors[schema].cardColor,
    },
    topPart: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: heightPixel(20),
    },
    setLocation_Button: {
      borderRadius: theme.size[4], //16
      backgroundColor: 'silver',
      padding: heightPixel(20),
    },
    img: {
      width: heightPixel(40),
      height: undefined,
      aspectRatio: 1,
    },
    button: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });
