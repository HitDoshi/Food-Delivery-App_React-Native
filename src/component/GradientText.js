import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import {theme} from '../theme';

const GradientText = props => {
  return (
    <MaskedView
      maskElement={
        <CustomText
          TEXT={props.TEXT}
          SIZE={props.SIZE}
          LINE_HEIGHT={props.LINE_HEIGHT}
          FAMILY={props.FAMILY}
          COLOR={props.COLOR}
        />
      }>
      <LinearGradient
        colors={['red', 'green']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <CustomText {...props} />
      </LinearGradient>
    </MaskedView>
  );
};
export default GradientText;
