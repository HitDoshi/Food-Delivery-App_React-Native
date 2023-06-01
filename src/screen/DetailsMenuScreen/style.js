import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {heightPixel, widthPixel} from '../../scale/scaling';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    rootImg: {
      width: wp('100%'),
      height: hp('45%'),
      resizeMode: 'stretch',
    },
    rootContainer: {
      flex: 1,
    },
    backIcon: {
      position: 'absolute',
      top: heightPixel(34),
      left: widthPixel(24),
      zIndex: 1,
    },
    bottomSheet: {},
    bottomSheet_Container: {
      margin: wp('5%'),
      gap: heightPixel(20),
    },
    goldMemberText: {
      alignSelf: 'baseline',
      backgroundColor: '#15BE77',
      justifyContent: 'center',
      paddingVertical: heightPixel(10),
      paddingHorizontal: widthPixel(16),
      borderRadius: heightPixel(16),
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerRightPart: {
      flexDirection: 'row',
      gap: widthPixel(12),
    },
    headerImg: {
      width: widthPixel(22),
      height: heightPixel(22),
      resizeMode: 'contain',
    },
    userNameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ratting_distance: {
      flexDirection: 'row',
      gap: widthPixel(20),
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthPixel(8),
    },

    flateList: {
      alignSelf: 'center',
    },
    box: {
      width: wp('40%'),
      borderRadius: heightPixel(20),
      alignItems: 'center',
      padding: heightPixel(20),
      justifyContent: 'space-evenly',
      margin: heightPixel(5),
      marginTop: heightPixel(20),
      backgroundColor: schema == 'dark' ? '#1F1B24' : '#E8E8E8',
      // backgroundColor: theme.colors[scheme].cardColor,
    },
    boxText: {
      alignItems: 'center',
      gap: heightPixel(10),
    },
    boxImage: {gap: heightPixel(20)},
    image1: {
      width: wp('20%'),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    rattingContainer: {
      width: wp('85%'),
      padding: widthPixel(10),
      flexDirection: 'row',
      alignItems: 'center',
      margin: heightPixel(5),
      borderRadius: heightPixel(20),
      justifyContent: 'space-between',
      backgroundColor: schema == 'dark' ? '#1F1B24' : '#E8E8E8',
      // backgroundColor: theme.colors[scheme].text,
      // backgroundColor: theme.colors[scheme].cardColor,
    },
    rattingName: {
      gap: heightPixel(5),
      alignItems: 'flex-start',
    },
    ratting: {
      width: wp('60%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rattingImg: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthPixel(8),
      backgroundColor: 'green',
      paddingHorizontal: widthPixel(12),
      paddingVertical: heightPixel(4),
      borderRadius: heightPixel(12),
    },
    starImg: {
      width: widthPixel(16),
      height: widthPixel(16),
      resizeMode: 'contain',
    },
    image2: {
      width: heightPixel(65),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderRadius: heightPixel(12),
    },
    priceText: {},
    leftPart: {
      flexDirection: 'row',
      gap: heightPixel(10),
    },
    cartButton: {
      width: wp('90%'),
      position: 'absolute',
      bottom: heightPixel(50),
    },
  });
