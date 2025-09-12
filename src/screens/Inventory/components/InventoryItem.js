/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import GlobalStyle from '../../../style/globalstyle';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import PropertyImage from '../../../assets/images/property.jpg';
import CropIcon from '../../../assets/images/crop.png';
import KeyIcon from '../../../assets/images/key.png';
import LocationIcon from '../../../assets/images/location.png';
import BuildingIcon from '../../../assets/images/building1.png';
import CalendarIcon from '../../../assets/images/calendar.png';
import RupeeIcon from '../../../assets/images/rupee.png';
import MoreIcon from '../../../assets/images/more.png';
import moment from 'moment';
import { Menu } from 'react-native-paper';

export default function InventoryItem({ item }) {

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.inventoryCard}>
                <View style={styles.imageBlock}>
                    <Image source={PropertyImage} style={styles.image} />
                </View>
                <View style={styles.contentBlock}>
                    <View style={[styles.topBar]}>
                        <View style={[styles.reviewBox, {
                            borderColor: '#05C168',
                            backgroundColor: '#05C1681A',
                        }]}>
                            <View style={[styles.reviewDot, { backgroundColor: '#05C168' }]} />
                            <Text style={[styles.reviewText, { color: '#05C168' }]}>Published</Text>
                        </View>
                        <Menu visible={visible} onDismiss={closeMenu}
                            anchor={
                                <Pressable onPress={openMenu}>
                                    <Image source={MoreIcon} style={{ width: 18, height: 18 }} />
                                </Pressable>
                            }
                            contentStyle={styles.menuStyle}
                        >
                            <Menu.Item titleStyle={styles.menuItemTitle} onPress={() => { }} title="Edit Details" />
                            <Menu.Item titleStyle={styles.menuItemTitle} onPress={() => { }} title="Mark Rent-Out" />
                        </Menu>
                    </View>
                    <Text style={styles.title}>{item?.title}</Text>
                    <View style={[styles.flexItem, styles.colGap12, styles.mt5]}>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={CropIcon} style={styles.icon} />
                            <Text style={styles.detailText}>{item?.propDetails?.propertyArea} sqft</Text>
                        </View>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={KeyIcon} style={styles.icon} />
                            <Text style={styles.detailText}>{item?.propDetails?.keyy === true ? 'Yes' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={[styles.flexItem, styles.colGap6, styles.mt5]}>
                        <Image source={LocationIcon} style={styles.icon} />
                        <Text style={styles.infoText}>Noida Extension, Uttar Pradesh</Text>
                    </View>
                    <View style={[styles.flexItem, styles.colGap6, styles.mt5]}>
                        <Image source={BuildingIcon} style={styles.icon} />
                        <Text style={styles.linkText}>{item?.society?.name}</Text>
                    </View>
                    <View style={[styles.flexItem, styles.colGap12, styles.mt5]}>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={CalendarIcon} style={styles.icon} />
                            <View>
                                <Text style={styles.detailText}>Available from</Text>
                                <Text style={styles.priceText}>{item?.propDetails?.availableFrom ? moment(item?.propDetails?.availableFrom).format('DD/MM/YY') : 'N/A'}</Text>
                            </View>
                        </View>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={RupeeIcon} style={styles.icon} />
                            <View>
                                <Text style={styles.detailText}>Monthly Rent</Text>
                                <Text style={styles.priceText}>₹{item?.propDetails?.expectedRent}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
    },
    inventoryCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 14.9,
        elevation: 15,
    },
    imageBlock: {
        width: GlobalStyle.width * 0.33,
    },
    image: {
        width: '100%',
        height: 170,
        // resizeMode: 'contain',
        borderRadius: 8,
    },
    contentBlock: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuStyle: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 0,
    },
    menuItemTitle: {
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 14,
        color: '#000',
    },
    title: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 12,
        color: '#2668E0',
    },
    flexItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colGap12: {
        columnGap: 12,
    },
    colGap6: {
        columnGap: 6,
    },
    mt5: {
        marginTop: 5,
    },
    iconBlock: {
        columnGap: 6,
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderWidth: 1,
        // borderColor: 'red',
        borderColor: '#F2F2F2',
    },
    icon: {
        width: 14,
        height: 14,
    },
    detailText: {
        fontFamily: GlobalStyle.fontSet.Poppins400,
        fontSize: 10,
        color: '#000',
    },
    infoText: {
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 12,
        color: '#000',
    },
    linkText: {
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: 12,
        color: '#6924D9',
        textDecorationLine: 'underline',
    },
    priceText: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 12,
        color: '#6924D9',
    },
    reviewBox: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6,
        borderWidth: 0.4,
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    reviewDot: {
        width: 4,
        height: 4,
        borderRadius: 50,
    },
    reviewText: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 10,
    },
});
