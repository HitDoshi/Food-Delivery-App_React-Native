import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {Images} from '../../common/images';
import {styles} from './style';
import CustomText from '../../component/CustomText';
import {String} from '../../common/strings';
import {theme} from '../../theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Screens} from '../../common/screen';
import {fontPixel, heightPixel} from '../../scale/scaling';

const ChatScreen = ({navigation}) => {
  const schema = useColorScheme();
  const user = [
    {
      id: 1,
      name: 'Anamwp',
      desk: 'Your Order Just Arrived!',
      dp: Images.menu_1,
      time: '20:00',
      status: 'Online',
    },
    {
      id: 2,
      name: 'Guy Hawkins',
      desk: 'Your Order Just Arrived!',
      dp: Images.menu_2,
      time: '20:00',
      status: 'Onfline',
    },
    {
      id: 3,
      name: 'Leslie Alexander',
      desk: 'Your Order Just Arrived!',
      dp: Images.menu_3,
      time: '20:00',
      status: 'Online',
    },
  ];
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles({schema}).chatContainer}>
          <CustomText
            TEXT={String.Chat}
            FAMILY={theme.fonts.BentonSans_Bold}
            SIZE={fontPixel(22)}
            CUSTOM_STYLE={{alignSelf: 'flex-start'}}
          />
          <FlatList
            data={user}
            renderItem={({item}) => (
              <UserList user={item} schema={schema} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const UserList = ({user, schema, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(Screens.ChattingScreen, {
          data: user,
        });
      }}>
      <View style={styles({schema}).userBox}>
        <Image source={user.dp} style={styles({schema}).dpImg} />
        <View style={{alignItems: 'flex-start', gap: heightPixel(10), flex: 1}}>
          <View style={{width: '100%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                TEXT={user.name}
                FAMILY={theme.fonts.BentonSans_Medium}
                SIZE={heightPixel(15)}
              />
              <CustomText TEXT={user.time} SIZE={heightPixel(14)} />
            </View>
          </View>
          <CustomText TEXT={user.desk} SIZE={heightPixel(14)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatScreen;
