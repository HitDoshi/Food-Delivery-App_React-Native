import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {widthPercentageToDP} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Key} from '../../common/storagekey';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { removeAllItem, removeItem } from '../../redux/cartSlice';

const ConfirmOrderScreen = ({navigation, route}) => {
  const schema = useColorScheme();
  const {sub_total, delivery_charge, discount, total} = route.params;
  const paymentMethod = [Images.PayPal, Images.Visa, Images.Payonner];
  const [PayMethod, setPayMethod] = useState(0);
  useFocusEffect(() => {
    async function readData() {
      const method = await AsyncStorage.getItem(Key.PaymentMethod);
      setPayMethod(method);
    }

    readData();
  });
  const dispatch = useDispatch();
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({schema}).rootContainer}>
          <View style={{gap: heightPixel(20)}}>
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
              LINE_HEIGHT={heightPixel(32)}
              TEXT={String.Confirm_Order}
              FAMILY={theme.fonts.BentonSans_Bold}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            <View style={styles({schema}).container}>
              <View style={styles({schema}).title}>
                <CustomText
                  TEXT={String.Deliver_To}
                  SIZE={fontPixel(14)} //24
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Screens.SetMapLocationScreen)
                  }>
                  <CustomText
                    TEXT={String.Edit}
                    COLOR={'#15BE77'}
                    SIZE={fontPixel(14)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles({schema}).dataContainer}>
                <Image
                  source={Images.Map_Pin_Img}
                  style={styles({schema}).img}
                />
                <CustomText
                  TEXT={'4517 Washington Ave. Manchester, Kentucky 39495'}
                  SIZE={fontPixel(15)}
                  LINE_HEIGHT={heightPixel(20)}
                  FAMILY={theme.fonts.BentonSans_Medium}
                  CUSTOM_STYLE={{
                    flexWrap: 'wrap',
                    width: '85%',
                    textAlign: 'left',
                  }}
                />
              </View>
            </View>
            <View style={styles({schema}).container}>
              <View style={styles({schema}).title}>
                <CustomText TEXT={String.Payment_Method} SIZE={fontPixel(14)} />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Screens.EditPaymentDetailsScreen)
                  }>
                  <CustomText
                    TEXT={String.Edit}
                    COLOR={'#15BE77'}
                    SIZE={fontPixel(14)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles({schema}).dataContainer2}>
                <Image
                  source={paymentMethod[PayMethod]}
                  style={styles({schema}).img2}
                />
                <CustomText
                  TEXT={'2121 6352 8465 ****'}
                  SIZE={fontPixel(15)}
                  LINE_HEIGHT={heightPixel(20)}
                  FAMILY={theme.fonts.BentonSans_Medium}
                  CUSTOM_STYLE={{flexWrap: 'wrap'}}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 0,
              alignSelf: 'center',
            }}>
            <ImageBackground source={Images.BackGroung3} style={{}}>
              <LinearGradient
                colors={theme.colors[schema].green_gradient}
                style={[styles({schema}).priceBox]}>
                <View style={styles({schema}).textBoxContainer}>
                  <CustomText
                    TEXT={String.Sub_Total}
                    FAMILY={theme.fonts.BentonSans_Medium}
                    COLOR={'white'}
                    SIZE={heightPixel(14)}
                  />
                  <CustomText
                    TEXT={sub_total + ' $'}
                    FAMILY={theme.fonts.BentonSans_Medium}
                    COLOR={'white'}
                    SIZE={heightPixel(14)}
                  />
                </View>

                <View style={styles({schema}).textBoxContainer}>
                  <CustomText
                    TEXT={String.Delivery_Charge}
                    FAMILY={theme.fonts.BentonSans_Medium}
                    COLOR={'white'}
                    SIZE={heightPixel(14)}
                  />
                  <CustomText
                    TEXT={delivery_charge + ' $'}
                    FAMILY={theme.fonts.BentonSans_Medium}
                    COLOR={'white'}
                    SIZE={heightPixel(14)}
                  />
                </View>
                <View style={styles({schema}).textBoxContainer}>
                  <CustomText
                    TEXT={String.Discount}
                    FAMILY={theme.fonts.BentonSans_Medium}
                    COLOR={'white'}
                    SIZE={heightPixel(14)}
                  />
                  <CustomText
                    TEXT={discount + ' $'}
                    FAMILY={theme.fonts.BentonSans_Medium}
                    COLOR={'white'}
                    SIZE={heightPixel(14)}
                  />
                </View>
                <View
                  style={[
                    styles({schema}).textBoxContainer,
                    {marginVertical: heightPixel(8)},
                  ]}>
                  <CustomText
                    TEXT={String.Total}
                    FAMILY={theme.fonts.BentonSans_Medium}
                    COLOR={'white'}
                    SIZE={heightPixel(14)}
                  />
                  <CustomText
                    TEXT={total + ' $'}
                    FAMILY={theme.fonts.BentonSans_Medium}
                    COLOR={'white'}
                    SIZE={heightPixel(14)}
                  />
                </View>
                <View style={styles({schema}).orderButton}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.replace(Screens.TrackOrderScreen, {
                        title: String.Order_Completed,
                        desc: 'Please rate your last Driver',
                        img: Images.Profile_Img,
                        name: 'Hit Doshi',
                        number: '9999999999',
                      });
                      dispatch(removeAllItem());
                    }}>
                    <CustomText
                      TEXT={String.Place_My_Order}
                      FAMILY={theme.fonts.BentonSans_Medium}
                      COLOR={'lightgreen'}
                      SIZE={heightPixel(14)}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ConfirmOrderScreen;
