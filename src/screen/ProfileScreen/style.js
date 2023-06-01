import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {heightPixel, widthPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    profileImg: {
      width: wp('100%'),
      height: hp('45%'),
      resizeMode: 'stretch',
    },
    rootContainer: {
      flex: 1,
    },
    bottomSheet: {},
    bottomSheet_Container: {
      margin: wp('5%'),
      gap: heightPixel(20),
    },
    goldMemberText: {
      alignSelf: 'baseline',
      backgroundColor: '#FEAD11',
      opacity: 0.7,
      justifyContent: 'center',
      paddingVertical: heightPixel(10),
      paddingHorizontal: widthPixel(16),
      borderRadius: heightPixel(16),
    },
    userNameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    edit_pencile_icon: {
      width: heightPixel(24),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    voucherContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthPixel(8),
      borderRadius: heightPixel(22),
      borderColor: 'black',
      borderWidth: 1,
      padding: heightPixel(12),
      backgroundColor: theme.colors[schema].cardColor,
    },
    voucherIcon: {
      width: heightPixel(45),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    favouriteContainer: {
      gap: heightPixel(20),
      alignItems: 'flex-start',
    },
    orderContainer: {
      width: wp('90%'),
      flexDirection: 'row',
      backgroundColor: theme.colors[schema].cardColor,
      borderRadius: heightPixel(16),
      borderColor: 'black',
      paddingVertical: heightPixel(20),
      paddingHorizontal: widthPixel(12),
      gap: widthPixel(14),
      alignItems: 'center',
    },
    orderImg: {
      width: wp('15%'),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    textPart: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    details: {
      width: wp('40%'),
      gap: 4,
      alignItems: 'flex-start',
    },
    imgContainer: {
      flexDirection: 'row',
      gap: widthPixel(10),
      alignItems: 'center',
    },
    fun_Img: {
      width: widthPixel(24),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    buyAgainButtom: {
      backgroundColor: '#15BE77',
      borderRadius: heightPixel(16),
      padding: heightPixel(14),
      alignSelf: 'center',
    },
  });
