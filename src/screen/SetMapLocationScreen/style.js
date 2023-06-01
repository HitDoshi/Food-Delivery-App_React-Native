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
      borderWidth: 1,
      borderColor: 'black',
    },
    img2: {
      width: heightPixel(80),
      height: heightPixel(40),
      resizeMode: 'contain',
    },
    dataContainer2: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchBar: {
      position: 'absolute',
      top: 50,
      width: wp('90%'),
      alignSelf: 'center',
    },
    setLocation_Button: {
      borderRadius: theme.size[4], //16
      backgroundColor: 'white',
      padding: heightPixel(20),
    },
    gradientBox: {
      borderRadius: heightPixel(22), //22
    },
    setLocation_Container: {
      width: wp('90%'),
      padding: heightPixel(12),
      gap: heightPixel(20),
      // borderWidth: 1,
      // borderColor: theme.colors[schema].text,
    },
    topPart: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: widthPixel(14),
    },
  });
