import React, { useCallback, useMemo, useState } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    ActivityIndicator,
    Text,
    Pressable,
    Image,
} from 'react-native';
import { EmptyMessage } from '../../components';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { styles } from './Inventory.style';
import LinearGradient from 'react-native-linear-gradient';
import AddIcon from '../../assets/images/add-square.png';
import { InventoryItem, ListHeader } from './components';

const data = [
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    },
    {
        id: 4,
    },
    {
        id: 5,
    },
]

const Inventory = (props) => {

    const [searchText, setSearchText] = useState('');

    const handleSearchItem = useCallback((text) => {
        setSearchText(text);
    }, []);

    const renderHeader = useMemo(() => {
        return (
            <ListHeader
                value={searchText}
                onChangeText={handleSearchItem}
            />
        );
    }, [handleSearchItem, searchText]);

    const renderItem = ({ item }) => {
        return (
            <InventoryItem />
        );
    };

    const renderEmpty = () => {
        return (
            <EmptyMessage title="No Data Found" />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenContainer}>
                <FlatList
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={() => renderEmpty()}
                />
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
        // visitList: visitListActions.visitList,
        // offersList: offersActions.offersList,
        // userProfile: visitListActions.userProfile,
        // appInstalled: authActions.appInstalled,
        // reafreshToken: authActions.reafreshToken,
        // updateUser: authActions.updateUser,
        // logoutSuccess: authActions.logoutSuccess,
    },
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
