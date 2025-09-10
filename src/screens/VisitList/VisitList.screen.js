/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { VisitListCarousel, VisitListItem } from './components';
import BuildingIcon from '../../assets/images/building.png';
import FilterIcon from 'react-native-vector-icons/AntDesign';
import { styles } from './VisitList.style';
import { NAVIGATION } from '../../constants';
import { EmptyMessage } from '../../components';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { offersActions } from '../Offers/Offers.action';
import { visitListActions } from './VisitList.action';
import moment from 'moment';
import { authActions } from '../Auth/Auth.action';

const PAGE_SIZE = 20;

const VisitList = props => {

  const [visitList, setVisitList] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [requestSent, setRequestSent] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const [currentDate, setCurrentDate] = useState(moment().startOf('D').toLocaleString());
  const [endDate, setEndDate] = useState(moment().endOf('D').toLocaleString());

  const offsetRef = useRef();
  const visitListState = useSelector(state => state.visitList);
  // const refreshTokenApiCallCount = useRef(1)

  console.log(visitListState, 'visitListState');

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerBackVisible: false,
      headerRight: props => {
        return (
          <FilterIcon
            name="filter"
            size={28}
            color="#000"
            onPress={() => handleClickFilter()}
          />
        );
      },
    });
  });

  useEffect(() => {
    console.log('userProfile: ', props.userProfile);

    offsetRef.current = 0;
    // let { actions } = props;
    // actions.appInstalled({})

    // refreshingToken()
    getScheduleVisits(currentDate, endDate);
    getOfferList();
    getUserDetail();
    // saveDeviceId()
  }, []);

  // useEffect(() => {
  //   if (visitListState.notificationPayload) {
  //     //Alert.alert(JSON.stringify(visitListState.notificationPayload))
  //     props.navigation.navigate(NAVIGATION.notificationDetail, { data: visitListState.notificationPayload });
  //   }
  // }, [visitListState.notificationPayload])

  // const saveDeviceId = () => {
  //   if (props?.deviceId) {
  //     let userData = {
  //       deviceId: props.deviceId
  //     };
  //     let { actions } = props;
  //     actions.updateUser(
  //       userData,
  //       response => {
  //         console.log('SUCCESS', response);
  //       },
  //       error => {
  //         console.log('ERROR', error);
  //       },
  //     );
  //   }
  // }

  const getScheduleVisits = (start, end) => {
    const filter = {
      'skip': offsetRef.current,
      'limit': PAGE_SIZE,
      'order': [
        'createdAt DESC',
      ],
      'where': {
        'and': [
          {
            'date': {
              'between': [
                start,
                end,
              ],
            },
          },
        ],
      },
      'include': [
        {
          'relation': 'assigned',
          'scope': {
            'fields': {
              'id': true,
              'fullName': true,
              'firstName': true,
              'lastName': true,
              'mobile': true,
            },
          },
        },
        {
          'relation': 'cprmUser',
          'scope': {
            'fields': {
              'id': true,
              'fullName': true,
              'firstName': true,
              'lastName': true,
            },
          },
        },
        {
          'relation': 'locality',
          'scope': {
            'fields': {
              'id': true,
              'name': true,
            },
          },
        },
        {
          'relation': 'society',
          'scope': {
            'fields': {
              'id': true,
              'name': true,
            },
          },
        },
      ],
    };

    const filteredData = JSON.stringify(filter);
    let { actions } = props;
    actions.visitList(
      filteredData,
      response => {
        if (response?.data) {
          console.log('SUCCESS', response);
          if (offsetRef.current === 0) {
            setVisitList(response.data);
          } else {
            setVisitList([...visitList, ...response.data]);
          }

          setRequestSent(false);
          if (response.data.length >= PAGE_SIZE) {
            offsetRef.current = offsetRef.current + PAGE_SIZE;
            setHasMore(true);
          } else {
            setHasMore(false);
          }
        }
      },
      error => {
        console.log('ERROR', error);
        setRequestSent(false);
        // refreshingToken()
      },
    );
  };

  const getOfferList = () => {
    let { actions } = props;
    actions.offersList(
      {},
      response => {
        console.log('SUCCESS', response);
        setOffersData(response.data);
        setRequestSent(false);
      },
      error => {
        console.log('ERROR', error);
        setRequestSent(false);
      },
    );
  };

  const getUserDetail = () => {
    let { actions } = props;
    actions.userProfile(
      {},
      response => {
        console.log('SUCCESS PROFILE:', response);
      },
      error => {
        console.log('ERROR', error);
      },
    );
  };

  // const refreshingToken = () => {
  //   let { actions } = props;
  //   actions.reafreshToken(
  //     { refreshToken: props.userProfile.data.refreshToken },
  //     response => {
  //       getScheduleVisits(currentDate, endDate)
  //       getOfferList()
  //       getUserDetail()
  //     },
  //     error => {
  //       console.log("error: ", error)
  //       // Try two times and then send user to login page
  //       if(refreshTokenApiCallCount.current !== 2) {
  //         refreshTokenApiCallCount.current = refreshTokenApiCallCount.current + 1
  //         setTimeout(() => {
  //           refreshingToken()
  //         }, 1000);

  //       } else {
  //         actions.logoutSuccess();
  //         props.navigation.replace(NAVIGATION.authNav, { to: NAVIGATION.login });
  //       }
  //     }
  //   )
  // }

  const handleClickFilter = () => {
    props.navigation.navigate(NAVIGATION.filter, { onGoBack: getFiter });
  };

  const handleVisitDetail = (item) => {
    props.navigation.navigate(NAVIGATION.visitDetail, { data: item });
  };

  const getFiter = (data) => {
    console.log(data);
    offsetRef.current = 0;
    setCurrentDate(data.start);
    setEndDate(data.end);
    setRequestSent(true);
    getScheduleVisits(data.start, data.end);
  };

  const renderHeader = () => {
    if (!visitList.length > 0) {
      return (
        <VisitListCarousel data={offersData} />
      );
    } else {
      return null;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <VisitListItem item={item} onPress={() => handleVisitDetail(item)} image={BuildingIcon} />
    );
  };

  const renderEmpty = () => {
    if (requestSent) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    } else {
      if (props?.userProfileData?.data?.relationshipManager?.fullName) {
        return (
          <EmptyMessage title={'Opps!\n There is no visit schedule for you.'} iconName="message1" />
        );
      }
      return (
        <EmptyMessage title="We will shortly assign you a Relationship Manager, then you will see the leads." iconName="message1" />
      );
    }
  };

  const renderFooter = () => {
    if (hasMore) {
      return (
        <ActivityIndicator size="large" color="#2668E0" />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <FlatList
          ListHeaderComponent={() =>
            renderHeader()
          }
          contentContainerStyle={{ flexGrow: 1 }}
          data={visitList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() =>
            renderEmpty()
          }
          onEndReached={() => {
            if (!requestSent && hasMore) {
              //fetchData(page);
              getScheduleVisits(currentDate, endDate);
            }
          }}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userProfile: state.auth.userProfile,
  userProfileData: state.visitList.userProfileData,
  deviceId: state.auth.deviceId,
});

const ActionCreators = Object.assign(
  {},
  {
    visitList: visitListActions.visitList,
    offersList: offersActions.offersList,
    userProfile: visitListActions.userProfile,
    // appInstalled: authActions.appInstalled,
    // reafreshToken: authActions.reafreshToken,
    // updateUser: authActions.updateUser,
    // logoutSuccess: authActions.logoutSuccess,
  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisitList);
