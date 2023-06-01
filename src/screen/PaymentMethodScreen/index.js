import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import {Screens} from '../../common/screen';
import {Input, Icon, Stack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme';
import CustomText from '../../component/CustomText';
import {fontPixel, heightPixel} from '../../scale/scaling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Key} from '../../common/storagekey';

const PaymentMethodScreen = ({navigation}) => {
  const [selected, setSelect] = useState(0);
  const scheme = useColorScheme();
  const paymentMethod = [Images.PayPal, Images.Visa, Images.Payonner];
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({scheme}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({scheme}).paymentMethod_container}>
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
              SIZE={fontPixel(24)}
              LINE_HEIGHT={heightPixel(32)}
              TEXT={String.Payment_Method}
              FAMILY={theme.fonts.BentonSans_Bold}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
          </View>
          <View>
            <CustomText
              SIZE={fontPixel(14)}
              LINE_HEIGHT={heightPixel(22)}
              TEXT={String.Security_D1}
              FAMILY={theme.fonts.BentonSans_Book}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            <CustomText
              SIZE={fontPixel(14)}
              LINE_HEIGHT={heightPixel(22)}
              TEXT={String.Security_D2}
              FAMILY={theme.fonts.BentonSans_Book}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
          </View>
          <Stack space={heightPixel(4)} w="100%" alignItems="center">
            {paymentMethod.map(function (element, id) {
              return (
                <TouchableOpacity
                  key={id}
                  style={[
                    styles({scheme}).paymentMethod_Img_Container,
                    selected == id && {backgroundColor: 'skyblue'},
                  ]}
                  onPress={() => setSelect(id)}>
                  <Image source={element} style={styles({scheme}).img} />
                </TouchableOpacity>
              );
            })}
          </Stack>
          <View style={styles({scheme}).button}>
            <CustomButton
              title={String.Next}
              onPress={async () => {
                const jsonValue = JSON.stringify(selected);
                await AsyncStorage.setItem(Key.PaymentMethod, jsonValue);
                console.log(
                  'Payment Method:- ',
                  await AsyncStorage.getItem(Key.PaymentMethod),
                );
                navigation.navigate(Screens.UploadPhotoScreen);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentMethodScreen;
