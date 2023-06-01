import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import CustomText from '../../component/CustomText';
import {String} from '../../common/strings';
import {theme} from '../../theme';
import {Icon, Input} from 'native-base';
import {FlatList} from 'react-native-gesture-handler';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {Screens} from '../../common/screen';
import {inputSize} from '../../theme/sizes';

const RestaurantData = [
  {
    id: 1,
    icon: Images.Restaurant_1,
    name: 'Vegan Resto',
    time: '12 Mins',
  },
  {
    id: 2,
    icon: Images.Restaurant_2,
    name: 'Healthy Food',
    time: '8 Mins',
  },
  {
    id: 3,
    icon: Images.Restaurant_3,
    name: 'Good Food',
    time: '12 Mins',
  },
  {
    id: 4,
    icon: Images.Restaurant_4,
    name: 'Smart Resto',
    time: '8 Mins',
  },
  {
    id: 5,
    icon: Images.Restaurant_5,
    name: 'Vegan Resto',
    time: '12 Mins',
  },
  {
    id: 6,
    icon: Images.Restaurant_6,
    name: 'Healthy Food',
    time: '8 Mins',
  },
];

const menuData = [
  {
    id: 1,
    icon: Images.menu_1,
    name: 'Herbal Pancake',
    desc: 'Warung herbal',
    price: 7,
    detail: `Nulla occaecat velit laborum exercitation ullamco. Elit labore eu aute elit nostrud culpa velit excepteur deserunt sunt. Velit non est cillum consequat cupidatat ex Lorem laboris labore aliqua ad duis eu laborum.

Strowberry
Cream
wheat`,
  },
  {
    id: 2,
    icon: Images.menu_2,
    name: 'Fruit Salad',
    desc: 'Wijie Resto',
    price: 5,
    detail: `Nulla occaecat velit laborum exercitation ullamco. Elit labore eu aute elit nostrud culpa velit excepteur deserunt sunt. Velit non est cillum consequat cupidatat ex Lorem laboris labore aliqua ad duis eu laborum.

Strowberry
Cream
wheat`,
  },
  {
    id: 3,
    icon: Images.menu_3,
    name: 'Green Noddle',
    desc: 'Noodle Home',
    price: 15,
    detail: `Nulla occaecat velit laborum exercitation ullamco. Elit labore eu aute elit nostrud culpa velit excepteur deserunt sunt. Velit non est cillum consequat cupidatat ex Lorem laboris labore aliqua ad duis eu laborum.

Strowberry
Cream
wheat`,
  },
];

