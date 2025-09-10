/* eslint-disable react/no-unstable-nested-components */
import React, { useRef } from 'react';
import { View, Image, Dimensions, StyleSheet, Text } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import GlobalStyle from '../../../style/globalstyle';
import { API_ENDPOINT_IMG_PREFIX } from '../../../constants/constants';

export default function VisitListCarousel(props) {

  const SLIDER_WIDTH = Dimensions.get('window').width;

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <Image key={`${index}`} source={{ uri: `${API_ENDPOINT_IMG_PREFIX}` + item?.image }} style={[styles.imageStyle]} />
      </View>
    );
  };

  return (
    <View style={styles.carouselBox}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        // index={2}
        // showPagination
        // paginationActiveColor="#2668E0"
        // paginationDefaultColor="#ccc"
        data={props.data}
        renderItem={renderItem}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  carouselBox: {
    marginBottom: 20,
    marginTop: 5,
  },
  container: {
    width: GlobalStyle.width,
    height: (300 / 2.16),
    borderRadius: 5,
    backgroundColor: '#e6e6e6',
  },
  imageStyle: {
    width: GlobalStyle.width,
    height: (300 / 2.16),
    borderRadius: 5,
  },
  heading: {
    padding: 15,
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 12,
    color: '#24272c',
  },
});
