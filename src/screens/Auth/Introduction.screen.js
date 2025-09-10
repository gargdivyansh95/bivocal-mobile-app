import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import SlideOne from '../../assets/images/slide1.png';
import SlideTwo from '../../assets/images/slide2.png';
import SlideThree from '../../assets/images/slide3.png';
import { NAVIGATION } from '../../constants';
import GlobalStyle from '../../style/globalstyle';
import AppLogo from '../../assets/images/appLogo.png';

const data = [
  {
    title: 'Hello BVB Partner!',
    text: 'Lets join to earn together',
    image: SlideOne,
    // bg: '#59b2ab',
  },
  {
    title: 'Get triple qualified leads with minimal workforce',
    text: 'No need to hire any tele caller executive',
    image: SlideTwo,
    // bg: '#febe29',
  },
  {
    title: "Let's get Started!",
    text: "Let's venture together to help tenants and owners",
    image: SlideThree,
    // bg: '#22bcb5',
  },
];

export default function Introduction({ navigation }) {

  const onPressNext = () => {
    navigation.navigate(NAVIGATION.login);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.slide,
          // {
          //   backgroundColor: item.bg,
          // },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const keyExtractor = item => item.title;

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-forward-circle"
          color="#199fba"
          size={44}
        />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <Pressable style={styles.buttonCircle} onPress={onPressNext}>
        <Icon
          name="checkmark-circle"
          color="#199fba"
          size={44}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image source={AppLogo} imageStyle={styles.headerLogo} style={styles.imageStyle} />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderItem={renderItem}
        data={data}
        activeDotStyle={{ backgroundColor: '#199fba' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    marginTop: Platform.OS === 'android' ? 30 : 0,
    alignSelf: 'center',
  },
  headerLogo:{
    width: 160,
    height: 40,
    resizeMode: 'contain',
  },
  slide: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 32,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: 15,
  },
  title: {
    fontFamily: GlobalStyle.fontSet.Poppins600,
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonCircle: {
    width: 44,
    height: 44,
    // backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    width: 130,
    height: 40,
    resizeMode: 'contain',
  },
});