const HomeScreen = ({navigation}) => {
  const [menu, setMenu] = useState(menuData);
  const [restaurantDisplay, setRestaurantDisplay] = useState(true);
  const scheme = useColorScheme();
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({scheme}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
        <ScrollView style={{paddingBottom: 20}}>
          <View style={styles({scheme}).rootContainer}>
            <View style={styles({scheme}).topContainer}>
              <View style={styles({scheme}).titleContainer}>
                <CustomText
                  TEXT={String.Find_Your}
                  FAMILY={theme.fonts.BentonSans_Bold}
                  COLOR={theme.colors[scheme].text}
                  SIZE={fontPixel(32)}
                  CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
                />
                <CustomText
                  TEXT={String.Favourite_Food}
                  FAMILY={theme.fonts.BentonSans_Bold}
                  COLOR={theme.colors[scheme].text}
                  SIZE={fontPixel(32)}
                  CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
                />
              </View>
              <TouchableOpacity
                style={styles({scheme}).notificationIconContainer}>
                <Image
                  source={Images.Notification}
                  style={styles({scheme}).notificationIcon}
                />
              </TouchableOpacity>
            </View>
            <SearchBar
              scheme={scheme}
              navigation={navigation}
              menu={menu}
              setMenu={setMenu}
              setRestaurantDisplay={setRestaurantDisplay}
            />
            {restaurantDisplay ? (
              <RestaurantList scheme={scheme} navigation={navigation} />
            ) : null}
            <PopularMenuList navigation={navigation} menu={menu} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const SearchBar = ({
  scheme,
  navigation,
  menu,
  setMenu,
  setRestaurantDisplay,
}) => {
  return (
    <View style={styles({scheme}).searchBarContainer}>
      <Input
        placeholder={String.Search_Hint}
        width="80%"
        py={Platform.OS == 'ios' ? 4 : inputSize.size}
        color={theme.colors[scheme].text}
        borderRadius={heightPixel(16)}
        fontSize={fontPixel(14)}
        alignSelf="flex-start"
        autoCapitalize="none"
        focusOutlineColor={'#DA6317'}
        onChangeText={text => {
          if (text == '' || text == null) {
            setMenu(menuData);
            setRestaurantDisplay(true);
          } else {
            const data = menuData.filter(element => {
              return element.name.toLowerCase().match(text.toLowerCase());
            });
            setMenu(data);
            setRestaurantDisplay(false);
          }
        }}
        InputLeftElement={
          <Icon
            ml="3"
            size={heightPixel(6)}
            as={<Image source={Images.Search_Icon} />}
          />
        }
      />
      <TouchableOpacity
        style={styles({scheme}).filterIconContainer}
        onPress={() => {
          navigation.navigate(Screens.SearchScreen);
        }}>
        <Image source={Images.Filter} style={styles({scheme}).filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const RestaurantList = ({scheme, navigation}) => {
  const [scrollHorizontal, setscrollHorizontal] = useState(true);

  return (
    <View style={styles({scheme}).restauranlistContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomText
          TEXT={String.Nearest_Restaurant}
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
          data={RestaurantData}
          renderItem={({item}) => (
            <RestaurantBox
              data={item}
              scheme={scheme}
              navigation={navigation}
            />
          )}
          keyExtractor={item => item.id}
          style={styles(scheme).flateList}
        />
      ) : (
        <FlatList
          key={'v'}
          numColumns={2}
          scrollEnabled={false}
          data={RestaurantData}
          renderItem={({item}) => (
            <RestaurantBox
              data={item}
              scheme={scheme}
              navigation={navigation}
            />
          )}
          keyExtractor={item => item.id}
          style={styles(scheme).flateList}
        />
      )}
    </View>
  );
};

const RestaurantBox = ({data, scheme, navigation}) => {
  return (
    <TouchableOpacity
      style={styles({scheme}).box}
      onPress={() => {
        navigation.navigate(Screens.DetailsRestaurantScreen, {
          data,
        });
      }}>
      <View style={styles({scheme}).boxImage}>
        <Image source={data.icon} style={styles({scheme}).image1} />
      </View>
      <View style={styles({scheme}).boxText}>
        <CustomText TEXT={data.name} FAMILY={theme.fonts.BentonSans_Bold} />
        <CustomText TEXT={data.time} FAMILY={theme.fonts.BentonSans_Book} />
      </View>
    </TouchableOpacity>
  );
};

const PopularMenuBox = ({data, scheme, navigation}) => {
  return (
    <TouchableOpacity
      style={styles({scheme}).menuBox}
      onPress={() => {
        navigation.navigate(Screens.DetailsMenuScreen, {
          data,
        });
      }}>
      <View style={styles({scheme}).leftPart}>
        <View>
          <Image source={data.icon} style={styles({scheme}).image2} />
        </View>
        <View style={styles({scheme}).boxText2}>
          <CustomText
            TEXT={data.name}
            FAMILY={theme.fonts.BentonSans_Medium}
            SIZE={fontPixel(15)}
          />
          <CustomText
            TEXT={data.desc}
            FAMILY={theme.fonts.BentonSans_Book}
            SIZE={fontPixel(14)}
          />
        </View>
      </View>
      <CustomText
        TEXT={'$' + data.price}
        FAMILY={theme.fonts.BentonSans_Bold}
        SIZE={fontPixel(22)}
        CUSTOM_STYLE={styles({scheme}).priceText}
      />
    </TouchableOpacity>
  );
};
const PopularMenuList = ({navigation, menu}) => {
  const [scrollHorizontal, setscrollHorizontal] = useState(true);
  const scheme = useColorScheme();

  return (
    <View style={styles({scheme}).restauranlistContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: heightPixel(12),
        }}>
        <CustomText
          TEXT={String.Popular_Menu}
          FAMILY={theme.fonts.BentonSans_Bold}
          SIZE={fontPixel(16)}
        />
      </View>
      <FlatList
        scrollEnabled={false}
        data={menu}
        renderItem={({item}) => (
          <PopularMenuBox data={item} scheme={scheme} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        style={styles(scheme).flateList}
      />
    </View>
  );
};
export default HomeScreen;
