import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import {Screens} from '../../common/screen';
import {theme} from '../../theme';
import CustomText from '../../component/CustomText';
import {fontPixel, heightPixel, widthPixel} from '../../scale/scaling';

const ForgotPassMethodScreen = ({navigation}) => {
  const schema = useColorScheme();
  const mobile_No = '4235';
  const email = '@gmail.com';
  const [verifyMethod, setMethod] = useState('sms');
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({schema}).forgotPass_container}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              source={Images.Back}
              style={{
                width: heightPixel(48),
                height: undefined,
                aspectRatio: 1,
              }}
            />
          </TouchableOpacity>
          <CustomText
            SIZE={fontPixel(24)} //24
            TEXT={String.Forgot_Password}
            FAMILY={theme.fonts.BentonSans_Bold}
            CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
          />
          <View>
            <CustomText
              SIZE={fontPixel(14)} //14
              LINE_HEIGHT={heightPixel(18)} //20
              TEXT={String.Forgot_D1}
              FAMILY={theme.fonts.BentonSans_Book}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            <CustomText
              SIZE={fontPixel(14)} //14
              LINE_HEIGHT={heightPixel(18)} //20
              TEXT={String.Forgot_D2}
              FAMILY={theme.fonts.BentonSans_Book}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
          </View>

          <TouchableOpacity onPress={() => setMethod('sms')}>
            <View
              style={[
                styles({schema}).method_Container,
                {
                  backgroundColor:
                    verifyMethod == 'sms'
                      ? 'lightblue'
                      : theme.colors[schema].cardColor,
                },
              ]}>
              <Image source={Images.Message_2} style={styles({schema}).image} />
              <View style={styles({schema}).methodData_Container}>
                <CustomText
                  SIZE={fontPixel(16)} //16
                  TEXT={String.Via_SMS}
                  FAMILY={theme.fonts.BentonSans_Book}
                  CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
                />
                <View style={styles({schema}).data}>
                  <View style={{flexDirection: 'row', gap: heightPixel(8)}}>
                    <Image
                      source={Images.Dot}
                      style={{
                        tintColor: theme.colors[schema].text,
                        height: heightPixel(10),
                        width: widthPixel(30),
                        resizeMode: 'contain',
                      }}
                    />
                    <Image
                      source={Images.Dot}
                      style={{
                        tintColor: theme.colors[schema].text,
                        height: heightPixel(10),
                        width: widthPixel(30),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <CustomText
                    SIZE={fontPixel(16)} //16
                    TEXT={mobile_No}
                    FAMILY={theme.fonts.BentonSans_Book}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMethod('email')}>
            <View
              style={[
                styles({schema}).method_Container,
                {
                  backgroundColor:
                    verifyMethod == 'email'
                      ? 'lightblue'
                      : theme.colors[schema].cardColor,
                },
              ]}>
              <Image source={Images.Email} style={styles({schema}).image} />
              <View style={styles({schema}).methodData_Container}>
                <CustomText
                  SIZE={fontPixel(16)} //16
                  TEXT={String.Via_EMAIL}
                  FAMILY={theme.fonts.BentonSans_Book}
                  CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
                />
                <View style={styles({schema}).data}>
                  <Image
                    source={Images.Dot}
                    style={{
                      tintColor: theme.colors[schema].text,
                      height: heightPixel(10),
                      width: widthPixel(30),
                      resizeMode: 'contain',
                    }}
                  />
                  <CustomText
                    SIZE={fontPixel(16)} //16
                    TEXT={email}
                    FAMILY={theme.fonts.BentonSans_Book}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles({schema}).button}>
            <CustomButton
              title={String.Next}
              onPress={() => {
                navigation.replace(Screens.MobileVerificationScreen);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ForgotPassMethodScreen;
