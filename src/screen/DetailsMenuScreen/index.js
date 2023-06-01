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
import React, {useState, useRef, useMemo, useCallback} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import CustomText from '../../component/CustomText';
import {String} from '../../common/strings';
import {theme} from '../../theme';
import {Icon, Input, useToast} from 'native-base';
import {FlatList} from 'react-native-gesture-handler';
import {fontPixel, heightPixel, widthPixel} from '../../scale/scaling';
import {Screens} from '../../common/screen';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CustomButton from '../../component/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {favItem} from '../../redux/favSlice';

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

const menuData = [
  {
    id: 1,
    icon: Images.menu_1,
    name: 'Herbal Pancake',
    desc: 'Warung herbal',
    price: 7,
  },
  {
    id: 2,
    icon: Images.menu_2,
    name: 'Fruit Salad',
    desc: 'Wijie Resto',
    price: 5,
  },
  {
    id: 3,
    icon: Images.menu_3,
    name: 'Green Noddle',
    desc: 'Noodle Home',
    price: 15,
  },
];

const Ratting = [
  {
    id: 1,
    dp: Images.Profile_Img,
    name: 'Dianne Russell',
    date: '12 April 2021',
    ratting: '5',
    review: 'This Is great, So delicious! You Must Here, With Your family . . ',
  },
  {
    id: 2,
    dp: Images.Profile,
    name: 'Dianne Aman',
    date: '18 April 2021',
    ratting: '5',
    review: 'This Is great, So delicious! You Must Here, With Your family . . ',
  },
];

const DetailsMenuScreen = ({navigation, route}) => {
  const {data} = route.params;
  const schema = useColorScheme();
  const sheetRef = useRef();

  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.cart);

  const itemInCart = cart.find(item => item.id === data.id);

  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  // render
  const renderItem = useCallback(
    item => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );
  const toast = useToast();
  return (
    <View style={styles({schema}).rootContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}
        style={styles({schema}).backIcon}>
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
        <Image source={data.icon} style={styles({schema}).rootImg} />
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
          <UserData navigation={navigation} data={data} />
        </BottomSheetScrollView>
      </BottomSheet>
      <CustomButton
        title={String.Add_To_Chart}
        style={styles({schema}).cartButton}
        onPress={() => {
          dispatch(addToCart(data));
          itemInCart
            ? toast.show({
                title: 'Already added to cart',
                duration: 1500,
              })
            : toast.show({
                title: 'Added to cart',
                duration: 1500,
              });
        }}
      />
    </View>
  );
};

const UserData = ({navigation, data}) => {
  const schema = useColorScheme();
  const dispatch = useDispatch();

  const {favList} = useSelector(state => state.favList);
  const itemInFav = favList.find(item => item.id === data.id);

  return (
    <View style={styles({schema}).bottomSheet_Container}>
      <View style={styles({schema}).headerContainer}>
        <View style={styles({schema}).goldMemberText}>
          <CustomText
            TEXT={String.Popular}
            FAMILY={theme.fonts.BentonSans_Medium}
            SIZE={fontPixel(12)}
            COLOR={'green'}
          />
        </View>
        <View style={styles({schema}).headerRightPart}>
          <Image
            source={Images.MapPin_Icon}
            style={styles({schema}).headerImg}
          />
          {/* <Image
              source={Images.Fav_Icon}
              style={styles({schema}).headerImg}
            /> */}
          <TouchableOpacity
            onPress={() => {
              dispatch(favItem(data));
            }}>
            <MaterialIcons
              name={itemInFav ? 'heart' : 'heart-o'}
              color="red"
              size={widthPixel(22)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles({schema}).userNameContainer}>
        <CustomText
          TEXT={data.name}
          SIZE={heightPixel(28)}
          FAMILY={theme.fonts.BentonSans_Bold}
          LINE_HEIGHT={heightPixel(36)}
        />
      </View>
      <View style={styles({schema}).ratting_distance}>
        <View style={styles({schema}).row}>
          <Image source={Images.Star_Icon} style={styles({schema}).headerImg} />
          <CustomText
            TEXT={'4.8 Ratting'}
            SIZE={fontPixel(14)}
            LINE_HEIGHT={heightPixel(14)}
          />
        </View>
        <View style={styles({schema}).row}>
          <Image
            source={Images.ShoppingBag}
            style={styles({schema}).headerImg}
          />
          <CustomText
            TEXT={'2000+ Order'}
            SIZE={heightPixel(14)}
            LINE_HEIGHT={heightPixel(14)}
          />
        </View>
      </View>
      <CustomText
        TEXT={String.Restaurant_Detail}
        SIZE={fontPixel(12)}
        LINE_HEIGHT={heightPixel(22)}
        FAMILY={theme.fonts.BentonSans_Book}
        CUSTOM_STYLE={{textAlign: 'left'}}
      />
      <CustomText
        TEXT={data.detail}
        CUSTOM_STYLE={{textAlign: 'left'}}
        SIZE={fontPixel(12)}
        LINE_HEIGHT={heightPixel(22)}
      />
      <RattingList />
    </View>
  );
};

