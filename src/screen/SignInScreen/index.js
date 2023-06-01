import {
  Icon,
  Input,
  Stack,
  useBreakpointValue,
  useToast,
  WarningIcon,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../../common/images';
import {Screens} from '../../common/screen';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import CustomText from '../../component/CustomText';
import LogoComponent from '../../component/LogoComponent';
import {theme} from '../../theme';
import {styles} from './style';
import {useColorScheme} from 'react-native';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import {Formik} from 'formik';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {inputSize} from '../../theme/sizes';
import {Key} from '../../common/storagekey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from '../../component/Toast';

const SignInScreen = ({navigation}) => {
  const schema = useColorScheme();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  console.log(schema);

  const heightOfInput = useBreakpointValue({
    base: 'md',
    sm: 40,
    md: 55,
    lg: 60,
    xl: 65,
  });

  useEffect(() => {
    async function getData() {
      const e = await AsyncStorage.getItem(Key.Email);
      const p = await AsyncStorage.getItem(Key.Password);

      setEmail(e);
      setPass(p);
    }
    getData();
  }, [email, pass]);

  const login_ValidationSchema = yup.object().shape({
    Email: yup
      .string()
      // .email('Please enter valid email')
      .required('Email Address is Required'),
    Password: yup
      .string()
      // .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      // .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      // .matches(/\d/, 'Password must have a number')
      // .matches(
      //   /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      //   'Password must have a special character',
      // )
      // .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={isKeyboardVisible}>
          <View style={styles({schema}).container_1}>
            <LogoComponent />
          </View>
          <View style={styles({schema}).secondPartContainer}>
            <CustomText
              SIZE={fontPixel(18)}
              TEXT={String.Login_To_Your_Account}
              FAMILY={theme.fonts.BentonSans_Bold}
            />
            <Formik
              // validationSchema={login_ValidationSchema}
              enableReinitialize
              initialValues={{
                Email: email,
                Password: pass,
              }}
              onSubmit={async values => {
                console.log(values);
                // const jsonValue = JSON.stringify(values);
                // await AsyncStorage.setItem(Key.Account_Details, jsonValue);
                // await AsyncStorage.setItem(Key.IsLogin, 'true');
                // Log({msg: `Account Details: ${jsonValue}`});
                const rightEmail = await AsyncStorage.getItem(Key.Email);
                const rightPass = await AsyncStorage.getItem(Key.Password);

                console.log('Right Details: -', rightEmail + ' ' + rightPass);
                console.log(rightPass + ' ' + values[Key.Password]);
                if (
                  rightEmail == values[Key.Email] &&
                  rightPass == values[Key.Password]
                ) {
                  navigation.navigate(Screens.BottomTab);
                  await AsyncStorage.setItem(Key.IsLogin, JSON.stringify(true));
                } else {
                  // <Toast title={'Enter Valid Details'} />;
                  toast.show({
                    title: 'Enter Valid Login Details',
                    duration: 1500,
                  });
                }
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldValue,
                touched,
              }) => (
                <>
                  <View style={styles({schema}).container_2}>
                    <View>
                      <Stack space={4} w="100%" alignItems="center">
                        <View>
                          <Input
                            width="90%"
                            // height={heightOfInput}
                            // size={heightOfInput}
                            py={Platform.OS == 'ios' ? 4 : inputSize.size}
                            name="Email"
                            onChangeText={handleChange('Email')}
                            onBlur={handleBlur('Email')}
                            value={values.Email}
                            color={theme.colors[schema].text}
                            focusOutlineColor={'green.500'}
                            autoCapitalize="none"
                            pl={4}
                            padding={heightPixel(3)}
                            // InputLeftElement={
                            //   <Icon
                            //     as={<Image source={Images.Message} />}
                            //     ml="4"
                            //     size={heightPixel(6)}
                            //   />
                            // }
                            placeholder={String.Email}
                            fontSize={fontPixel(16)}
                            borderRadius={heightPixel(16)}
                          />
                          {/* {errors.Email && touched.Email && (
                            <View
                              style={styles({schema}).errorDisplayContainer}>
                              <Icon
                                as={<MaterialIcons name={'error'} />}
                                size="3"
                                mr={1}
                                ml={2}
                                color="#FF0000"
                              />
                              <Text style={styles({schema}).errorText}>
                                {errors.Email}
                              </Text>
                            </View>
                          )} */}
                        </View>

                        <View>
                          <Input
                            width="90%"
                            name="Password"
                            type={show ? 'text' : 'password'}
                            py={Platform.OS == 'ios' ? 4 : inputSize.size}
                            onChangeText={handleChange('Password')}
                            onBlur={handleBlur('Password')}
                            focusOutlineColor={'green.500'}
                            value={values.Password}
                            color={theme.colors[schema].text}
                            autoCapitalize="none"
                            pl={4}
                            padding={heightPixel(3)}
                            // InputLeftElement={
                            //   <Icon
                            //     as={<Image source={Images.Lock} />}
                            //     ml="4"
                            //     size={heightPixel(6)}
                            //   />
                            // }
                            InputRightElement={
                              <Pressable onPress={() => setShow(!show)}>
                                <Icon
                                  as={
                                    <MaterialIcons
                                      name={
                                        show ? 'visibility' : 'visibility-off'
                                      }
                                    />
                                  }
                                  size={heightPixel(6)}
                                  mr="4"
                                  color={theme.colors.green_gradient}
                                  opacity={0.7}
                                />
                              </Pressable>
                            }
                            placeholder={String.Password}
                            fontSize={fontPixel(16)}
                            borderRadius={heightPixel(16)}
                          />

                          {/* {errors.Password && touched.Password && (
                            <View
                              style={styles({schema}).errorDisplayContainer}>
                              <Icon
                                as={<MaterialIcons name={'error'} />}
                                size="3"
                                mr={1}
                                ml={2}
                                color="#FF0000"
                              />
                              <Text style={styles({schema}).errorText}>
                                {errors.Password}
                              </Text>
                            </View>
                          )} */}
                        </View>
                        <CustomText
                          SIZE={fontPixel(12)}
                          TEXT={String.Or_Continue_With}
                          FAMILY={theme.fonts.BentonSans_Bold}
                        />
                      </Stack>
                      <Stack
                        space={heightPixel(2)}
                        w="100%"
                        mt={heightPixel(5)}>
                        <View style={styles({schema}).social_auth_container}>
                          <View style={styles({schema}).shadow}>
                            <TouchableOpacity
                              style={styles({schema}).socialMedia_auth}>
                              <Image
                                source={Images.FaceBookIcon}
                                style={styles({schema}).img}
                              />
                              <CustomText
                                SIZE={fontPixel(14)}
                                TEXT={String.Facebook}
                                FAMILY={theme.fonts.BentonSans_Medium}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            style={styles({schema}).socialMedia_auth}>
                            <Image
                              source={Images.GoogleIcon}
                              style={styles({schema}).img}
                            />
                            <CustomText
                              SIZE={fontPixel(14)}
                              TEXT={String.Google}
                              FAMILY={theme.fonts.BentonSans_Medium}
                            />
                          </TouchableOpacity>
                        </View>
                      </Stack>
                    </View>
                  </View>
                  <View>
                    <Stack space={heightPixel(4)} w="100%">
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(Screens.ForgotPassMethodScreen);
                        }}>
                        <CustomText
                          TEXT={String.Forgot_Your_Password}
                          COLOR={theme.colors[schema].text}
                          SIZE={fontPixel(12)}
                          FAMILY={theme.fonts.BentonSans_Book}
                          UNDERLINE={true}
                        />
                      </TouchableOpacity>
                      <CustomButton
                        title={String.Login}
                        onPress={handleSubmit}
                        // onPress={() => {
                        //   navigation.replace(Screens.BottomTab);
                        // }}
                      />
                    </Stack>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignInScreen;
