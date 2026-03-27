/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../style/globalstyle';
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { IconButton } from 'react-native-paper';
import BackIcon from 'react-native-vector-icons/AntDesign';
import EmptyMessage from './EmptyMessage';

export default function SocietySearchPicker({ bottomSheetRef, societyList, searchText, isLoading, onSelectItem, onSearchSociety }) {

    const snapPoints = useMemo(() => ['50%', '90%'], []);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                pressBehavior={'close'}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                {...props}
            />
        ),
        []
    );

    const onChangeItem = (data) => {
        onSelectItem(data);
        bottomSheetRef.current.close();
    };

    // const handleSearch = (text) => {
    //     onSearchSociety(text);
    // };

    const renderItem = ({ item }) => {
        return (
            <Pressable style={styles.option} onPress={() => onChangeItem(item)}>
                <Text style={[styles.optionText, { color: '#000' }]}>{item.name}</Text>
            </Pressable>
        );
    };

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <View style={styles.sheetHeader}>
                <IconButton
                    icon={() => <BackIcon
                        name="arrowleft"
                        size={24}
                        color="#000"
                    />}
                    size={20}
                    style={styles.closeIcon}
                    onPress={() => bottomSheetRef.current.close()}
                />
                <Text style={styles.sheetTitle}>Search Society</Text>
            </View>
            <View style={styles.listHeader}>
                <BottomSheetTextInput
                    style={styles.inputStyle}
                    placeholder="Search Society"
                    placeholderTextColor="#808191"
                    defaultValue={searchText}
                    onChangeText={(text) => onSearchSociety(text)}
                    blurOnSubmit={false}
                    autoFocus={true}
                    enablesReturnKeyAutomatically
                />
            </View>
            <BottomSheetFlatList
                data={societyList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={() => isLoading ? <ActivityIndicator color="#2668E0" /> : <EmptyMessage title="No Society Found" />}
                contentContainerStyle={styles.contentContainerStyle}
            />
        </BottomSheetModal>
    );
}

// export default React.memo(SocietySearchPicker);

export const styles = StyleSheet.create({
    inputStyle: {
        height: 44,
        fontSize: 14,
        paddingHorizontal: 10,
        // backgroundColor: '#f2f3f7',
        // borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        color: '#000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        paddingTop: 0,
        paddingBottom: 0,
    },
    sheetHeader: {
        position: 'relative',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeIcon: {
        position: 'absolute',
        top: -10,
        left: 2,
        zIndex: 111,
    },
    sheetTitle: {
        color: '#000',
        fontFamily: GlobalStyle?.fontSet.Poppins500,
        fontSize: 16,
        textAlign: 'center',
        flex: 1,
    },
    listHeader: {
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    option: {
        paddingHorizontal: 15,
        borderBottomWidth: 0.8,
        borderBottomColor: '#EAEAEA',
        paddingVertical: 15,
    },
    optionText: {
        fontFamily: GlobalStyle?.fontSet.Poppins500,
        fontSize: 14,
    },
});
