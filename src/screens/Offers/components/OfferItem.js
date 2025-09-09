/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Pressable, StyleSheet, View, Dimensions } from 'react-native';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import { API_ENDPOINT_IMG_PREFIX } from '../../../constants/constants';
import GlobalStyle from '../../../style/globalstyle';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function DashboardItem(props) {
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  // const ITEM_WIDTH = Dimensions.get('window').width;
  return (
    // <View style={styles.listContainer}>
    //   <View style={styles.cardItem}>
    //     <View style={styles.cardInfo}>
    //       <Image source={{uri: `${API_ENDPOINT_IMG_PREFIX}` + props.item.image}} style={[styles.iconStyle]} />
    //     </View>
    //     <View style={styles.contentBox}>
    //       <Text style={styles.heading}>{props.item.offerCode}</Text>
    //       <Text style={styles.description}>{props.item.description}</Text>
    //     </View>
    //     </View>
    // </View>

    <Card mode="elevated" style={{ marginHorizontal: 15, marginBottom: 15 }}>
      <Image style={{ borderRadius: 10, width: GlobalStyle.width - 30, height: (GlobalStyle.width - 30) / 2.16 }} source={{ uri: `${API_ENDPOINT_IMG_PREFIX}` + props.item.image }} />
      {/* <Card.Content>
        <Text variant="bodyLarge">{props.item.offerCode}</Text>
        <Text variant="bodyMedium">{props.item.description}</Text>
      </Card.Content> */}
    </Card>
  );
}

export const styles = StyleSheet.create({

  listContainer: {
    paddingHorizontal: 15,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  cardInfo: {
    width: '70%',
    height: 130,

  },
  iconStyle: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  contentBox: {
    paddingLeft: 10,
    width: '30%',
  },
  heading: {
    fontFamily: GlobalStyle.fontSet.Poppins600,
    fontSize: 14,
    color: '#000',
  },
  description: {
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: 12,
    color: '#24272c',
  },
});
