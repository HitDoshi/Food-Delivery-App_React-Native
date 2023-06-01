import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  useColorScheme,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import {Screens} from '../../common/screen';
import {Input, Icon, Stack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme';
import CustomText from '../../component/CustomText';
import {Formik} from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Log} from '../../common/displayLog';
import {Key} from '../../common/storagekey';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {inputSize} from '../../theme/sizes';

const UserBioDataScreen = ({navigation}) => {
  const schema = useColorScheme();
  const [f_name, setFName] = useState('');
  const [l_name, setLName] = useState('');
  const [confirmShow, setConfirmShow] = React.useState(false);
  const bioData_ValidationSchema = yup.object().shape({
    First_Name: yup
      .string()
      .min(3, ({min}) => 'Please enter valid first name')
      .required('First name is required'),
    Last_Name: yup
      .string()
      .min(3, ({min}) => 'Please enter valid last name')
      .required('Last name is required'),
    MobileNo: yup
      .string()
      .matches(/(\+)?(91)?( )?[789]\d{9}/g, 'Please enter valid mobile number')
      .required('Mobile number is required'),
  });

  useEffect(() => {
    async function getData() {
      const userName = await AsyncStorage.getItem(Key.UserName);
      // let userName = JSON.parse(data);
      const name = userName.split(' ');
      setFName(name[0]);
      setLName(name[1]);
      // console.log(name[0]);
    }

    getData();
  }, []);

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
            <Formik
              enableReinitialize
              validationSchema={bioData_ValidationSchema}
              initialValues={{
                First_Name: f_name,
                Last_Name: l_name,
                MobileNo: '',
              }}
              onSubmit={async values => {
                const jsonValue = JSON.stringify(values);
                await AsyncStorage.setItem(Key.UserBioData, jsonValue);
                await AsyncStorage.setItem(
                  Key.First_Name,
                  values[Key.First_Name],
                );
                await AsyncStorage.setItem(
                  Key.Last_Name,
                  values[Key.Last_Name],
                );
                await AsyncStorage.setItem(Key.MobileNo, values[Key.MobileNo]);
                Log({msg: `UserBioData Details: ${jsonValue}`});
                navigation.navigate(Screens.PaymentMethodScreen);
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
                  <View>
                    <CustomText
                      SIZE={fontPixel(24)} //25
                      LINE_HEIGHT={heightPixel(32)} //32
                      TEXT={String.BioData_Screen_T1}
                      FAMILY={theme.fonts.BentonSans_Bold}
                      CUSTOM_STYLE={{
                        alignSelf: 'flex-start',
                        textAlign: 'left',
                      }}
                    />
                    <CustomText
                      SIZE={fontPixel(24)}
                      LINE_HEIGHT={heightPixel(32)} //22
                      TEXT={String.BioData_Screen_T2}
                      FAMILY={theme.fonts.BentonSans_Bold}
                      CUSTOM_STYLE={{
                        alignSelf: 'flex-start',
                        textAlign: 'left',
                      }}
                    />
                  </View>
                  <View>
                    <CustomText
                      SIZE={fontPixel(14)} //14
                      LINE_HEIGHT={heightPixel(22)} //22
                      TEXT={String.Security_D1}
                      FAMILY={theme.fonts.BentonSans_Book}
                      CUSTOM_STYLE={{
                        alignSelf: 'flex-start',
                        textAlign: 'left',
                      }}
                    />
                    <CustomText
                      SIZE={fontPixel(14)} //14
                      LINE_HEIGHT={heightPixel(22)} //22
                      TEXT={String.Security_D2}
                      FAMILY={theme.fonts.BentonSans_Book}
                      CUSTOM_STYLE={{
                        alignSelf: 'flex-start',
                        textAlign: 'left',
                      }}
                    />
                  </View>
                  <Stack space={heightPixel(4)} w="100%" alignItems="center">
                    <View>
                      <Input
                        name="First_Name"
                        width="100%"
                        py={Platform.OS == 'ios' ? 4 : inputSize.size}
                        color={theme.colors[schema].text}
                        autoCapitalize="none"
                        onChangeText={handleChange('First_Name')}
                        onBlur={handleBlur('First_Name')}
                        value={values.First_Name}
                        placeholder={String.FirstName}
                        fontSize={fontPixel(16)}
                        borderRadius={heightPixel(16)}
                        focusOutlineColor={'green.500'}
                        placeholderTextColor={theme.colors[schema].placeHolder}
                      />
                      {errors.First_Name && touched.First_Name && (
                        <View style={styles({schema}).errorDisplayContainer}>
                          <Icon
                            as={<MaterialIcons name={'error'} />}
                            size="3"
                            mr={1}
                            mt={1}
                            ml={2}
                            color="#FF0000"
                          />
                          <Text style={styles({schema}).errorText}>
                            {errors.First_Name}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View>
                      <Input
                        name="Last_Name"
                        width="100%"
                        py={Platform.OS == 'ios' ? 4 : inputSize.size}
                        onChangeText={handleChange('Last_Name')}
                        onBlur={handleBlur('Last_Name')}
                        value={values.Last_Name}
                        color={theme.colors[schema].text}
                        focusOutlineColor={'green.500'}
                        autoCapitalize="none"
                        placeholder={String.LastName}
                        fontSize={fontPixel(16)}
                        borderRadius={heightPixel(16)}
                        placeholderTextColor={theme.colors[schema].placeHolder}
                      />
                      {errors.Last_Name && touched.Last_Name && (
                        <View style={styles({schema}).errorDisplayContainer}>
                          <Icon
                            as={<MaterialIcons name={'error'} />}
                            size="3"
                            mr={1}
                            ml={2}
                            mt={1}
                            color="#FF0000"
                          />
                          <Text style={styles({schema}).errorText}>
                            {errors.Last_Name}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View>
                      <Input
                        name="MobileNo"
                        width="100%"
                        py={Platform.OS == 'ios' ? 4 : inputSize.size}
                        color={theme.colors[schema].text}
                        autoCapitalize="none"
                        placeholder={String.MobileNo}
                        focusOutlineColor={'green.500'}
                        fontSize={fontPixel(16)}
                        borderRadius={heightPixel(16)}
                        keyboardType={'number-pad'}
                        onChangeText={handleChange('MobileNo')}
                        onBlur={handleBlur('MobileNo')}
                        value={values.MobileNo}
                        placeholderTextColor={theme.colors[schema].placeHolder}
                      />
                      {errors.MobileNo && touched.MobileNo && (
                        <View style={styles({schema}).errorDisplayContainer}>
                          <Icon
                            as={<MaterialIcons name={'error'} />}
                            size="3"
                            mr={1}
                            ml={2}
                            mt={1}
                            color="#FF0000"
                          />
                          <Text style={styles({schema}).errorText}>
                            {errors.MobileNo}
                          </Text>
                        </View>
                      )}
                    </View>
                  </Stack>
                  <View style={styles({schema}).button}>
                    <CustomButton
                      title={String.Next}
                      // onPress={() => {
                      //   navigation.navigate(Screens.PaymentMethodScreen);
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

export default UserBioDataScreen;
