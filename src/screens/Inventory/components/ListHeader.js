import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CustomTextInput } from '../../../components';
import FilterIcon from '../../../assets/images/filter.png';
import SortingIcon from '../../../assets/images/sorting.png';
import SearchIcon from '../../../assets/images/search.png';
import GlobalStyle from '../../../style/globalstyle';

export default function ListHeader({value, onChangeText}) {
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
                    onChangeText={onChangeText}
                    value={value}
                />
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    title: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 16,
        color: '#000',
    },
    actionsIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
    },
    iconBlock: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#F2F2F2',
    },
    icon: {
        width: 20,
        height: 20,
    },
    searchBox: {
        position: 'relative',
    },
    searchIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: 10,
        left: 15,
    },
    inputStyle: {
        height: 44,
        fontSize: 14,
        paddingRight: 10,
        paddingLeft: 50,
        borderWidth: 1,
        // borderColor: 'red',
        borderColor: '#F2F2F2',
        borderRadius: 30,
        color: '#000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        paddingTop: 0,
        paddingBottom: 0,
    },
});

