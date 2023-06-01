import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    forgotPass_container: {
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
    method_Container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.size[2],
      borderColor: theme.colors[schema].border_color,
      borderWidth: 1,
      padding: theme.space[2],
    },
    button: {
      flex: 1,
      justifyContent: 'flex-end',
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
