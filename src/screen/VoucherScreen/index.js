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

const VoucherScreen = ({navigation}) => {
  const schema = useColorScheme();
  const offer = [
    {
      id: 1,
      img: Images.voucher_2,
      month: 'October',
      textColor: 'white',
      buttonColor: 'green',
      data: {
        id: 2,
        icon: Images.menu_2,
        name: 'Fruit Salad',
        desc: 'Wijie Resto',
        price: 5,
      },
    },
    {
      id: 2,
      img: Images.voucher_3,
      month: 'October',
      color: 'gray',
      buttonColor: 'gray',
      data: {
        id: 2,
        icon: Images.menu_1,
        name: 'Fruit Salad',
        desc: 'Wijie Resto',
        price: 5,
      },
    },
  ];
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles({schema}).rootContainer}>
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
              TEXT={String.Voucher_Promo}
              FAMILY={theme.fonts.BentonSans_Bold}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            {offer.map(element => {
              return (
                <TouchableOpacity key={element.id}>
                  <View style={styles({schema}).offerBg}>
                    <ImageBackground
                      source={element.img}
                      imageStyle={{borderRadius: heightPixel(16)}}
                      resizeMode={'stretch'}
                      style={styles({schema}).adsImg}>
                      <View style={styles({schema}).textPart}>
                        <CustomText
                          TEXT={String.Special_Deal_For}
                          SIZE={fontPixel(20)}
                          CUSTOM_STYLE={{alignSelf: 'flex-start'}}
                          COLOR={element.color}
                        />
                        <CustomText
                          TEXT={element.month}
                          SIZE={fontPixel(20)}
                          CUSTOM_STYLE={{alignSelf: 'flex-start'}}
                          COLOR={element.color}
                        />
                        <TouchableOpacity
                          style={styles({schema}).orderButtom}
                          onPress={() => {
                            navigation.navigate(Screens.DetailsMenuScreen, {
                              data: element.data,
                            });
                          }}>
                          <CustomText
                            TEXT={String.Order_Now}
                            SIZE={heightPixel(14)}
                            COLOR={element.buttonColor}
                          />
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default VoucherScreen;
