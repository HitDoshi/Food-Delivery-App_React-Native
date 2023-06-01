import {Image, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import {Images} from '../../common/images';
import CustomText from '../../component/CustomText';
import {theme} from '../../theme';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import {useColorScheme} from 'react-native';
import { fontPixel, heightPixel } from '../../scale/scaling';

const FeatureScreen1 = ({navigation}) => {
  const schema = useColorScheme();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles({schema}).mainContainer}>
        <View style={styles({schema}).imageContainer}>
          <Image
            source={Images.Feature1}
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
                TEXT={String.Feature_1_T1}
                COLOR={theme.colors[schema].text}
              />
              <CustomText
                FAMILY={theme.fonts.BentonSans_Bold}
                SIZE={fontPixel(22)} //22
                LINE_HEIGHT={heightPixel(28)} //28
                TEXT={String.Feature_1_T2}
                COLOR={theme.colors[schema].text}
              />
            </View>
            <View>
              <CustomText
                FAMILY={theme.fonts.BentonSans_Book}
                SIZE={fontPixel(12)} //12
                LINE_HEIGHT={heightPixel(22)} //22
                TEXT={String.Feature_1_D1}
                COLOR={theme.colors[schema].text}
              />
              <CustomText
                SIZE={fontPixel(12)} //12
                FAMILY={theme.fonts.BentonSans_Book}
                LINE_HEIGHT={heightPixel(22)} //22
                TEXT={String.Feature_1_D2}
                COLOR={theme.colors[schema].text}
              />
            </View>
          </View>
          <View style={styles({schema}).buttonView}>
            <CustomButton
              title={String.Next}
              onPress={() => {
                navigation.replace('FeatureScreen2');
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeatureScreen1;
