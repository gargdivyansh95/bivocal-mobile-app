/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import {styles} from './Offers.style';
import { OfferItem } from './components';
import { offersActions } from './Offers.action';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, useSelector } from 'react-redux';
import { EmptyMessage } from '../../components';

const Offers = props => {

  const offers = useSelector(state => state.offers);
  const [offersData, setOffersData] = useState([]);
  const [requestSent, setRequestSent] = useState(true);

  // useEffect(() => {
  //   let { actions } = props;
  //   actions.offersList(
  //     {},
  //     response => {
  //       console.log('SUCCESS', response);
  //       setOffersData(response.data);
  //       setRequestSent(false);
  //     },
  //     error => {
  //       console.log('ERROR', error);
  //       setRequestSent(false);
  //     },
  //   );
  // }, []);

  useEffect(() => {
    setOffersData(offers?.offersListData?.data);
    // setRequestSent(false);
  }, [offers?.offersListData?.data]);

  const renderItem = ({ item }) => {
    return (
      <OfferItem item={item} />
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
      return (
        <EmptyMessage title="No Data Found" />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={offersData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() =>
            renderEmpty()
          }
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  // loginDetail: state.auth.loginDetail,
});

const ActionCreators = Object.assign(
  {},
  {
    offersList: offersActions.offersList,
  },
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
