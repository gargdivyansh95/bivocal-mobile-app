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
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [propertyList, setPropertyList] = useState([]);
    const [filteredPropertyList, setFilteredPropertyList] = useState([]);
    const cpUserId = props?.userProfile?.data?.cpUser?.id;

    useEffect(() => {
        getPropertyList();
    }, []);

    const getPropertyList = (refresh = false) => {
        const filter = {
            'where': {
                'cpUserId': cpUserId,
            },
        };
        if (refresh) {
            setIsRefreshing(true);
        } else {
            setIsLoading(true);
        }
        const filteredData = JSON.stringify(filter);
        let { actions } = props;
        actions.getProperty(
            filteredData,
            response => {
                if (response?.data) {
                    setPropertyList(response.data?.properties);
                    setFilteredPropertyList(response.data?.properties);
                    setIsLoading(false);
                    setIsRefreshing(false);
                }
            },
            error => {
                console.log('ERROR', error);
                setIsLoading(false);
                setIsRefreshing(false);
            },
        );
    };

    const refreshList = () => {
        getPropertyList();
    };

    const onRefreshList = () => {
        getPropertyList(true);
    };

    const handleSearchItem = useCallback((text) => {
        setSearchText(text);
        if (!text.trim()) {
            setFilteredPropertyList(propertyList);
        } else {
            const filtered = propertyList.filter(item =>
                item?.title?.toLowerCase().includes(text.toLowerCase()) ||
                item?.society?.name?.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredPropertyList(filtered);
        }
    }, [propertyList]);

    const handleAddInventory = () => {
        props.navigation.navigate(NAVIGATION.addInventory, { data: null, onGoBack: refreshList });
    };

    const handleEditDetails = (item) => {
        props.navigation.navigate(NAVIGATION.addInventory, { data: item, from: 'edit', onGoBack: refreshList });
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
            <InventoryItem item={item} handleEditDetails={handleEditDetails} />
        );
    };

    const renderEmpty = () => {
        if (isLoading || isRefreshing) {
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
    console.log(filteredPropertyList, 'propertyList')

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenContainer}>
                <FlatList
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    data={filteredPropertyList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={() => renderEmpty()}
                    onRefresh={onRefreshList}
                    refreshing={isRefreshing}
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
