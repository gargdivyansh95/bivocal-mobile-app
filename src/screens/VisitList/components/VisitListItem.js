/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../../../style/globalstyle';
import moment from 'moment';
import { IconButton, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const myIcon = <Icon name="rocket" size={30} color="#900" />;

export default function VisitListItem(props) {
  return (
    <View style={styles.listContainer}>
      <Pressable style={styles.cardItem} onPress={props.onPress}>
        <Image source={props.image} style={styles.iconStyle} />
        <View style={styles.contentBox}>
          <Text style={styles.heading}>{props.item.locality.name}</Text>
          <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', }}>

            <Icon name="clock-time-three-outline" size={16} />
            <Text style={styles.description}>{moment(props.item.scheduleStart).format('MMM DD, YYYY @ hh:mm a')}</Text>

          </View>
        </View>
        <View style={styles.iconBox}>
          <ArrowIcon name="rightcircle" size={15} color="#199fba" />
        </View>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
  },
  iconStyle: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  contentBox: {
    width: '75%',
    //backgroundColor: 'lightgray',
    justifyContent: 'center',

  },
  heading: {
    fontFamily: GlobalStyle.fontSet.Poppins600,
    fontSize: 18,
    color: '#000',
  },
  description: {
    marginLeft: 5,
    marginTop: Platform.OS === 'android' ? 3 : 0,
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: 14,
    color: '#24272c',
  },
});
