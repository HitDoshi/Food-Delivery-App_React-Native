import {
  View,
  ImageBackground,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import {SafeAreaView} from 'react-native';
import {Images} from '../../common/images';
import CustomText from '../../component/CustomText';
import {theme} from '../../theme';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {styles} from './style';
import {Icon, Input} from 'native-base';
import {String} from '../../common/strings';
import CustomButton from '../../component/CustomButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {inputSize} from '../../theme/sizes';

const Type = ['Restaurant', 'Menu'];
const Location = ['1 Km', '>10 Km', '<10 Km'];
const Food = [
  'Cake',
  'Soup',
  'Main Course',
  'Appetizer',
  'Dessert',
  ' Pizza',
  'Burger',
];

const SearchScreen = () => {
  const schema = useColorScheme();
  const [type, setType] = useState('Restaurant');
  const [location, setLocation] = useState(1);
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({schema}).rootContainer}>
          <View style={styles({schema}).topContainer}>
            <View style={styles({schema}).titleContainer}>
              <CustomText
                TEXT={String.Find_Your}
                FAMILY={theme.fonts.BentonSans_Bold}
                COLOR={theme.colors[schema].text}
                SIZE={fontPixel(32)}
                CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
              />
              <CustomText
                TEXT={String.Favourite_Food}
                FAMILY={theme.fonts.BentonSans_Bold}
                COLOR={theme.colors[schema].text}
                SIZE={fontPixel(32)}
                CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
              />
            </View>
            <TouchableOpacity
              style={styles({schema}).notificationIconContainer}>
              <Image
                source={Images.Notification}
                style={styles({schema}).notificationIcon}
              />
            </TouchableOpacity>
          </View>
          <SearchBar schema={schema} />

          <ScrollView showsVerticalScrollIndicator={false} style={{gap: 20}}>
            <View style={{gap: heightPixel(20), marginBottom: 100}}>
              <View style={styles({schema}).menuContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    TEXT={String.Type}
                    FAMILY={theme.fonts.BentonSans_Bold}
                    SIZE={fontPixel(16)}
                  />
                </View>
                <DisplayTopic schema={schema} topic={Type} />
              </View>
              <View style={styles({schema}).menuContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    TEXT={String.Location}
                    FAMILY={theme.fonts.BentonSans_Bold}
                    SIZE={fontPixel(16)}
                  />
                </View>
                <DisplayTopic schema={schema} topic={Location} />
              </View>
              <View style={styles({schema}).menuContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    TEXT={String.Food}
                    FAMILY={theme.fonts.BentonSans_Bold}
                    SIZE={fontPixel(16)}
                  />
                </View>
                <DisplayTopic schema={schema} topic={Food} />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles({schema}).buttonContainer}>
          <CustomButton
            title={String.Search}
            style={{width: widthPercentageToDP('90%')}}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const DisplayTopic = ({topic, schema}) => {
  return (
    <View style={styles({schema}).topicContainer}>
      {topic.map(element => {
        return (
          <TouchableOpacity style={styles({schema}).topic}>
            <CustomText
              TEXT={element}
              CUSTOM_STYLE={{alignSelf: 'flex-start', textAlign: 'left'}}
              SIZE={fontPixel(14)}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const SearchBar = ({schema}) => {
  return (
    <View style={styles({schema}).searchBarContainer}>
      <Input
        placeholder={String.Search_Hint}
        width="100%"
        py={Platform.OS == 'ios' ? 4 : inputSize.size}
        borderRadius={16}
        fontSize={14}
        alignSelf="flex-start"
        autoCapitalize="none"
        InputLeftElement={
          <Icon
            ml="3"
            size={heightPixel(6)}
            as={<Image source={Images.Search_Icon} />}
          />
        }
      />
    </View>
  );
};
export default SearchScreen;
