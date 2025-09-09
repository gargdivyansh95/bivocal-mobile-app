/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import firebase from '@react-native-firebase/app';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from '../screens/Auth/Auth.action';
import {dashboardActions} from '../screens/Dashboard/Dashboard.action';

const RemotePushController = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.messaging().onTokenRefresh(async fcmToken => {
      console.log('New FCM Token:', fcmToken);
      saveDeviceToken(fcmToken);
    });

    if (Platform.OS === 'ios') {
      registerForRemoteMessages();
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      onMessage();
    }

    getToken();

    // When the component is unmounted, remove the listener
    return () => {
      unsubscribe();
    };
  }, []);

  const getToken = () => {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(x => {
        //Save device token and send in login and signup process
        saveDeviceToken(x);
      })
      .catch(e => console.log('Messaging Token ERROR+++', e));
  };

  const saveDeviceToken = token => {
    console.log('device token: ', token);
    let {actions} = props;
    actions.saveDeviceId(token);
  };

  const registerForRemoteMessages = () => {
    requestPermissions();
    // messaging()
    //   .registerDeviceForRemoteMessages()
    //   .then(() => {
    //     console.log('Registered');
    //     requestPermissions();
    //   })
    //   .catch(e => console.log("registerForRemoteMessages+++", e));
  };

  const requestPermissions = () => {
    messaging()
      .requestPermission()
      .then(status => {
        if (status === 1) {
          console.log('Authorized');
          onMessage();
        } else {
          console.log('Not authorized');
        }
      })
      .catch(e => console.log(e));
  };

  const onMessage = () => {
    messaging().onMessage(response => {
      console.log('onMessage+++');
      console.log(JSON.stringify(response));

      handleMessage(response);
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Called with a `RemoteMessage` when a notification press opens the application.',
        remoteMessage,
      );
      //call action to save notification payload
      if (remoteMessage) {
        showNotification(remoteMessage);
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('remoteMessage: ', remoteMessage); // always prints null
        if (remoteMessage) {
          showNotification(remoteMessage);
        }
      });
  };

  const handleMessage = remoteMessage => {
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'View',
          onPress: () => {
            showNotification(remoteMessage);
          },
        },
      ],
    );
  };

  const showNotification = notification => {
    console.log('Showing notification+++');
    console.log(JSON.stringify(notification));
    let {actions} = props;
    actions.newNotification(notification);
  };

  return null;
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const ActionCreators = Object.assign(
  {},
  {
    saveDeviceId: authActions.saveDeviceId,
    newNotification: dashboardActions.newNotification,
    //saveDeviceToken: globalActions.saveDeviceToken,
    //notificationPayload: notificationActions.notificationPayload,
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RemotePushController);
