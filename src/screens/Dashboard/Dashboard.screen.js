import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { styles } from './Dashboard.style';
import { DashboardCard } from './components';
import { PieChart } from 'react-native-gifted-charts';
import { dashboardActions } from './Dashboard.action';
import moment from 'moment';
import { EVisitStatus } from '../../constants/enum';
import GlobalStyle from '../../style/globalstyle';
import { CustomButton, EmptyMessage } from '../../components';
import { authActions } from '../Auth/Auth.action';
import { NAVIGATION } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import ReferIcon from '../../assets/images/refer.png';
import AddIcon from '../../assets/images/add-square.png';

const Dashboard = (props) => {

  const localData = [
    { _id: 12, count: 0 }, // Created
    { _id: 6, count: 0 },  // Done
    { _id: 16, count: 0 }, // Won
  ];

  const dashboardState = useSelector(state => state.dashboard);
  const refreshTokenApiCallCount = useRef(1);
  const [type, setType] = useState('today');
  const [startDate, setStartDate] = useState(moment().startOf('day').toISOString());
  const [endDate, setEndDate] = useState(moment().endOf('day').toISOString());
  const [visitCountData, setVisitCountData] = useState(localData);
  const cpUserId = props?.userProfile?.data?.cpUser?.id;

  useEffect(() => {
    let { actions } = props;
    actions.appInstalled({});

    refreshingToken();
    saveDeviceId();
    getUserDetail();
    getVisitsCount(startDate, endDate);
  }, []);

  useEffect(() => {
    if (dashboardState.notificationPayload) {
      //Alert.alert(JSON.stringify(dashboardState.notificationPayload))
      if (dashboardState?.notificationPayload?.data?.notificationService === 'Visit Schdule') {
        props.navigation.navigate(NAVIGATION.notificationDetail, { data: dashboardState.notificationPayload.data });
      }
    }
  }, [dashboardState.notificationPayload]);

  const saveDeviceId = () => {
    if (props?.deviceId) {
      let userData = {
        deviceId: props.deviceId,
      };
      let { actions } = props;
      actions.updateUser(
        userData,
        response => {
          console.log('SUCCESS', response);
        },
        error => {
          console.log('ERROR', error);
        },
      );
    }
  };

  console.log(visitCountData, 'visitCountData');

  const getUserDetail = () => {
    let { actions } = props;
    actions.userProfile(
      {},
      response => {
        console.log('SUCCESS PROFILE:', response);
      },
      error => {
        console.log('ERROR PROFILE', error);
      },
    );
  };

  const getVisitsCount = (start, end) => {
    const where = {
      'cpUserId': cpUserId,
      'date': [start, end],
    };

    const filteredData = JSON.stringify(where);
    let { actions } = props;
    actions.visitListCount(
      filteredData,
      response => {
        if (response && response.data) {
          let data = JSON.parse(JSON.stringify(localData));
          data.forEach(item => {
            let found = response.data.find(elem => elem._id === item._id);
            if (found) {
              item.count = found.count;
            }
          });
          setVisitCountData(data);
        } else {
          setVisitCountData(localData);
        }
      },
      error => {
        console.log('ERROR List', error);
        // refreshingToken();
      },
    );
  };

  const refreshingToken = () => {
    let { actions } = props;
    actions.reafreshToken(
      { refreshToken: props.userProfile.data.refreshToken },
      response => {
        getVisitsCount(startDate, endDate);
        getUserDetail();
      },
      error => {
        console.log('error: ', error);
        // Try two times and then send user to login page
        if (refreshTokenApiCallCount.current !== 2) {
          refreshTokenApiCallCount.current = refreshTokenApiCallCount.current + 1;
          setTimeout(() => {
            refreshingToken();
          }, 1000);

        } else {
          actions.logoutSuccess();
          props.navigation.replace(NAVIGATION.authNav, { to: NAVIGATION.login });
        }
      }
    );
  };

  const handleFilter = (elem) => {
    setType(elem);
    let start, end;
    if (elem === 'today') {
      start = moment().startOf('day').toISOString();
      end = moment().endOf('day').toISOString();
    } else if (elem === 'weekly') {
      start = moment().startOf('week').toISOString();
      end = moment().endOf('week').toISOString();
    } else if (elem === 'monthly') {
      start = moment().startOf('month').toISOString();
      end = moment().endOf('month').toISOString();
    }
    setStartDate(start);
    setEndDate(end);
    getVisitsCount(start, end);
  };

  const handleSubmit = () => {
    props.navigation.navigate(NAVIGATION.needQuery);
  };

  // const filteredVisitCountData = visitCountData?.filter(item => [12, 6, 16].includes(item._id));
  const totalCount = visitCountData?.reduce((sum, item) => sum + item.count, 0);

  const chartData = visitCountData?.map(item => {
    return {
      value: item.count,
      text: item.count < 9 ? ` ${item.count}` : `${item.count}`,
      color: item._id === 12 ? '#97b2ab' : item._id === 16 ? '#347066' : '#1a3732',
    };
  });

  const centerLabelData = () => {
    return (
      <View>
        <Text style={styles.totalCount}>{totalCount ? totalCount : 0}</Text>
        <Text style={styles.totalCount}>Total</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.screenContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Home</Text>
            <Pressable onPress={() => handleSubmit()}>
              <LinearGradient
                colors={['#9C67D9', '#2668E0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradientBox}
              >
                <Image style={styles.gradientIcon} source={ReferIcon} />
                <Text style={styles.gradientButton}>Refer & Earn</Text>
              </LinearGradient>
            </Pressable>
          </View>
          <View style={styles.vistorCard}>
            {visitCountData?.map((item, index) => {
              const data = EVisitStatus.find((elem) => elem.id === item._id);
              return (
                <DashboardCard key={index}
                  iconName="stats-chart"
                  count={item.count}
                  text={data.label}
                />
              );
            })}
            <DashboardCard
              iconName="stats-chart"
              count={totalCount}
              text={'Total'}
            />
          </View>
          <View style={styles.chartFilter}>
            <Text style={styles.title}>Overview</Text>
            <View style={styles.filterBtns}>
              <Pressable style={type === 'today' ? styles.filterButtonActive : styles.filterButton} onPress={() => handleFilter('today')}>
                <Text style={type === 'today' ? styles.titleDarkActive : styles.titleDark}>Today</Text>
              </Pressable>
              <Pressable style={type === 'weekly' ? styles.filterButtonActive : styles.filterButton} onPress={() => handleFilter('weekly')}>
                <Text style={type === 'weekly' ? styles.titleDarkActive : styles.titleDark}>Weekly</Text>
              </Pressable>
              <Pressable style={type === 'monthly' ? styles.filterButtonActive : styles.filterButton} onPress={() => handleFilter('monthly')}>
                <Text style={type === 'monthly' ? styles.titleDarkActive : styles.titleDark}>Monthly</Text>
              </Pressable>
            </View>
          </View>
          {chartData?.length > 0 && totalCount > 0 ?
            <View>
              <View style={styles.chartBox}>
                <PieChart
                  donut
                  data={chartData}
                  innerCircleColor="#fff"
                  showValuesAsLabels={true}
                  showText
                  textSize={14}
                  backgroundColor="#fff"
                  textColor="#000"
                  font={GlobalStyle.fontSet.Poppins400}
                  showTextBackground={true}
                  centerLabelComponent={centerLabelData}
                />
              </View>
              <View style={styles.chartLegendBox}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.created]} />
                  <Text style={styles.legendText}>Created</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.won]} />
                  <Text style={styles.legendText}>Won</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.done]} />
                  <Text style={styles.legendText}>Done</Text>
                </View>
              </View>
            </View> :
            <View style={styles.noData}>
              <EmptyMessage title={'No Data Found'} iconName="piechart" />
            </View>
          }
        </View>
      </ScrollView>
      <Pressable style={styles.inventoryBtn}>
        <LinearGradient
          colors={['#9C67D9', '#2668E0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientBox}
        >
          <Image style={styles.gradientIcon} source={AddIcon} />
          <Text style={styles.gradientButton}>Add New Inventory</Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userProfile: state.auth.userProfile,
  userProfileData: state.dashboard.userProfileData,
  deviceId: state.auth.deviceId,
});

const ActionCreators = Object.assign(
  {},
  {
    userProfile: dashboardActions.userProfile,
    visitListCount: dashboardActions.visitListCount,
    appInstalled: authActions.appInstalled,
    reafreshToken: authActions.reafreshToken,
    updateUser: authActions.updateUser,
    logoutSuccess: authActions.logoutSuccess,
  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
