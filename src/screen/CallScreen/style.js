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
      opacity: 0.7,
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      gap: heightPixel(45),
    },
    profileImg: {
      width: wp('40%'),
      justifyContent: 'flex-end',
      gap: heightPixel(20),
    },
    msgPart: {
      gap: heightPixel(14),
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
    callFun_ButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: widthPixel(20),
      marginBottom: 20,
    },
    fun_Button: {
      width: wp('20%'),
      heightL: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
  });
