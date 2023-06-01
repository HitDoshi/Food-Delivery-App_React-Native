import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Screens} from '../../common/screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Key} from '../../common/storagekey';
import {Log} from '../../common/displayLog';

const RenderScreen = ({navigation}) => {
  useEffect(() => {
    async function routing() {
      let IsFirstTime = await AsyncStorage.getItem(Key.IsFirstTime);
      let IsLogin = await AsyncStorage.getItem(Key.IsLogin);
      Log({msg: `IsFirstTime Launch: ${IsFirstTime}`});
      IsFirstTime = JSON.parse(IsFirstTime);
      IsLogin = JSON.parse(IsLogin);
      if (IsFirstTime || IsFirstTime == null) {
        navigation.replace(Screens.FeatureScreen1, {
          // title: String.Order_Completed,
          // desc: 'Please rate your last Driver',
          // img: Images.Restaurant_2,
          // name: 'Hit Doshi',
          // number: '9999999999',
          // img: Images.Profile_Img,
        });
      } else if (IsLogin) {
        navigation.replace(Screens.BottomTab);
      } else {
        navigation.replace(Screens.SignInScreen);
      }
    }
    routing();
  }, []);
};

export default RenderScreen;

const styles = StyleSheet.create({});
