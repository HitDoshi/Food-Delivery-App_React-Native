import {moderateScale} from '../scale/scaling';
import {Dimensions} from 'react-native';
import {Log} from '../common/displayLog';

const {width, height} = Dimensions.get('window');

Log({msg: 'Device Info:- ' + width + ' x ' + height});

/* eslint-disable prettier/prettier */
// export const size = [moderateScale(4),moderateScale(8), moderateScale(12),
//      moderateScale(14),moderateScale(16),moderateScale(20),
//      moderateScale(22), moderateScale(24), moderateScale(28),
//      moderateScale(32), moderateScale(36), moderateScale(40),
//      moderateScale(44), moderateScale(48), moderateScale(54)];
                //   0, 1, 2,  3,  4,  5,  6,   7,  8,  9, 10, 11, 12, 13, 14
export const size = [4,8,12,14,16,20,22,24,28,32,36,40,44,48,54];

export const inputSize = {

    size : height <= 480 ? 1 :
            height > 480 && height <= 600 ? 2 :
            height > 600 && height <= 840 ? 3 : 4 ,
};
