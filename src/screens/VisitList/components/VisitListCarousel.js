/* eslint-disable react/no-unstable-nested-components */
import React, { useRef } from 'react';
import { View, Image, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import GlobalStyle from '../../../style/globalstyle';
import { API_ENDPOINT_IMG_PREFIX } from '../../../constants/constants';

export default function VisitListCarousel(props) {

  const SLIDER_WIDTH = Dimensions.get('window').width;

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={styles.imageStyle}
        key={index}>
        <Image key={`${index}`} source={{ uri: `${API_ENDPOINT_IMG_PREFIX}` + item?.image }} style={[styles.imageStyle]} />
      </View>
    );
  };

  return (
    <View style={styles.carouselBox}>
      <Carousel
        layout="default"
        data={props.data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={300}
        inactiveSlideShift={0}
        //useScrollView={true}
        activeSlideAlignment="center"
        loop={true}
        loopClonesPerSide={props.data.length}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  carouselBox: {
    marginBottom: 20,
    marginTop: 5,
  },
  imageStyle: {
    width: 300,
    height: (300 / 2.16),
    borderRadius: 5,

    backgroundColor: '#e6e6e6'
  },
  heading: {
    padding: 15,
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 12,
    color: '#24272c',
  },
});
