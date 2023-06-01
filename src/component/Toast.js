import {View, Text} from 'react-native';
import React from 'react';
import {useToast} from 'native-base';

const Toast = ({title, variant = 'solid', desc, isClosable = false}) => {
  const toast = useToast();
  return toast.show({
    title: title,
    variant: variant,
    description: desc,
    isClosable: isClosable,
  });
};

export default Toast;
