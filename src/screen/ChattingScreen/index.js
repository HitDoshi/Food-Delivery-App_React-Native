import {
  ImageBackground,
  SafeAreaView,
  Image,
  useColorScheme,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './style';
import {Images} from '../../common/images';
import {theme} from '../../theme';
import CustomText from '../../component/CustomText';
import {String} from '../../common/strings';
import {Icon, Input} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {fontPixel, heightPixel} from '../../scale/scaling';
import {Screens} from '../../common/screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {inputSize} from '../../theme/sizes';

const ChattingScreen = ({navigation, route}) => {
  const schema = useColorScheme();
  const {id, name, desk, dp, time, status} = route.params.data;
  const [chat, setChat] = useState([
    {
      msg: 'Hello',
      from: 0,
    },
  ]);
  const [text, setText] = useState('');
  const scrollViewRef = useRef();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const flatList = React.useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  async function fetchRandomMsg() {
    const res = await fetch('https://api.adviceslip.com/advice');
    let data = await res.json();
    data = await data.slip.advice;
    console.log('Receive msg:- ', data);
    return data;
  }
  return (
    <>
      <ImageBackground
        source={Images.BackGroung2}
        style={styles({schema}).bg_img}
      />
      <SafeAreaView style={{flex: 1}}>
        {/* <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          stickyHeaderIndices={[1]}
          scrollEnabled={false}> */}
        <View style={styles({schema}).chattingScreen_container}>
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
              SIZE={fontPixel(24)} //25
              TEXT={String.Chat}
              FAMILY={theme.fonts.BentonSans_Bold}
            />
          </View>
          <View style={styles({schema}).userBox}>
            <Image source={dp} style={styles({schema}).bgImg} />
            <View
              style={{
                alignItems: 'flex-start',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View style={{gap: heightPixel(10), alignItems: 'flex-start'}}>
                  <CustomText
                    TEXT={name}
                    FAMILY={theme.fonts.BentonSans_Medium}
                    SIZE={heightPixel(15)}
                  />
                  <CustomText TEXT={status} SIZE={heightPixel(14)} />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(Screens.CallScreen, {
                      name: 'Hit Doshi',
                      number: '9664700000',
                      img: Images.Profile_Img,
                    });
                  }}>
                  <Image source={Images.Call} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{width: '100%', flex: 1}}>
            <FlatList
              data={chat}
              showsVerticalScrollIndicator={false}
              style={styles({schema}).scrollView}
              ref={flatList}
              onContentSizeChange={() => {
                flatList.current.scrollToEnd();
              }}
              renderItem={({item, index}) => (
                <ChatText
                  chat={item}
                  bgColor={item.from == 0 ? '#E8E8E8' : '#15BE77'}
                  position={item.from == 0 ? 'flex-start' : 'flex-end'}
                  textColor={item.from == 0 ? 'black' : 'white'}
                />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
          <View style={styles({schema}).chatBox}>
            <Input
              backgroundColor={'white'}
              py={Platform.OS == 'ios' ? 4 : inputSize.size}
              borderRadius={heightPixel(12)}
              multiline={true}
              value={text}
              onChangeText={text => {
                setText(text);
              }}
              InputRightElement={
                <Icon
                  as={
                    <TouchableOpacity
                      onPress={async () => {
                        if (text.trim() != '') {
                          setText(null);
                          setChat([...chat, {msg: text, from: 1}]);
                          const resMsg = await fetchRandomMsg();
                          setChat([
                            ...chat,
                            {msg: text, from: 1},
                            {msg: resMsg, from: 0},
                          ]);
                        }
                        flatList.current.scrollToEnd();
                      }}>
                      <Image source={Images.Send} />
                    </TouchableOpacity>
                  }
                  mr="4"
                  size={heightPixel(6)}
                />
              }
            />
          </View>
        </View>
        {/* </KeyboardAwareScrollView> */}
      </SafeAreaView>
    </>
  );
};

const ChatText = ({
  chat,
  bgColor = 'lightblue',
  position = 'flex-start',
  textColor = 'black',
}) => {
  return (
    <View
      style={{
        maxWidth: widthPercentageToDP('80%'),
        backgroundColor: bgColor,
        alignSelf: position,
        padding: heightPixel(14),
        borderRadius: heightPixel(12),
        alignItems: 'flex-start',
        marginVertical: heightPixel(5),
      }}>
      <CustomText
        TEXT={chat.msg}
        COLOR={textColor}
        SIZE={heightPixel(14)}
        CUSTOM_STYLE={{textAlign: 'left'}}
      />
    </View>
  );
};

export default ChattingScreen;
