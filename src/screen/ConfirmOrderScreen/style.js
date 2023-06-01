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
      marginBottom: 20,
      marginHorizontal: wp('5%'),
    },
    img: {
      width: heightPixel(40),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    title: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dataContainer: {
      flexDirection: 'row',
      gap: widthPixel(14),
    },
    container: {
      gap: heightPixel(14),
      padding: heightPixel(20),
      borderRadius: heightPixel(22),
      // borderWidth: 1,
      // borderColor: 'black',
      backgroundColor: theme.colors[schema].cardColor,
    },
    img2: {
      width: heightPixel(80),
      height: heightPixel(40),
      resizeMode: 'contain',
      tintColor: schema == 'dark' ? 'white' : '',
    },
    dataContainer2: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
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
