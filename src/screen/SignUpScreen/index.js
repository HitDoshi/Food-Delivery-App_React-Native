import React, {useEffect, useState} from 'react';
import {Box, Checkbox, Icon, Input, Stack, useToast} from 'native-base';
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {String} from '../../common/strings';
import {theme} from '../../theme';
import {Images} from '../../common/images';
import LogoComponent from '../../component/LogoComponent';
import {styles} from './style';
import CustomButton from '../../component/CustomButton';
import CustomText from '../../component/CustomText';
import {Screens} from '../../common/screen';
import {useColorScheme} from 'react-native';
import * as yup from 'yup';
import {
  fontPixel,
  heightCount,
  heightPixel,
  moderateScale,
} from '../../scale/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {Key} from '../../common/storagekey';
import {Log} from '../../common/displayLog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {inputSize} from '../../theme/sizes';

const SignUpScreen = ({navigation}) => {
  console.log(useWindowDimensions());
  const schema = useColorScheme();
  const [show, setShow] = React.useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const registration_ValidationSchema = yup.object().shape({
    UserName: yup
      .string()
      .min(3, ({min}) => 'Please enter valid user name')
      .required('User Name is required'),
    Email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    Password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const toast = useToast();

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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEnabled={isKeyboardVisible}>
          <View style={styles({schema}).container}>
            <View style={styles({schema}).container_1}>
              <LogoComponent />
            </View>
            <View style={styles({schema}).secondPartContainer}>
              <CustomText
                SIZE={fontPixel(18)}
                TEXT={String.Sign_Up_For_Free}
                CUSTOM_STYLE={styles({schema}).titleText}
                FAMILY={theme.fonts.BentonSans_Bold}
              />
              <Formik
                enableReinitialize
                validationSchema={registration_ValidationSchema}
                initialValues={{
                  UserName: '',
                  Email: 'hitdoshi@gmail.com',
                  Password: 'HitDoshi13@',
                  RememberPassword: true,
                  Email_Notification: true,
                }}
                onSubmit={async values => {
                  // console.log('SignUp Data:- ', values);
                  const jsonSignUpValue = JSON.stringify(values);
                  await AsyncStorage.setItem(
                    Key.Account_Details,
                    jsonSignUpValue,
                  );
                  await AsyncStorage.setItem(
                    Key.UserName,
                    values[Key.UserName],
                  );
                  await AsyncStorage.setItem(Key.Email, values[Key.Email]);
                  await AsyncStorage.setItem(
                    Key.Password,
                    values[Key.Password],
                  );
                  await AsyncStorage.setItem(
                    Key.RememberPassword,
                    JSON.stringify(values[Key.RememberPassword]),
                  );
                  await AsyncStorage.setItem(
                    Key.Email_Notification,
                    JSON.stringify(values[Key.Email_Notification]),
                  );
                  Log({msg: `Account Details: ${jsonSignUpValue}`});
                  Log({
                    msg: `Account Details: ${await AsyncStorage.getItem(
                      Key.Email,
                    )}`,
                  });
                  toast.show({
                    title: 'Successfully account created',
                    duration: 1500,
                  });
                  navigation.navigate(Screens.UserBioDataScreen);
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
                        <Stack
                          space={heightPixel(2)}
                          w="100%"
                          alignItems="center">
                          <View>
                            <Input
                              name="UserName"
                              width="90%"
                              py={Platform.OS == 'ios' ? 4 : inputSize.size}
                              color={theme.colors[schema].text}
                              onChangeText={handleChange('UserName')}
                              onBlur={handleBlur('UserName')}
                              focusOutlineColor={'green.500'}
                              value={values.UserName}
                              autoCapitalize="none"
                              InputLeftElement={
                                <Icon
                                  as={<Image source={Images.Profile} />}
                                  ml="4"
                                  size={heightPixel(6)}
                                />
                              }
                              placeholder={String.Anamwp}
                              fontSize={fontPixel(16)}
                              borderRadius={heightPixel(16)}
                              style={styles({schema}).input}
                            />
                            {errors.UserName && touched.UserName && (
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
                                  {errors.UserName}
                                </Text>
                              </View>
                            )}
                          </View>
                          <View>
                            <Input
                              name="Email"
                              width="90%"
                              py={Platform.OS == 'ios' ? 4 : inputSize.size}
                              color={theme.colors[schema].text}
                              focusOutlineColor={'green.500'}
                              autoCapitalize="none"
                              onChangeText={handleChange('Email')}
                              onBlur={handleBlur('Email')}
                              value={values.Email}
                              keyboardType="email-address"
                              InputLeftElement={
                                <Icon
                                  as={<Image source={Images.Email_1} />}
                                  ml="4"
                                  size={heightPixel(6)}
                                />
                              }
                              placeholder={String.Email}
                              fontSize={fontPixel(16)}
                              borderRadius={heightPixel(16)}
                            />
                            {errors.Email && touched.Email && (
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
                            )}
                          </View>
                          <View>
                            <Input
                              name="Password"
                              width="90%"
                              type={show ? 'text' : 'password'}
                              py={Platform.OS == 'ios' ? 4 : inputSize.size}
                              focusOutlineColor={'green.500'}
                              color={theme.colors[schema].text}
                              onChangeText={handleChange('Password')}
                              onBlur={handleBlur('Password')}
                              value={values.Password}
                              autoCapitalize="none"
                              InputLeftElement={
                                <Icon
                                  as={<Image source={Images.Password} />}
                                  ml="4"
                                  size={heightPixel(6)}
                                />
                              }
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
                            {errors.Password && touched.Password && (
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
                            )}
                          </View>
                        </Stack>
                        <Stack
                          space={heightPixel(2)}
                          w="100%"
                          mt={heightPixel(5)}>
                          <Checkbox
                            size="sm"
                            defaultIsChecked
                            name="RememberPassword"
                            colorScheme="green"
                            checked={values.RememberPassword}
                            onPress={() =>
                              setFieldValue(
                                'RememberPassword',
                                !values.RememberPassword,
                              )
                            }
                            colorschema="green">
                            <CustomText
                              TEXT={String.Keep_Me_Signed_In}
                              SIZE={fontPixel(14)} //12
                              FAMILY={theme.fonts.BentonSans_Book}
                            />
                          </Checkbox>
                          <Checkbox
                            size="sm"
                            defaultIsChecked
                            name="Email_Notification"
                            colorScheme="green"
                            checked={values.Email_Notification}
                            onPress={() =>
                              setFieldValue(
                                'Email_Notification',
                                !values.Email_Notification,
                              )
                            }
                            colorschema="green">
                            <CustomText
                              TEXT={String.Email_Me_About_Special_Pricing}
                              SIZE={fontPixel(14)} //12
                              FAMILY={theme.fonts.BentonSans_Book}
                            />
                          </Checkbox>
                        </Stack>
                      </View>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Stack space={heightPixel(4)} w="100%">
                        <CustomButton
                          title={String.Create_Account}
                          onPress={handleSubmit}
                          // onPress={() => {
                          //   navigation.navigate(Screens.UserBioDataScreen);
                          // }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate(Screens.SignInScreen);
                          }}>
                          <CustomText
                            TEXT={String.Already_Have_An_Account}
                            SIZE={heightPixel(12)} //12
                            FAMILY={theme.fonts.BentonSans_Book}
                            UNDERLINE={true}
                            COLOR={'#53E88B'}
                          />
                        </TouchableOpacity>
                      </Stack>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUpScreen;