const PopularMenuList = ({schema, navigation}) => {
  const [scrollHorizontal, setscrollHorizontal] = useState(true);

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomText
          TEXT={String.Popular_Menu}
          FAMILY={theme.fonts.BentonSans_Bold}
          SIZE={fontPixel(16)}
        />
        <TouchableOpacity
          onPress={() => {
            setscrollHorizontal(!scrollHorizontal);
          }}>
          <CustomText
            TEXT={scrollHorizontal ? String.View_More : String.Less}
            FAMILY={theme.fonts.BentonSans_Book}
            SIZE={fontPixel(12)}
            COLOR={'orange'}
          />
        </TouchableOpacity>
      </View>
      {scrollHorizontal ? (
        <FlatList
          key={'h'}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={menuData}
          renderItem={({item}) => (
            <MenuBox data={item} scheme={schema} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
          style={styles(schema).flateList}
        />
      ) : (
        <FlatList
          key={'v'}
          numColumns={2}
          scrollEnabled={false}
          data={menuData}
          renderItem={({item}) => <MenuBox data={item} scheme={schema} />}
          keyExtractor={item => item.id}
          style={styles(schema).flateList}
        />
      )}
    </View>
  );
};

const MenuBox = ({data, schema, navigation}) => {
  return (
    <TouchableOpacity
      style={styles({schema}).box}
      onPress={() => {
        navigation.navigate(Screens.DetailsRestaurantScreen, {
          data,
        });
      }}>
      <View style={styles({schema}).boxImage}>
        <Image source={data.icon} style={styles({schema}).image1} />
        <View style={styles({schema}).boxText}>
          <CustomText TEXT={data.name} FAMILY={theme.fonts.BentonSans_Medium} />
          <CustomText
            TEXT={data.price}
            FAMILY={theme.fonts.BentonSans_Book}
            SIZE={fontPixel(14)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RattingBox = ({data, schema}) => {
  return (
    <View style={styles({schema}).rattingContainer}>
      <View style={styles({schema}).leftPart}>
        <View>
          <Image source={data.dp} style={styles({schema}).image2} />
        </View>
        <View style={{gap: heightPixel(8)}}>
          <View style={styles({schema}).ratting}>
            <View style={styles({schema}).rattingName}>
              <CustomText
                TEXT={data.name}
                FAMILY={theme.fonts.BentonSans_Bold}
                SIZE={fontPixel(14)}
              />
              <CustomText TEXT={data.date} SIZE={fontPixel(12)} />
            </View>
            <View style={styles({schema}).rattingImg}>
              <Image
                source={Images.Star_Icon}
                style={styles({schema}).starImg}
              />
              <CustomText
                TEXT={data.ratting}
                SIZE={fontPixel(16)}
                COLOR={'#53E88B'}
                LINE_HEIGHT={heightPixel(24)}
              />
            </View>
          </View>
          <CustomText
            TEXT={data.review}
            SIZE={fontPixel(12)}
            LINE_HEIGHT={heightPixel(18)}
            CUSTOM_STYLE={{
              width: widthPercentageToDP('60%'),
              textAlign: 'left',
            }}
          />
        </View>
      </View>
      <CustomText
        TEXT={data.price}
        FAMILY={theme.fonts.BentonSans_Bold}
        SIZE={fontPixel(22)}
        CUSTOM_STYLE={styles({schema}).priceText}
      />
    </View>
  );
};
const RattingList = () => {
  const [scrollHorizontal, setscrollHorizontal] = useState(true);
  const schema = useColorScheme();

  return (
    <View style={{gap: heightPixel(20)}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomText
          TEXT={String.Testimonials}
          FAMILY={theme.fonts.BentonSans_Bold}
          SIZE={fontPixel(16)}
        />
      </View>
      <FlatList
        scrollEnabled={false}
        data={Ratting}
        renderItem={({item}) => <RattingBox data={item} schema={schema} />}
        keyExtractor={item => item.id}
        style={styles(schema).flateList}
      />
    </View>
  );
};
export default DetailsMenuScreen;
