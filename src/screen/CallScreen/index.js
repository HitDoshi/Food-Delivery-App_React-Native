import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import CustomText, {variants} from '../../component/CustomText';
import {theme} from '../../theme';
import {Screens} from '../../common/screen';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {Rating} from 'react-native-ratings';
import {Icon, Input} from 'native-base';

const CallScreen = ({navigation, route}) => {
  const {name, number, img} = route.params;
  const schema = useColorScheme();

  return (
    <>
      <ImageBackground
        source={Images.BackGroung1}
        resizeMode={'contain'}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({schema}).mainContainer}>
          <View style={styles({schema}).profileImg}>
            <Image source={img} style={styles({schema}).img} />
          </View>
          <View style={styles({schema}).msgPart}>
            <CustomText
              SIZE={fontPixel(24)} //32
              FAMILY={theme.fonts.BentonSans_Bold}
              TEXT={name}
              LINE_HEIGHT={heightPixel(32)} //40
            />
            <CustomText
              SIZE={fontPixel(14)} //22
              FAMILY={theme.fonts.BentonSans_Book}
              TEXT={'Ringing...'}
              LINE_HEIGHT={heightPixel(14)} //30
            />
          </View>
        </View>
        <View style={styles({schema}).callFun_ButtonContainer}>
          <Image
            source={Images.Speaker_Icon}
            style={styles({schema}).fun_Button}
          />
          <Image
            source={Images.Call_End_Icon}
            style={styles({schema}).fun_Button}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default CallScreen;
