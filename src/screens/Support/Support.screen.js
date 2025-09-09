/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, SafeAreaView, Linking } from 'react-native';
import { styles } from './Support.style';

export default function Support(props) {

  const phoneNumber = '+91-9311592234';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Get In Touch</Text>
        <View style={styles.supportInfo}>
          <Text style={styles.heading}>Phone</Text>
          <Text style={styles.subHeading} onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>+91-9311592234</Text>
        </View>
        <View style={styles.supportInfo}>
          <Text style={styles.heading}>Email</Text>
          <Text style={styles.subHeading} onPress={() => Linking.openURL('mailto:support@bivocalbirds.com')}>support@bivocalbirds.com</Text>
        </View>
        <View style={styles.supportInfo}>
          <Text style={styles.heading}>Web</Text>
          <Text style={styles.subHeading} onPress={() => Linking.openURL('https://www.bivocalbirds.com/')}>https://www.bivocalbirds.com</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
