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
import {Divider, Icon, Input, Stack, useToast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import {Formik} from 'formik';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EditProfileScreen = ({navigation}) => {
  const schema = useColorScheme();
  const [path, setPath] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);

  const toast = useToast();

  var imgPath = '';

  async function getProfileImg() {
    imgPath = await AsyncStorage.getItem(Key.Profile_Img);
    const parseData = JSON.parse(imgPath);

    if (parseData) {
      console.log('Path:- ', parseData.assets[0].uri);
      setPath(parseData.assets[0].uri);
    }
  }

  async function readData() {
    const mail = await AsyncStorage.getItem(Key.Email);
    setEmail(mail);

    const Name = await AsyncStorage.getItem(Key.UserName);
    setUserName(Name);

    const No = await AsyncStorage.getItem(Key.MobileNo);
    setMobileNo(No);
  }

  useFocusEffect(() => {
    getProfileImg();
    readData();
  });

  async function removePath() {
    await AsyncStorage.removeItem(Key.Profile_Img);
    setPath(null);
    // console.log(await AsyncStorage.getItem(Key.Profile_Img));
    console.log('Remove path successfully');
  }

  const registration_ValidationSchema = yup.object().shape({
    UserName: yup
      .string()
      .min(3, ({min}) => 'Please enter valid user name')
      .required('User Name is required'),
    Email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    MobileNo: yup
      .string()
      .matches(/(\+)?(91)?( )?[789]\d{9}/g, 'Please enter valid mobile number')
      .required('Mobile number is required'),
  });
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEnabled={true}>
          <View style={styles({schema}).editProfile_container}>
            <View style={{gap: heightPixel(20), flex: 1}}>
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
                TEXT={String.Edit_Profile}
                FAMILY={theme.fonts.BentonSans_Bold}
                CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
              />
              <View>
                <Image
                  source={path ? {uri: path} : Images.Profile_Img}
                  style={styles({schema}).phofileImg}
                />
                <TouchableOpacity
                  style={styles({schema}).closeIconButton}
                  onPress={() => {
                    removePath();
                    // navigation.navigate(Screens.UploadPhotoScreen);
                  }}>
                  <Image
                    source={Images.Close_Icon}
                    style={styles({schema}).iconImg}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles({schema}).camaraIconButton}
                  onPress={() => {
                    // removePath();
                    navigation.navigate(Screens.EditPhotoScreen);
                  }}>
                  <Image
                    source={Images.Camera}
                    style={styles({schema}).cameraIcon}
                  />
                </TouchableOpacity>
              </View>
              <Formik
                enableReinitialize
                validationSchema={registration_ValidationSchema}
                initialValues={{
                  UserName: userName,
                  Email: email,
                  MobileNo: mobileNo,
                }}
                onSubmit={async values => {
                  // console.log('SignUp Data:- ', values);
                  // navigation.navigate(Screens.UserBioDataScreen);
                  await AsyncStorage.setItem(
                    Key.UserName,
                    values[Key.UserName],
                  );
                  await AsyncStorage.setItem(Key.Email, values[Key.Email]);
                  await AsyncStorage.setItem(
                    Key.MobileNo,
                    values[Key.MobileNo],
                  );
                  toast.show({
                    title: 'Successfully updated',
                    duration: 1500,
                  });
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
                    <View style={{marginTop: heightPixel(20)}}>
                      <Stack
                        space={heightPixel(5)}
                        w="100%"
                        alignItems="center">
                        <View>
                          <Input
                            name="UserName"
                            width="100%"
                            onChangeText={handleChange('UserName')}
                            onBlur={handleBlur('UserName')}
                            value={values.UserName}
                            variant="underlined"
                            autoCapitalize="none"
                            placeholder={String.Anamwp}
                            color={theme.colors[schema].text}
                            fontSize={fontPixel(16)}
                            focusOutlineColor={'green.500'}
                          />
                          {errors.UserName && touched.UserName && (
                            <View
                              style={styles({schema}).errorDisplayContainer}>
                              <Icon
                                as={<MaterialIcons name={'error'} />}
                                size="3"
                                mr={1}
                                mt={1}
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
                            width="100%"
                            onChangeText={handleChange('Email')}
                            onBlur={handleBlur('Email')}
                            value={values.Email}
                            variant="underlined"
                            autoCapitalize="none"
                            placeholder={String.Email}
                            color={theme.colors[schema].text}
                            fontSize={fontPixel(16)}
                            focusOutlineColor={'green.500'}
                          />
                          {errors.Email && touched.Email && (
                            <View
                              style={styles({schema}).errorDisplayContainer}>
                              <Icon
                                as={<MaterialIcons name={'error'} />}
                                size="3"
                                mr={1}
                                mt={1}
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
                            name="MobileNo"
                            width="100%"
                            onChangeText={handleChange('MobileNo')}
                            onBlur={handleBlur('MobileNo')}
                            value={values.MobileNo}
                            keyboardType={'number-pad'}
                            variant="underlined"
                            autoCapitalize="none"
                            placeholder={String.MobileNo}
                            color={theme.colors[schema].text}
                            fontSize={fontPixel(16)}
                            focusOutlineColor={'green.500'}
                          />
                          {errors.MobileNo && touched.MobileNo && (
                            <View
                              style={styles({schema}).errorDisplayContainer}>
                              <Icon
                                as={<MaterialIcons name={'error'} />}
                                size="3"
                                mr={1}
                                mt={1}
                                ml={2}
                                color="#FF0000"
                              />
                              <Text style={styles({schema}).errorText}>
                                {errors.MobileNo}
                              </Text>
                            </View>
                          )}
                        </View>
                        <CustomButton
                          title={String.Edit}
                          onPress={handleSubmit}
                        />
                      </Stack>
                    </View>
                  </>
                )}
              </Formik>
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                gap: heightPixel(18),
                justifyContent: 'flex-end',
                marginBottom: heightPixel(20),
              }}>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.setItem(
                    Key.IsFirstTime,
                    JSON.stringify(true),
                  );
                  navigation.replace(Screens.SignUpScreen);
                }}>
                <CustomText
                  TEXT={String.SwitchTo_Other_Account}
                  FAMILY={theme.fonts.BentonSans_Medium}
                  SIZE={fontPixel(14)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.setItem(
                    Key.IsLogin,
                    JSON.stringify(false),
                  );
                  navigation.replace(Screens.SignInScreen);
                }}>
                <CustomText
                  TEXT={String.LogOut}
                  COLOR={'red'}
                  SIZE={fontPixel(14)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default EditProfileScreen;
