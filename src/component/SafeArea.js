import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SafeArea = ({children}) => (
  <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
);

export default SafeArea;

const styles = StyleSheet.create({});
