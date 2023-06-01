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
import {widthPercentageToDP} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from '../../redux/cartSlice';
import Swipeout from 'react-native-swipeout';

function percentage(num, per) {
  return parseFloat(((num / 100) * per).toFixed(2));
}

const OrderDetailsScreen = ({navigation}) => {
  const schema = useColorScheme();
  const dispatch = useDispatch();

  const {cart, totalAmount} = useSelector(state => state.cart);
  const delivery_charge = 1;
  const discount = percentage(totalAmount, 5);

  const total = totalAmount + delivery_charge + discount;
  console.log('Cart Data:- ', cart);
  // const orderList = [
  //   {
  //     id: 1,
  //     img: Images.menu_1,
  //     name: 'Spacy fresh crab',
  //     desc: 'Waroenk kita',
  //     price: '$ 35',
  //   },
  //   {
  //     id: 2,
  //     img: Images.menu_2,
  //     name: 'Spacy fresh crab',
  //     desc: 'Waroenk kita',
  //     price: '$ 35',
  //   },
  //   {
  //     id: 3,
  //     img: Images.menu_3,
  //     name: 'Spacy fresh crab',
  //     desc: 'Waroenk kita',
  //     price: '$ 35',
  //   },
  //   {
  //     id: 4,
  //     img: Images.menu_1,
  //     name: 'Spacy fresh crab',
  //     desc: 'Waroenk kita',
  //     price: '$ 35',
  //   },
  // ];
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({schema}).rootContainer}>
          <ScrollView
            style={{}}
            showsVerticalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}>
            <View
              style={{
                gap: heightPixel(20),
                marginBottom: 250,
                marginTop: 20,
              }}>
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
              <CustomText
                SIZE={fontPixel(24)} //24
                TEXT={String.Order_details}
                FAMILY={theme.fonts.BentonSans_Bold}
                CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
              />
              {cart.length > 0 && (
                <View style={{gap: heightPixel(20)}}>
                  {cart.map(element => {
                    const swipeBtns = [
                      {
                        text: 'Delete',
                        backgroundColor: '#FEAD1D',
                        onPress: () => {
                          dispatch(removeItem(element));
                        },
                      },
                    ];
                    return (
                      <Swipeout
                        right={swipeBtns}
                        autoClose="true"
                        key={element.id}
                        backgroundColor="transparent">
                        <View style={styles({schema}).orderContainer}>
                          <View>
                            <Image
                              source={element.icon}
                              style={styles({schema}).orderImg}
                            />
                          </View>
                          <View style={styles({schema}).textPart}>
                            <View style={styles({schema}).details}>
                              <CustomText
                                TEXT={element.name}
                                FAMILY={theme.fonts.BentonSans_Medium}
                                SIZE={heightPixel(15)}
                                LINE_HEIGHT={heightPixel(20)}
                                CUSTOM_STYLE={{flexWrap: 'wrap'}}
                              />
                              <CustomText
                                TEXT={element.desc}
                                SIZE={heightPixel(15)}
                              />
                              <CustomText
                                TEXT={'$ ' + element.price}
                                FAMILY={theme.fonts.BentonSans_Bold}
                                SIZE={heightPixel(20)}
                                LINE_HEIGHT={heightPixel(24)}
                                COLOR={'#53E88B'}
                              />
                            </View>
                            <View style={styles({schema}).imgContainer}>
                              <TouchableOpacity
                                onPress={() => {
                                  dispatch(decrementQuantity(element.id));
                                }}>
                                <Image
                                  source={Images.Minus_Icon}
                                  style={styles({schema}).fun_Img}
                                />
                              </TouchableOpacity>
                              <CustomText
                                TEXT={element.quantity}
                                SIZE={fontPixel(16)}
                              />
                              <TouchableOpacity
                                onPress={() => {
                                  dispatch(incrementQuantity(element.id));
                                }}>
                                <Image
                                  source={Images.Plus_Icon}
                                  style={styles({schema}).fun_Img}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Swipeout>
                    );
                  })}
                </View>
              )}
            </View>
          </ScrollView>

          {cart.length > 0 ? (
            <View>
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
                    TEXT={totalAmount + ' $'}
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
                    onPress={() =>
                      navigation.navigate(Screens.ConfirmOrderScreen, {
                        sub_total: totalAmount,
                        delivery_charge,
                        discount,
                        total,
                      })
                    }>
                    <CustomText
                      TEXT={String.Place_My_Order}
                      FAMILY={theme.fonts.BentonSans_Medium}
                      COLOR={'lightgreen'}
                      SIZE={heightPixel(14)}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          ) : null}
        </View>
        {cart.length <= 0 && (
          <CustomText
            TEXT={String.Cart_Empty}
            SIZE={fontPixel(22)}
            COLOR={'#53E88B'}
            FAMILY={theme.fonts.BentonSans_Book}
            CUSTOM_STYLE={{flex: 1.5}}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default OrderDetailsScreen;
