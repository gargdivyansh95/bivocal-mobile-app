/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Linking } from 'react-native';
import { styles } from './ContactUs.style';
import { CustomButton, CustomTextInput, EmptyMessage } from '../../components';
import { useSelector } from 'react-redux';

export default function ContactUs(props) {

  // const [name, setName] = useState();
  // const [number, setNumber] = useState();
  // const [email, setEmail] = useState();

  // const regexFName = new RegExp('^[a-zA-Z]+$');
  // const regexEmail = new RegExp(
  //   '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  // );

  // const isValidName = regexFName.test(name);
  // const isValidEmail = regexEmail.test(email);

  // const handleSubmit = () => {
  //   if (!isValidName) {
  //     alert('Name field does not allowed special and numeric characters');
  //   } else if (!isValidEmail) {
  //     alert('Please Enter Valid E-mail');
  //   } else {
  //     alert('submitted')
  //   }
  // };

  const visitListState = useSelector(state => state.visitList);
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    setContactData(visitListState?.userProfileData?.data);
  }, [visitListState?.userProfileData?.data]);

  return (
    <SafeAreaView style={styles.container}>
      {
        contactData?.relationshipManager?.fullName ?

          <View style={styles.screenContainer}>
            <View style={styles.supportInfo}>
              <Text style={styles.heading}>Relationship Manager</Text>
              <Text style={[styles.subHeading, { color: 'black' }]}>{contactData?.relationshipManager?.fullName}</Text>
            </View>
            <View style={styles.supportInfo}>
              <Text style={styles.heading}>Mobile Number</Text>
              <Text style={styles.subHeading} onPress={() => Linking.openURL(`tel:+${contactData?.relationshipManager?.mobile}`)}>+{contactData?.relationshipManager?.mobile}</Text>
            </View>
            <View style={styles.supportInfo}>
              <Text style={styles.heading}>Web</Text>
              <Text style={styles.subHeading} onPress={() => Linking.openURL(`mailto:${contactData?.relationshipManager?.email}`)}>{contactData?.relationshipManager?.email}</Text>
            </View>
          </View>
          :
          <EmptyMessage title="We will shortly assign you a Relationship Manager" iconName="infocirlceo" />
      }

    </SafeAreaView>
  );
}
