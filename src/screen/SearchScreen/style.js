import {Platform, StyleSheet} from 'react-native';
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
      height: hp('35%'),
      opacity: 0.2,
      position: 'absolute',
    },
    rootContainer: {
      gap: heightPixel(20),
      margin: wp('5%'),
      paddingBottom: heightPixel(100),
    },
    topContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    titleContainer: {
      width: wp('70%'),
    },
    notificationIconContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: heightPixel(45),
      width: heightPixel(45),
      justifyContent: 'center',
      borderRadius: heightPixel(20),
    },
    notificationIcon: {
      width: heightPixel(20),
      resizeMode: 'contain',
    },
    leftPart: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: heightPixel(10),
    },
    menuContainer: {
      gap: heightPixel(20),
    },
    topicContainer: {
      flexDirection: 'row',
      gap: widthPixel(10),
      flexWrap: 'wrap',
    },
    topic: {
      paddingHorizontal: heightPixel(20),
      paddingVertical: heightPixel(16),
      backgroundColor: '#DA6317',
      borderRadius: heightPixel(16),
    },
    buttonContainer: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? wp('10%') : 0,
      alignSelf: 'center',
    },
  });
