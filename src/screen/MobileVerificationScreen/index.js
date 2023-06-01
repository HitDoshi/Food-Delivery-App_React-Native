import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import {Screens} from '../../common/screen';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomText from '../../component/CustomText';
import {theme} from '../../theme';
import {fontPixel, heightPixel} from '../../scale/scaling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Key} from '../../common/storagekey';
import {useFocusEffect} from '@react-navigation/native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {Input, useToast} from 'native-base';
const MobileVerificaionScreen = ({navigation}) => {
  const schema = useColorScheme();
  const [mobileNO, setMobileNo] = useState(null);
  const [minute, setMinute] = useState(1);
  const [sec, setSec] = useState(30);
  const [timeOut, setTimeOut] = useState(false);
  const [otp, setOTP] = useState('');
  const toast = useToast();
  useEffect(() => {
    async function getData() {
      var MobileNo = await AsyncStorage.getItem(Key.MobileNo);
      if (MobileNo) {
        MobileNo = JSON.parse(MobileNo).substring(0, 8) + '****';
        setMobileNo(MobileNo);
      }
    }
    getData();
  }, []);

  const decrementTimer = useCallback(() => {
    setSec(oldSec => oldSec - 1);
  }, []);

  // useEffect(() => {
  //   if (sec <= 0 && minute > 0) {
  //     setMinute(oldMinute => oldMinute - 1);
  //     setSec(60);
  //   } else if (sec <= 0 && minute <= 0) {
  //     return;
  //   }
  //   const timeoutFunction = setInterval(decrementTimer, 1000);
  //   return () => clearInterval(timeoutFunction);
  // }, [decrementTimer, sec, minute]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }

      if (sec === 0) {
        if (minute === 0) {
          clearInterval(interval);
          setTimeOut(true);
        } else {
          setSec(59);
          setMinute(minute - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [sec, minute]);

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
          <View>
            <CustomText
              SIZE={fontPixel(24)} //25
              LINE_HEIGHT={heightPixel(32)} //32
              TEXT={String.OTP_Screen_T1}
              FAMILY={theme.fonts.BentonSans_Bold}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            <CustomText
              SIZE={fontPixel(24)} //25
              LINE_HEIGHT={heightPixel(32)} //32
              TEXT={String.OTP_Screen_T2}
              FAMILY={theme.fonts.BentonSans_Bold}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
          </View>
          <View>
            <CustomText
              SIZE={fontPixel(14)} //14
              LINE_HEIGHT={heightPixel(22)} //22
              TEXT={String.OTP_Screen_D1 + ' ' + mobileNO + ' .'}
              FAMILY={theme.fonts.BentonSans_Book}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            <CustomText
              SIZE={fontPixel(14)} //14
              LINE_HEIGHT={heightPixel(22)} //22
              TEXT={
                String.OTP_Screen_D2 +
                minute.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                }) +
                ':' +
                sec.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                }) +
                ' .'
              }
              FAMILY={theme.fonts.BentonSans_Book}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            {/* <Timer
              totalDuration={90000}
              start={true}
              reset={false}
              getTime={time => console.log(time)}
            /> */}
          </View>
          {/* <OTPInputView
            style={styles({schema}).otpInput}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles({schema}).underlineStyleBase}
            codeInputHighlightStyle={styles({schema}).underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          /> */}
          <Input
            name="otp"
            width="100%"
            onChangeText={text => setOTP(text)}
            value={otp}
            keyboardType={'number-pad'}
            variant="underlined"
            autoCapitalize="none"
            color={theme.colors[schema].text}
            fontSize={fontPixel(16)}
            focusOutlineColor={'green.500'}
          />
          <TouchableOpacity
            disabled={false}
            onPress={() => {
              setSec(30);
              setMinute(1);
              setTimeOut(false);
            }}>
            <Text style={styles({schema}).resendOTP}>Resend OTP</Text>
          </TouchableOpacity>
          <View style={styles({schema}).button}>
            <CustomButton
              title={String.Next}
              onPress={() => {
                if (!timeOut) {
                  if (otp == '1234') {
                    navigation.replace(Screens.ResetPasseordScreen);
                  } else {
                    toast.show({
                      title: 'Please enter valid OTP',
                      duration: 1500,
                    });
                  }
                } else {
                  toast.show({
                    title: 'Time up',
                    duration: 1500,
                  });
                }
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MobileVerificaionScreen;
