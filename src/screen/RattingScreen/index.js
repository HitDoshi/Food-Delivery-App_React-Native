/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  useColorScheme,
  TouchableOpacity,
  Platform,
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
import SvgUri from 'react-native-svg-uri';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {inputSize} from '../../theme/sizes';

const RattingScreen = ({navigation, route}) => {
  const {title, desc, img} = route.params;
  const schema = useColorScheme();

  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(2);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const CustomRatingBar = () => {
    return (
      <View style={styles({schema}).customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles({schema}).starImageStyle}
                source={
                  item <= defaultRating ? Images.Fill_Star : Images.Blur_Star
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <ImageBackground
        source={Images.BackGroung1}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={{flexGrow: 1}}
          bounces={false}
          scrollEnabled={true}>
          <View style={styles({schema}).textContainer}>
            <View style={styles({schema}).tickImg}>
              <Image source={img} style={styles({schema}).img} />
            </View>
            <View style={styles({schema}).msgPart}>
              <CustomText
                SIZE={fontPixel(24)} //32
                FAMILY={theme.fonts.BentonSans_Bold}
                TEXT={String.Thank_You}
                LINE_HEIGHT={heightPixel(32)} //40
              />
              <CustomText
                SIZE={fontPixel(24)} //22
                FAMILY={theme.fonts.BentonSans_Bold}
                TEXT={title}
                LINE_HEIGHT={heightPixel(32)} //30
              />
            </View>
            <CustomText
              SIZE={fontPixel(14)} //22
              FAMILY={theme.fonts.BentonSans_Book}
              TEXT={desc}
              LINE_HEIGHT={heightPixel(14)} //30
            />
            <CustomRatingBar />
          </View>
          <View style={styles({schema}).bottomContainer}>
            <View style={styles({schema}).chatBox}>
              <Input
                backgroundColor={'white'}
                borderRadius={heightPixel(12)}
                py={Platform.OS == 'ios' ? 4 : inputSize.size}
                multiline={true}
                placeholder={String.Leave_Feedback}
                InputLeftElement={
                  <Icon
                    as={<Image source={Images.Edit_Icon} />}
                    ml="4"
                    size={heightPixel(6)}
                  />
                }
              />
            </View>
            <View style={styles({schema}).buttonContainer}>
              <CustomButton
                title={String.Submit}
                style={styles({schema}).submitButton}
                onPress={() => {
                  // navigation.popToTop();
                  navigation.replace(Screens.BottomTab);
                }}
              />
              <TouchableOpacity
                style={styles({schema}).skipButton}
                onPress={() => {
                  // navigation.popToTop();
                  navigation.replace(Screens.BottomTab);
                }}>
                <CustomText
                  TEXT={String.Skip}
                  SIZE={heightPixel(16)}
                  COLOR={'#53E88B'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default RattingScreen;
