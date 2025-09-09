/* eslint-disable prettier/prettier */

import VersionCheck from 'react-native-version-check';
import { Alert, Linking } from 'react-native';
const VersionFind = async () => {
    try {
      const latestVersion = await VersionCheck.getLatestVersion();
      const currentVersion = VersionCheck.getCurrentVersion();
      const updateNeeded = await VersionCheck.needUpdate({
        currentVersion,
        latestVersion,
      });
      if (updateNeeded?.isNeeded) {
        const storeUrl = await VersionCheck.getStoreUrl();
        Alert.alert(
          'Update Available',
          'A new version of the app is available. Please update to the latest version for a better experience.',
          [
            {
              text: 'Update',
              onPress: () => {
                Linking.openURL(storeUrl);
              },
            },
            { text: 'Later', style: 'cancel' },
          ]
        );
      }
    } catch (error) {
      console.error('Error checking app version:', error);
    }
  };

  export default VersionFind