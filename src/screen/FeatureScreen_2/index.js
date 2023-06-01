import {Image, SafeAreaView, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {styles} from '../FeatureScreen_1/style';
import {Images} from '../../common/images';
import CustomText from '../../component/CustomText';
import {theme} from '../../theme';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import {Key} from '../../common/storagekey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Screens} from '../../common/screen';
import { fontPixel, heightPixel } from '../../scale/scaling';

const FeatureScreen1 = ({navigation}) => {
  const schema = useColorScheme();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles({schema}).mainContainer}>
        <View style={styles({schema}).imageContainer}>
          <Image
            source={Images.Feature2}
            style={styles({schema}).feature1_Img}
          />
        </View>
        <View style={styles({schema}).bottomPart}>
          <View style={styles({schema}).textPart}>
            <View>
              <CustomText
                FAMILY={theme.fonts.BentonSans_Bold}
                SIZE={fontPixel(22)} //22
                LINE_HEIGHT={heightPixel(28)} //28
                TEXT={String.Feature_2_T1}
              />
              <CustomText
                FAMILY={theme.fonts.BentonSans_Bold}
                SIZE={fontPixel(22)} //22
                LINE_HEIGHT={heightPixel(28)} //28
                TEXT={String.Feature_2_T2}
              />
            </View>
            <View>
              <CustomText
                FAMILY={theme.fonts.BentonSans_Book}
                SIZE={fontPixel(12)} //12
                LINE_HEIGHT={heightPixel(22)} //22
                TEXT={String.Feature_2_D1}
              />
              <CustomText
                FAMILY={theme.fonts.BentonSans_Book}
                SIZE={fontPixel(12)} //12
                LINE_HEIGHT={heightPixel(22)} //22
                TEXT={String.Feature_2_D2}
              />
            </View>
          </View>
          <View style={styles({schema}).buttonView}>
            <CustomButton
              title={String.Next}
              onPress={async () => {
                // await AsyncStorage.setItem(Key.IsFirstTime, false);
                navigation.replace(Screens.SignUpScreen);
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeatureScreen1;
