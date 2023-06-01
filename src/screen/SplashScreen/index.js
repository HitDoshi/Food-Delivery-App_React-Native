import {
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import {theme} from '../../theme';
import {String} from '../../common/strings';
import {Key} from '../../common/storagekey';
import {Log} from '../../common/displayLog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Screens} from '../../common/screen';
import CustomText from '../../component/CustomText';
import {fontPixel} from '../../scale/scaling';
import FeatureScreen1 from '../FeatureScreen_1';

const SplashScreen = ({navigation}) => {
  const schema = useColorScheme();
  // setTimeout(async () => {
  //   let IsFirstTime = await AsyncStorage.getItem(Key.IsFirstTime);
  //   let IsLogin = await AsyncStorage.getItem(Key.IsLogin);
  //   Log({msg: `IsFirstTime Launch: ${IsFirstTime}`});
  //   IsFirstTime = JSON.parse(IsFirstTime);
  //   IsLogin = JSON.parse(IsLogin);
  //   if (IsFirstTime || IsFirstTime == null) {
  //     navigation.replace(Screens.FeatureScreen1, {
  //       // title: String.Order_Completed,
  //       // desc: 'Please rate your last Driver',
  //       // img: Images.Restaurant_2,
  //       // name: 'Hit Doshi',
  //       // number: '9999999999',
  //       // img: Images.Profile_Img,
  //     });
  //   } else if (IsLogin) {
  //     navigation.replace(Screens.FeatureScreen1);
  //   } else {
  //     navigation.replace(Screens.FeatureScreen1);
  //   }
  // }, 3000);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={styles({schema}).imageBackground}>
        <LogoComponent />
      </ImageBackground>
    </SafeAreaView>
  );
};

const LogoComponent = () => {
  const schema = useColorScheme();
  return (
    <View style={styles({schema}).mainContainer}>
      <View style={styles({schema}).logoImageContainer}>
        <Image source={Images.Logo} style={styles({schema}).logoImage} />
      </View>
      <View style={styles({schema}).textPart}>
        <CustomText
          // COLOR={theme.colors[schema].text}
          SIZE={fontPixel(35)}
          TEXT={String.App_Title_1}
          FAMILY={theme.fonts.Viga_Regular}
          COLOR={'#53E88B'}
        />
        <CustomText
          COLOR={theme.colors[schema].text}
          SIZE={fontPixel(12)}
          TEXT={String.App_Title_2}
          FAMILY={theme.fonts.Inter}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
