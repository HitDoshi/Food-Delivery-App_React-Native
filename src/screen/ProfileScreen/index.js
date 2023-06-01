import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  Button,
  View,
} from 'react-native';
import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import CustomText from '../../component/CustomText';
import {String} from '../../common/strings';
import {theme} from '../../theme';
import {Icon, Input} from 'native-base';
import {FlatList} from 'react-native-gesture-handler';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {Screens} from '../../common/screen';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Key} from '../../common/storagekey';
import {useFocusEffect} from '@react-navigation/native';

const orderList = [
  {
    id: 1,
    img: Images.menu_1,
    name: 'Spacy fresh crab',
    desc: 'Waroenk kita',
    price: '$ 35',
  },
  {
    id: 2,
    img: Images.menu_2,
    name: 'Spacy fresh crab',
    desc: 'Waroenk kita',
    price: '$ 35',
  },
  {
    id: 3,
    img: Images.menu_3,
    name: 'Spacy fresh crab',
    desc: 'Waroenk kita',
    price: '$ 35',
  },
  {
    id: 4,
    img: Images.menu_1,
    name: 'Spacy fresh crab',
    desc: 'Waroenk kita',
    price: '$ 35',
  },
  {
    id: 5,
    img: Images.menu_2,
    name: 'Spacy fresh crab',
    desc: 'Waroenk kita',
    price: '$ 35',
  },
  {
    id: 6,
    img: Images.menu_2,
    name: 'Spacy fresh crab',
    desc: 'Waroenk kita',
    price: '$ 35',
  },
];

const ProfileScreen = ({navigation}) => {
  var schema = useColorScheme();
  console.log(schema);
  const sheetRef = useRef();
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  var imgPath = '';
  const [path, setPath] = useState(null);

  async function getProfileImg() {
    imgPath = await AsyncStorage.getItem(Key.Profile_Img);
    const parseData = JSON.parse(imgPath);

    if (parseData) {
      console.log('Path:- ', parseData.assets[0].uri);
      setPath(parseData.assets[0].uri);
    } else {
      setPath(null);
    }
  }

  useFocusEffect(() => {
    getProfileImg();
    console.log(imgPath);
  });

  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );

  return (
    <View style={styles({schema}).rootContainer}>
      <View>
        <Image
          source={path ? {uri: path} : Images.Profile_Img}
          style={styles({schema}).profileImg}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backgroundStyle={{
          borderRadius: 28,
          backgroundColor: schema == 'dark' ? 'black' : 'white',
        }}>
        <BottomSheetScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: heightPixel(100)}}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <UserData navigation={navigation} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const UserData = ({navigation}) => {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);

  const schema = useColorScheme();
  const {favList} = useSelector(state => state.favList);

  async function readData() {
    const mail = await AsyncStorage.getItem(Key.Email);
    setEmail(mail);

    const Name = await AsyncStorage.getItem(Key.UserName);
    setUserName(Name);

    console.log(userName);
  }

  useFocusEffect(() => {
    readData();
  });

  return (
    <View style={styles({schema}).bottomSheet_Container}>
      <View style={styles({schema}).goldMemberText}>
        <CustomText
          TEXT={String.Member_Gold}
          FAMILY={theme.fonts.BentonSans_Medium}
          SIZE={fontPixel(12)}
        />
      </View>
      <View style={styles({schema}).userNameContainer}>
        <View>
          <CustomText
            TEXT={userName}
            SIZE={heightPixel(28)}
            FAMILY={theme.fonts.BentonSans_Bold}
            LINE_HEIGHT={heightPixel(36)}
            CUSTOM_STYLE={{textAlign: 'left'}}
            COLOR={theme.colors[schema].text}
          />
          <CustomText
            TEXT={email}
            SIZE={heightPixel(14)}
            LINE_HEIGHT={heightPixel(22)}
            CUSTOM_STYLE={{textAlign: 'left'}}
            COLOR={theme.colors[schema].text}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.EditProfileScreen);
          }}>
          <Image
            source={Images.Edit_Pencil_Icon}
            style={styles({schema}).edit_pencile_icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Screens.VoucherScreen);
        }}>
        <View style={styles({schema}).voucherContainer}>
          <Image
            source={Images.Voucher_Icon}
            style={styles({schema}).voucherIcon}
          />
          <CustomText
            TEXT={'You Have 3 Voucher'}
            FAMILY={theme.fonts.BentonSans_Medium}
            SIZE={heightPixel(15)}
            LINE_HEIGHT={heightPixel(20)}
          />
        </View>
      </TouchableOpacity>
      {favList.length > 0 && (
        <View style={styles({schema}).favouriteContainer}>
          <CustomText
            TEXT={String.Favourite}
            SIZE={heightPixel(15)}
            FAMILY={theme.fonts.BentonSans_Bold}
            LINE_HEIGHT={heightPixel(20)}
          />
          {favList.map(element => {
            return (
              <View style={styles({schema}).orderContainer} key={element.id}>
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
                    <CustomText TEXT={element.desc} SIZE={heightPixel(14)} />
                    <CustomText
                      TEXT={'$ ' + element.price}
                      FAMILY={theme.fonts.BentonSans_Bold}
                      SIZE={heightPixel(20)}
                      LINE_HEIGHT={heightPixel(24)}
                      COLOR={'#53E88B'}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles({schema}).buyAgainButtom}
                  onPress={() => {
                    navigation.navigate(Screens.DetailsMenuScreen, {
                      data: element,
                    });
                  }}>
                  <CustomText
                    TEXT={String.Buy_Again}
                    SIZE={heightPixel(12)}
                    LINE_HEIGHT={heightPixel(12)}
                    FAMILY={theme.fonts.BentonSans_Medium}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
