import React, {ReactNode} from 'react';
import {Dimensions, SafeAreaView, ViewStyle} from 'react-native';
// import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StatusBar, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';

export const StatusBarHeight = getStatusBarHeight(true);
// export const StatusBarHeight =
//   Platform.OS === 'ios' ? -30 : StatusBar.currentHeight;
// export const StatusBarHeight =
//   Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

// export const windowWidth: number = Dimensions.get('window').width;
// export const windowHeight: number = Dimensions.get('window').height;

export const Safe = ({children, color = 'transparent'}) => {
  const safeAreaViewStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: color,
  };

  return <SafeAreaView style={safeAreaViewStyle}>{children}</SafeAreaView>;
};
