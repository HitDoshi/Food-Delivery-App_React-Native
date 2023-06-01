import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import {Screens} from '../../common/screen';
import {Input, Icon, Stack, useToast} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme';
import CustomText from '../../component/CustomText';
import {useColorScheme} from 'react-native';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {inputSize} from '../../theme/sizes';
import * as yup from 'yup';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Key} from '../../common/storagekey';

const ResetPasswordScreen = ({navigation}) => {
  const schema = useColorScheme();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);
  const toast = useToast();
  const registration_ValidationSchema = yup.object().shape({
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
          bounces={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}>
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
              SIZE={fontPixel(24)} //25
              LINE_HEIGHT={heightPixel(32)} //32
              TEXT={String.ResetPass_Screen_Title}
              FAMILY={theme.fonts.BentonSans_Bold}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />

            <View>
              <CustomText
                SIZE={fontPixel(14)} //14
                LINE_HEIGHT={heightPixel(22)} //22
                TEXT={String.ResetPass_Screen_D1}
                FAMILY={theme.fonts.BentonSans_Book}
                CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
              />
              <CustomText
                SIZE={fontPixel(14)} //14
                LINE_HEIGHT={heightPixel(22)} //22
                TEXT={String.ResetPass_Screen_D2}
                FAMILY={theme.fonts.BentonSans_Book}
                CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
              />
            </View>
            <Formik
              validationSchema={registration_ValidationSchema}
              initialValues={{
                Password: '',
                Confirm_Password: '',
              }}
              onSubmit={async values => {
                const oldPassword = await AsyncStorage.getItem(Key.Password);

                if (values.Password == values.Confirm_Password) {
                  await AsyncStorage.setItem(Key.Password, values.Password);
                  // toast.show({
                  //   title: 'Successfully password reset',
                  // });
                  navigation.navigate(Screens.SuccessScreen, {
                    msg: String.Reset_Pass_Success_msg,
                    renderScreen: Screens.SignInScreen,
                  });
                } else {
                  toast.show({
                    title: 'Confirm password is not matched',
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
                  <Stack space={heightPixel(4)} w="100%" alignItems="center">
                    <View>
                      <Input
                        name="Password"
                        width="100%"
                        type={showPass ? 'text' : 'password'}
                        py={Platform.OS == 'ios' ? 4 : inputSize.size}
                        color={theme.colors[schema].text}
                        autoCapitalize="none"
                        focusOutlineColor={'green.500'}
                        onChangeText={handleChange('Password')}
                        onBlur={handleBlur('Password')}
                        value={values.Password}
                        fontSize={fontPixel(16)}
                        borderRadius={heightPixel(16)}
                        InputRightElement={
                          <Pressable onPress={() => setShowPass(!showPass)}>
                            <Icon
                              as={
                                <MaterialIcons
                                  name={
                                    showPass ? 'visibility' : 'visibility-off'
                                  }
                                />
                              }
                              size={heightPixel(6)}
                              mr="4"
                              color={theme.colors.green_gradient}
                              opacity={0.9}
                            />
                          </Pressable>
                        }
                        placeholder={String.Password}
                      />
                      {errors.Password && touched.Password && (
                        <View style={styles({schema}).errorDisplayContainer}>
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
                    <Input
                      name="Confirm_Password"
                      onChangeText={handleChange('Confirm_Password')}
                      onBlur={handleBlur('Confirm_Password')}
                      value={values.Confirm_Password}
                      type={showConfirm ? 'text' : 'password'}
                      focusOutlineColor={'green.500'}
                      py={Platform.OS == 'ios' ? 4 : inputSize.size}
                      fontSize={fontPixel(16)}
                      borderRadius={heightPixel(16)}
                      color={theme.colors[schema].text}
                      autoCapitalize="none"
                      InputRightElement={
                        <Pressable onPress={() => setshowConfirm(!showConfirm)}>
                          <Icon
                            as={
                              <MaterialIcons
                                name={
                                  showConfirm ? 'visibility' : 'visibility-off'
                                }
                              />
                            }
                            size={heightPixel(6)}
                            mr="4"
                            color={theme.colors[schema].text}
                            opacity={0.9}
                          />
                        </Pressable>
                      }
                      placeholder={String.Confirm_Password}
                    />
                  </Stack>
                  <View style={styles({schema}).button}>
                    <CustomButton
                      title={String.Save}
                      // onPress={() => {
                      //   navigation.replace(Screens.SuccessScreen, {
                      //     msg: String.Reset_Pass_Success_msg,
                      //     renderScreen: Screens.SignInScreen,
                      //   });
                      // }}
                      onPress={handleSubmit}
                    />
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

export default ResetPasswordScreen;
