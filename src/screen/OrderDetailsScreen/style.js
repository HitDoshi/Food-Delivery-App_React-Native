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
      height: heightPixel(200),
      opacity: 0.2,
      position: 'absolute',
    },
    rootContainer: {
      flex: 1,
      gap: heightPixel(20),
      marginBottom: heightPixel(100),
      marginHorizontal: wp('5%'),
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
    priceBox: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      gap: heightPixel(8),
      padding: widthPixel(24),
      borderRadius: heightPixel(16),
    },
    textBoxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    orderButton: {
      backgroundColor: 'white',
      padding: heightPixel(15),
      borderRadius: heightPixel(16),
      marginVertical: heightPixel(8),
    },
  });
