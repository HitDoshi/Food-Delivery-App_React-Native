import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import CustomText, {variants} from '../../component/CustomText';
import {theme} from '../../theme';
import {Screens} from '../../common/screen';
import {fontPixel, heightPixel} from '../../scale/scaling';

const SuccessScreen = ({navigation, route}) => {
  const {msg, renderScreen} = route.params;
  const schema = useColorScheme();
  return (
    <>
      <ImageBackground
        source={Images.BackGroung1}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({schema}).successScreenContainer}>
          <View style={styles({schema}).textContainer}>
            <View style={styles({schema}).tickImg}>
              <Image
                source={Images.Success_Tick_Icon}
                style={styles({schema}).img}
              />
            </View>
            <View style={styles({schema}).msgPart}>
              <CustomText
                SIZE={fontPixel(32)} //32
                FAMILY={theme.fonts.BentonSans_Bold}
                TEXT={String.Congrats}
                LINE_HEIGHT={heightPixel(40)} //40
              />
              <CustomText
                SIZE={fontPixel(22)} //22
                FAMILY={theme.fonts.BentonSans_Bold}
                TEXT={msg}
                LINE_HEIGHT={heightPixel(30)} //30
              />
            </View>
          </View>
          <View style={styles({schema}).button}>
            <CustomButton
              title={String.Back}
              onPress={() => {
                // navigation.popToTop();
                navigation.replace(renderScreen);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SuccessScreen;
