/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import GlobalStyle from '../../style/globalstyle';
import moment from 'moment';
import { ELeadScheduleVisitType, ETenantType } from '../../constants/enum';

export default function VisitDetails(props) {

  console.log(props.route.params.data, 'dfgchgvjhbkjn,');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.screenContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.heading}>Schedule Date </Text>
            <Text style={styles.headingDetails}>{moment(props.route.params.data.date).format('MMMM DD, YYYY')}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.heading}>Schedule Time </Text>
            <Text style={styles.headingDetails}>{moment(props.route.params.data.date).format('hh:mm a')}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.heading}>Visit Type </Text>
            <Text style={styles.headingDetails}>{ELeadScheduleVisitType[props.route.params.data.leadVisitType]}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.heading}>Tenant Type </Text>
            <Text style={styles.headingDetails}>{ETenantType[props.route.params.data.tenantType]}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.heading}>Tenant Profile </Text>
            <Text style={styles.headingDetails}>Business / Professional</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.heading}>Society </Text>
            <Text style={styles.headingDetails}>{props.route.params.data?.locality?.name}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.heading}>Relationship Manager </Text>
            <Text style={styles.headingDetails}>{props.route.params.data?.cprmUser?.fullName}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.heading}>Field Officer </Text>
            <Text style={styles.headingDetails}>{props.route.params.data?.assigned?.fullName}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  detailsRow: {
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  heading: {
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 16,
    color: '#000',
  },
  headingDetails: {
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: 15,
    color: '#808191',
    // color: '#24272c',
  },
});
