import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    ActivityIndicator,
    Text,
    Pressable,
    Image,
} from 'react-native';
import { CustomTextInput, EmptyMessage } from '../../components';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { styles } from './Inventory.style';
import LinearGradient from 'react-native-linear-gradient';
import AddIcon from '../../assets/images/add-square.png';
import FilterIcon from '../../assets/images/filter.png';
import SortingIcon from '../../assets/images/sorting.png';
import SearchIcon from '../../assets/images/search.png';

const Inventory = props => {

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Inventory</Text>
                    <View style={styles.actionsIcon}>
                        <View style={styles.iconBlock}>
                            <Image source={FilterIcon} style={styles.icon} />
                        </View>
                        <View style={styles.iconBlock}>
                            <Image source={SortingIcon} style={styles.icon} />
                        </View>
                    </View>
                </View>
                <View style={styles.searchBox}>
                    <Image source={SearchIcon} style={styles.searchIcon} />
                    <CustomTextInput
                        placeholder="Search"
                        placeholderTextColor="#808191"
                        style={styles.inputStyle}
                    // onChangeText={setFName}
                    // value={fName}
                    />
                </View>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        return (
            null
        );
    };

    const renderEmpty = () => {
        return (
            <EmptyMessage title="No Data Found" />
        );
    };

    const renderFooter = () => {
        return (
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
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenContainer}>
                <FlatList
                    ListHeaderComponent={() => renderHeader()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={[]}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={() =>
                        renderEmpty()
                    }
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
