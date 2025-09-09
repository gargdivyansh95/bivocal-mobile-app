/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Button,
  Pressable,
} from 'react-native';
import { styles } from './Filter.style';
import { CustomButton } from '../../components';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { visitListActions } from '../VisitList/VisitList.action';


const Filter = props => {

  // const [value, setValue] = useState({});
  const [startdate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //const [startdate, setStartDate] = useState(moment().startOf('D'))
  //const [endDate, setEndDate] = useState(moment(startdate).add(1, 'day').endOf('D'))

  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  // const handleChange = (item, type) => {
  //   switch (type) {
  //     case 'cprm':
  //       return setValue({ ...value, cprm: item?.value });
  //     case 'fieldOfficer':
  //       return setValue({ ...value, fieldOfficer: item?.value });
  //     case 'society':
  //       return setValue({ ...value, society: item?.value });
  //     case 'visitSubType':
  //       return setValue({ ...value, visitSubType: item?.value });
  //     case 'scheduleType':
  //       return setValue({ ...value, scheduleType: item?.value });
  //     case 'tenantType':
  //       return setValue({ ...value, tenantType: item?.value });
  //     default:
  //       break;
  //   }
  // };


  const handleStartDate = () => {
    setOpenStartDate(true);
  };

  const handleEndDate = () => {
    setOpenEndDate(true);
  };

  const handleFilter = () => {
    let start = moment(startdate).startOf('D').toLocaleString()
    let end = moment(endDate).endOf('D').toLocaleString()
    if (startdate > endDate) {
      alert('Start date cannot be greater than end date')
    } else {
      props.route.params.onGoBack({ start: start, end: end });
      props.navigation.goBack()
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.screenContainer}>
          <View style={styles.datePickerBox}>
            <View style={styles.dateSelect}>
              <Text style={styles.label}>Select Start Date</Text>
              <Pressable onPress={() => handleStartDate()} style={styles.selectBox}>
                <Text style={styles.selectTitle}>{moment(startdate).format('DD/MM/YYYY')}</Text>
              </Pressable>
              <DatePicker
                modal
                mode='date'
                open={openStartDate}
                date={startdate}
                onConfirm={(date) => {
                  setOpenStartDate(false);
                  setStartDate(date);
                }}
                onCancel={() => {
                  setOpenStartDate(false);
                }}
              />
            </View>
            <View style={styles.dateSelect}>
              <Text style={styles.label}>Select End Date</Text>
              <Pressable onPress={() => handleEndDate()} style={styles.selectBox}>
                <Text style={styles.selectTitle}>{moment(endDate).format('DD/MM/YYYY')}</Text>
              </Pressable>
              <DatePicker
                modal
                mode='date'
                open={openEndDate}
                date={endDate}
                onConfirm={(date) => {
                  setOpenEndDate(false);
                  setEndDate(date);
                }}
                onCancel={() => {
                  setOpenEndDate(false);
                }}
              />
            </View>
          </View>
          {/* <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Relationship Manager</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={Relationship ManagerDATA}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Relationship Manager'}
                searchPlaceholder="Search"
                value={value.Relationship Manager}
                onChange={(item) => handleChange(item, 'Relationship Manager')}
                containerStyle={styles.dropdownListContainer}
                itemContainerStyle={styles.dropdownListBox}
                itemTextStyle={styles.dropdownListItem}
                renderRightIcon={() => (
                  <ChevronDown
                    color={'#000'}
                    name="angle-down"
                    size={20}
                  />
                )}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Field Officer</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={fieldOfficerData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Field Officer'}
                searchPlaceholder="Search"
                value={value.fieldOfficer}
                onChange={(item) => handleChange(item, 'fieldOfficer')}
                containerStyle={styles.dropdownListContainer}
                itemContainerStyle={styles.dropdownListBox}
                itemTextStyle={styles.dropdownListItem}
                renderRightIcon={() => (
                  <ChevronDown
                    color={'#000'}
                    name="angle-down"
                    size={20}
                  />
                )}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Society</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={societyData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Society'}
                searchPlaceholder="Search"
                value={value.society}
                onChange={(item) => handleChange(item, 'society')}
                containerStyle={styles.dropdownListContainer}
                itemContainerStyle={styles.dropdownListBox}
                itemTextStyle={styles.dropdownListItem}
                renderRightIcon={() => (
                  <ChevronDown
                    color={'#000'}
                    name="angle-down"
                    size={20}
                  />
                )}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Visit SubType</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={visitData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Visit SubType'}
                value={value.visitSubType}
                onChange={(item) => handleChange(item, 'visitSubType')}
                containerStyle={styles.dropdownListContainer}
                itemContainerStyle={styles.dropdownListBox}
                itemTextStyle={styles.dropdownListItem}
                renderRightIcon={() => (
                  <ChevronDown
                    color={'#000'}
                    name="angle-down"
                    size={20}
                  />
                )}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Schedule Type</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={scheduleData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Schedule Type'}
                value={value.scheduleType}
                onChange={(item) => handleChange(item, 'scheduleType')}
                containerStyle={styles.dropdownListContainer}
                itemContainerStyle={styles.dropdownListBox}
                itemTextStyle={styles.dropdownListItem}
                renderRightIcon={() => (
                  <ChevronDown
                    color={'#000'}
                    name="angle-down"
                    size={20}
                  />
                )}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Tenant Type</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={tenantData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Tenant Type'}
                value={value.tenantType}
                onChange={(item) => handleChange(item, 'tenantType')}
                containerStyle={styles.dropdownListContainer}
                itemContainerStyle={styles.dropdownListBox}
                itemTextStyle={styles.dropdownListItem}
                renderRightIcon={() => (
                  <ChevronDown
                    color={'#000'}
                    name="angle-down"
                    size={20}
                  />
                )}
              />
            </View> */}
        </View>
      </ScrollView>
      <View style={styles.filterActions}>
        <View style={styles.clearBtn}>
          <CustomButton
            title="Cancel"
            style={styles.btnLight}
            labelStyle={styles.titleDark}
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={styles.doneBtn}>
          <CustomButton
            title="Apply"
            style={styles.btnDark}
            labelStyle={styles.titleLight}
            onPress={() => handleFilter()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  // loginDetail: state.auth.loginDetail,
});

const ActionCreators = Object.assign(
  {},
  {
    visitList: visitListActions.visitList,
  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
