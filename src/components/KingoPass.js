/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import {
  COLOR_WHITE,
  COLOR_BACKGROUND,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TEXT70GRAY,
  COLOR_TEXT_BLACK,
  COLOR_TEXT60GRAY,
} from '../assets/color';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {svgXml} from '../assets/svg';
import Header from '../components/Header';
import AppContext from '../components/AppContext';
import axios from 'axios';
import {API_URL} from '@env';
import {Dimensions} from 'react-native';
import StoreCompo from './StoreCompo';

const windowWidth = Dimensions.get('window').width;

export default function KingoPass(props) {
  const navigation = useNavigation();
  const context = useContext(AppContext);

  const scrollViewRef = useRef();

  const {todaysPick} = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  //넘기면 아래 표시 되는거 색 바뀜
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const pageWidth = event.nativeEvent.layoutMeasurement.width;
    const currentPage = Math.floor(offsetX / pageWidth + 0.5);
    setCurrentIndex(currentPage);
  };

  const Indecator = Array.from({length: todaysPick.length}, (_, index) => (
    <View
      style={{
        width: 4,
        height: 4,
        borderRadius: 2,
        marginHorizontal: 3.5,
        backgroundColor: index === currentIndex ? COLOR_PRIMARY : '#D9D9D9',
      }}
    />
  ));

  return (
    <View style={styles.todayPick}>
      <Text style={styles.todayPickTitle}>먹구스꾸's 오늘의 픽</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          // backgroundColor: 'green',
          marginTop: 10,
        }}
        horizontal={true}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}>
        {todaysPick.map((pickData, index) => {
          return <StoreCompo storeData={pickData} index={index} />;
        })}
      </ScrollView>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 8}}>
        {Indecator}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todayPick: {
    marginTop: 15,
    width: windowWidth - 32,
    padding: 12,
    paddingHorizontal: 10,
    backgroundColor: COLOR_WHITE,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // for Android
  },
  todayPickTitle: {
    fontSize: 20,
    color: COLOR_TEXT70GRAY,
    fontWeight: '700',
  },
  line: {
    marginVertical: 8,
    height: 0.5,
    backgroundColor: '#D9D9D9', // Change color as needed
    width: '100%', // Adjust width as needed
  },
});
