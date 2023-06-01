import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../../theme';
export const styles = ({schema}) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexWrap: 'wrap',
    },
    imageContainer: {
      flex: 1.5,
    },
    feature1_Img: {
      flex: 1.5,
      width: wp('100%'),
      resizeMode: 'stretch',
    },
    bottomPart: {
      flex: 1,
      width: wp('100%'),
      height: hp('45%'),
      justifyContent: 'space-evenly',
    },
    textPart: {
      gap: theme.space[1],
    },
    buttonView: {
      justifyContent: 'center',
    },
  });
