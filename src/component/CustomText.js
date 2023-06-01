import {theme} from '../theme';
import {StyleSheet, Text, useColorScheme} from 'react-native';
import React from 'react';

const default_style = StyleSheet.create({
  textStyle: {
    fontSize: theme.size[2],
    fontFamily: 'BentonSans-Book',
    flexWrap: 'wrap',
  },
});

const dark_family = StyleSheet.create({
  textStyle: {
    fontFamily: 'BentonSans-Bold',
  },
});

const small = StyleSheet.create({
  textStyle: {
    fontSize: theme.size[2],
  },
});

const normal = StyleSheet.create({
  textStyle: {
    fontSize: theme.size[3],
  },
});

const medium = StyleSheet.create({
  textStyle: {
    fontSize: theme.size[4],
  },
});

const lable = StyleSheet.create({
  textStyle: {
    fontSize: theme.size[5],
  },
});

const big_lable = StyleSheet.create({
  textStyle: {
    fontSize: theme.size[6],
  },
});

const heading = StyleSheet.create({
  textStyle: {
    fontSize: theme.size[7],
  },
});

const big_heading = StyleSheet.create({
  textStyle: {
    fontSize: theme.size[9],
  },
});

const logo = StyleSheet.create({
  textStyle: {
    fontSize: theme.size[11],
  },
});

export const variants = {
  small, //8
  normal, //14
  medium, //16
  lable, // 20
  big_lable, //22
  heading, // 24
  big_heading, //32
  logo, //40
  dark_family,
};

const CustomText = ({
  SIZE = theme.size[3],
  FAMILY = theme.fonts.BentonSans_Book,
  CUSTOM_STYLE,
  LINE_HEIGHT,
  TEXT,
  COLOR,
  UNDERLINE,
  ALIGN_SELF,
}) => {
  const schema = useColorScheme();
  return (
    <Text
      style={
        styles({
          SIZE,
          FAMILY,
          LINE_HEIGHT,
          CUSTOM_STYLE,
          COLOR,
          UNDERLINE,
          ALIGN_SELF,
          schema,
        }).textStyle
      }>
      {TEXT}
    </Text>
  );
};

const styles = ({
  SIZE,
  FAMILY,
  CUSTOM_STYLE,
  LINE_HEIGHT,
  COLOR = null,
  UNDERLINE,
  ALIGN_SELF,
  schema,
}) =>
  StyleSheet.create({
    textStyle: {
      flexWrap: 'wrap',
      textAlign: !ALIGN_SELF && 'center',
      alignSelf: ALIGN_SELF && 'flex-start',
      fontSize: SIZE,
      fontFamily: FAMILY,
      lineHeight: LINE_HEIGHT,
      color: COLOR == null ? theme.colors[schema].text : COLOR,
      textDecorationLine: UNDERLINE && 'underline',
      ...CUSTOM_STYLE,
    },
  });

export default CustomText;
