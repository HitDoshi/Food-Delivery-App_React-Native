import {StyleSheet, Text, View, Image, useColorScheme} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Images} from '../common/images';
import {theme} from '../theme';
import {String} from '../common/strings';
import CustomText from './CustomText';
import GradientText from './GradientText';
import {fontPixel, heightCount, widthCount} from '../scale/scaling';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const LogoComponent = () => {
  const schema = useColorScheme();
  return (
    <View style={styles({schema}).mainContainer}>
      <View style={styles({schema}).logoImageContainer}>
        <Image source={Images.Logo} style={styles({schema}).logoImage} />
      </View>
      <View style={styles({schema}).textPart}>
        <CustomText
          // COLOR={theme.colors[schema].text}
          SIZE={fontPixel(35)}
          TEXT={String.App_Title_1}
          FAMILY={theme.fonts.Viga_Regular}
          COLOR={'#53E88B'}
        />
        <CustomText
          COLOR={theme.colors[schema].text}
          SIZE={fontPixel(12)}
          TEXT={String.App_Title_2}
          FAMILY={theme.fonts.Inter}
        />
      </View>
    </View>
  );
};

export default LogoComponent;

const styles = ({schema}) =>
  StyleSheet.create({
    mainContainer: {},
    logoImageContainer: {
      alignItems: 'center',
      flex: 1,
    },
    textPart: {
      flex: 1,
    },
    logoImage: {
      flex: 1,
      resizeMode: 'contain',
    },
  });
