/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalStyle from '../../../style/globalstyle';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DashboardCard(props) {
  return (
    <View style={styles.visitBlock}>
      <View style={styles.countBox}>
        <View style={styles.iconCount}>
          <Icon name={props.iconName} size={26} color="#2668E0" />
        </View>
        <Text style={styles.count}>{props.count}</Text>
      </View>
      <View style={styles.visitors}>
        <Text style={styles.visitorText}>{props.text}</Text>
        {/* <Text style={styles.visitorPercent}>{props.percent}</Text> */}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  visitBlock: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 8,
    width: '48%',
  },
  countBox: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  count: {
    fontFamily: GlobalStyle.fontSet.Poppins600,
    fontSize: 18,
    color: '#000',
  },
  iconCount: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 8,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  visitors: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  visitorText: {
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: 14,
    color: '#24272c',
  },
  visitorPercent: {
    marginLeft: 5,
    fontFamily: GlobalStyle.fontSet.Poppins600,
    fontSize: 14,
    color: '#004334',
  }
});
