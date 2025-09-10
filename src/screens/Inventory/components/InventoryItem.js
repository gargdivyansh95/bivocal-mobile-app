import React from 'react';
import GlobalStyle from '../../../style/globalstyle';
import { Image, StyleSheet, Text, View } from 'react-native';
import PropertyImage from '../../../assets/images/property.jpg';
import CropIcon from '../../../assets/images/crop.png';
import KeyIcon from '../../../assets/images/key.png';
import LocationIcon from '../../../assets/images/location.png';
import BuildingIcon from '../../../assets/images/building1.png';
import CalendarIcon from '../../../assets/images/calendar.png';
import RupeeIcon from '../../../assets/images/rupee.png';

export default function InventoryItem() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.inventoryCard}>
                <View style={styles.imageBlock}>
                    <Image source={PropertyImage} style={styles.image} />
                </View>
                <View style={styles.contentBlock}>
                    <Text style={styles.title}>2 BHK Furnished Flat for Rent in Saya Zion at Noida</Text>
                    <View style={[styles.flexItem, styles.colGap12, styles.mt5]}>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={CropIcon} style={styles.icon} />
                            <Text style={styles.detailText}>1200 sqft</Text>
                        </View>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={KeyIcon} style={styles.icon} />
                            <Text style={styles.detailText}>Yes</Text>
                        </View>
                    </View>
                    <View style={[styles.flexItem, styles.colGap6, styles.mt5]}>
                        <Image source={LocationIcon} style={styles.icon} />
                        <Text style={styles.infoText}>Noida Extension, Uttar Pradesh</Text>
                    </View>
                    <View style={[styles.flexItem, styles.colGap6, styles.mt5]}>
                        <Image source={BuildingIcon} style={styles.icon} />
                        <Text style={styles.linkText}>Solitaire VVIP Homes</Text>
                    </View>
                    <View style={[styles.flexItem, styles.colGap12, styles.mt5]}>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={CalendarIcon} style={styles.icon} />
                            <View>
                                <Text style={styles.detailText}>Available from</Text>
                                <Text style={styles.priceText}>DD/MM/YY</Text>
                            </View>
                        </View>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={RupeeIcon} style={styles.icon} />
                            <View>
                                <Text style={styles.detailText}>Monthly Rent</Text>
                                <Text style={styles.priceText}>₹12,345.0</Text>
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
    title: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 14,
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
});
