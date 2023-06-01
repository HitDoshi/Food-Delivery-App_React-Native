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
      height: hp('30%'),
      position: 'absolute',
      opacity: 0.2,
    },
    rootContainer: {
      flex: 1,
      marginBottom: 20,
      marginHorizontal: wp('5%'),
    },
    map: {
      flex: 1,
    },
    img: {
      width: heightPixel(60),
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    img2: {
      width: heightPixel(80),
      height: heightPixel(40),
      resizeMode: 'contain',
    },
    searchBar: {
      position: 'absolute',
      top: 50,
      width: wp('90%'),
      alignSelf: 'center',
    },
    setLocation_Container: {
      width: wp('90%'),
      alignSelf: 'center',
      position: 'absolute',
      bottom: 50,
      borderRadius: heightPixel(22), //22
      padding: heightPixel(12),
      gap: heightPixel(20),
      borderWidth: 1,
      borderColor: theme.colors[schema].text,
      backgroundColor: schema == 'dark' ? 'black' : 'white',
    },
    topPart: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthPixel(14),
      backgroundColor: theme.colors[schema].cardColor,
      padding: heightPixel(10),
      borderRadius: heightPixel(16),
    },
    buttonContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: wp('85%'),
      flex: 1,
      gap: widthPixel(20),
    },
    submitButton: {
      flex: 1,
      flexDirection: 'row',
      gap: widthPixel(20),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: heightPixel(16),
      // borderColor: 'black',
      // borderWidth: 1,
    },
    msgButton: {
      flex: 0.3,
      justifyContent: 'center',
      borderRadius: heightPixel(16),
      borderColor: theme.colors[schema].text,
      borderWidth: 1,
      backgroundColor: theme.colors[schema].cardColor,
    },
  });
