import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { NAVIGATION } from '../../constants';
import { inventoryActions } from './Inventory.action';

const Inventory = (props) => {

    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [propertyList, setPropertyList] = useState([]);
    const cpUserId = props?.userProfile?.data?.cpUser?.id;

    useEffect(() => {
        getPropertyList();
    }, []);

    const getPropertyList = () => {
        const filter = {
            'where': {
                'cpUserId': cpUserId,
            },
        };
        setIsLoading(true);
        const filteredData = JSON.stringify(filter);
        let { actions } = props;
        actions.getProperty(
            filteredData,
            response => {
                if (response?.data) {
                    setPropertyList(response.data);
                    setIsLoading(false);
                }
            },
            error => {
                console.log('ERROR', error);
                setIsLoading(false);
            },
        );
    };

    const handleSearchItem = useCallback((text) => {
        setSearchText(text);
    }, []);

    const handleAddInventory = () => {
        props.navigation.navigate(NAVIGATION.addInventory);
    };

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
            <InventoryItem item={item} />
        );
    };

    const renderEmpty = () => {
        if (isLoading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator color="#2668E0" />
                </View>
            );
        } else {
            return (
                <EmptyMessage title="No Data Found" />
            );
        }
    };
    console.log(propertyList, 'propertyList')

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenContainer}>
                <FlatList
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    data={propertyList?.properties}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={() => renderEmpty()}
                />
                <Pressable style={styles.inventoryBtn} onPress={handleAddInventory}>
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
});

const ActionCreators = Object.assign(
    {},
    {
        getProperty: inventoryActions.getProperty,
    },
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
