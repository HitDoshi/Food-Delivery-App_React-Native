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

const NotificationScreen = ({navigation}) => {
  const schema = useColorScheme();
  const notification = [
    {
      id: 1,
      img: Images.Checked_Icon,
      msg: 'Your order has been taken by the driver',
      time: 'Recently',
    },
    {
      id: 2,
      img: Images.Cross_Icon,
      msg: 'Topup for $100 was successful',
      time: '10.00 Am',
    },
    {
      id: 3,
      img: Images.Money_Icon,
      msg: 'Your order has been canceled',
      time: '22 Juny 2021',
    },
  ];
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
        resizeMode={'contain'}
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
              TEXT={String.Notification}
              FAMILY={theme.fonts.BentonSans_Bold}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            {notification.map(element => {
              return (
                <TouchableOpacity>
                  <View style={styles({schema}).msgContainer}>
                    <Image source={element.img} style={styles({schema}).img} />
                    <View style={styles({schema}).textPart}>
                      <CustomText
                        TEXT={element.msg}
                        FAMILY={theme.fonts.BentonSans_Medium}
                        SIZE={heightPixel(16)}
                        LINE_HEIGHT={heightPixel(20)}
                        CUSTOM_STYLE={{
                          alignSelf: 'flex-start',
                          textAlign: 'left',
                          width: widthPercentageToDP('60%'),
                        }}
                      />
                      <CustomText
                        TEXT={element.time}
                        LINE_HEIGHT={heightPixel(14)}
                        CUSTOM_STYLE={{
                          alignSelf: 'flex-start',
                          textAlign: 'left',
                          flexWrap: 'wrap',
                        }}
                      />
                    </View>
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

export default NotificationScreen;
