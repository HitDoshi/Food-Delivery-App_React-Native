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
import {fontPixel, heightPixel} from '../../scale/scaling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Key} from '../../common/storagekey';

const UploadPreviewScreen = ({navigation}) => {
  const [path, setPath] = useState(null);
  const [confirmShow, setConfirmShow] = React.useState(false);
  const schema = useColorScheme();
  var imgPath = '';

  async function getProfileImg() {
    imgPath = await AsyncStorage.getItem(Key.Profile_Img);
    const parseData = JSON.parse(imgPath);

    if (parseData) {
      console.log('Path:- ', parseData.assets[0].uri);
      setPath(parseData.assets[0].uri);
    }
  }

  useEffect(() => {
    getProfileImg();
  }, []);

  async function removePath() {
    await AsyncStorage.removeItem(Key.Profile_Img);
    // console.log(await AsyncStorage.getItem(Key.Profile_Img));
    console.log('Remove path successfully');
  }
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({schema}).uploadPhotoPreview_container}>
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
              TEXT={String.UploadPhoto_Screen_T1}
              FAMILY={theme.fonts.BentonSans_Bold}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
            />
            <CustomText
              SIZE={fontPixel(24)}
              LINE_HEIGHT={heightPixel(32)}
              TEXT={String.UploadPhoto_Screen_T2}
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
          <View style={styles({schema}).profileStyle_Container}>
            <Image
              source={path ? {uri: path} : Images.Profile_Img}
              style={styles({schema}).phofileImg}
            />
            <TouchableOpacity
              style={styles({schema}).closeIconButton}
              onPress={() => {
                removePath();
                navigation.navigate(Screens.UploadPhotoScreen);
              }}>
              <Image
                source={Images.Close_Icon}
                style={styles({schema}).closeIconImg}
              />
            </TouchableOpacity>
          </View>
          <View style={styles({schema}).button}>
            <CustomButton
              title={String.Next}
              onPress={() => {
                navigation.navigate(Screens.SetLocationScreen);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default UploadPreviewScreen;
