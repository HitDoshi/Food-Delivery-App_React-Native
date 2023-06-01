import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {heightPixel, widthPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    bg_img: {
      width: wp('100%'),
      height: heightPixel(200),
      opacity: 0.2,
      position: 'absolute',
    },
    chattingScreen_container: {
      gap: heightPixel(20),
      alignItems: 'flex-start',
      alignSelf: 'center',
      marginHorizontal: hp('5%'),
      flex: 1,
    },
    userBox: {
      flexDirection: 'row',
      width: wp('90%'),
      padding: wp('3%'),
      backgroundColor: schema == 'dark' ? '#1F1B24' : '#E8E8E8',
      gap: widthPixel(10),
      borderRadius: heightPixel(16),
      alignItems: 'center',
    },
    chatBox: {
      width: wp('90%'),
      position: 'absolute',
      bottom: 20,
    },
    scrollView: {
      paddingRight: heightPixel(15),
      flex: 1,
      marginBottom: 80,
      width: wp('90%'),
    },
    bgImg: {
      width: wp('15%'),
      height: undefined,
      aspectRatio: 1, //Important
      resizeMode: 'contain',
    },
  });
