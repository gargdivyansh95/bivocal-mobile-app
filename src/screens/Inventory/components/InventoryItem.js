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
import SwiperFlatList from 'react-native-swiper-flatlist';
import { STAGE_IMAGE_URL } from '../../../constants/constants';

export default function InventoryItem(props) {

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleEdit = () => {
        props.handleEditDetails(props.item);
        closeMenu();
    };

    const renderItem = ({ item, index }) => {
        return (
            <Image key={`${index}`} source={{ uri: `${STAGE_IMAGE_URL}` + item?.original }} style={[styles.imageStyle]} />
        );
    };

    const rentOutStatus = props?.item?.rentOutReq?.responseType;

    return (
        <View style={styles.mainContainer}>
            <Pressable style={styles.inventoryCard} onPress={handleEdit}>
                <View style={styles.imageBlock}>
                    <SwiperFlatList
                        autoplay
                        autoplayDelay={2}
                        autoplayLoop
                        data={props?.item?.propertyImage}
                        renderItem={renderItem}
                    />
                    {/* <Image source={PropertyImage} style={styles.image} /> */}
                </View>
                <View style={styles.contentBlock}>
                    <View style={[styles.topBar]}>
                        <View style={[styles.reviewBox, {
                            borderColor: props?.item?.status === 0 ? '#FFA500' : '#05C168',
                            backgroundColor: props?.item?.status === 0 ? '#FFA5001A' : '#05C1681A',
                        }]}>
                            <View style={[styles.reviewDot, { backgroundColor: props?.item?.status === 0 ? '#FFA500' : '#05C168' }]} />
                            <Text style={[styles.reviewText, { color: props?.item?.status === 0 ? '#FFA500' : '#05C168' }]}>{props?.item?.status === 0 ? 'Under Review' : 'Published'}</Text>
                        </View>
                        <Menu visible={visible} onDismiss={closeMenu}
                            anchor={
                                <Pressable onPress={openMenu}>
                                    <Image source={MoreIcon} style={{ width: 18, height: 18 }} />
                                </Pressable>
                            }
                            contentStyle={styles.menuStyle}
                        >
                            <Menu.Item titleStyle={styles.menuItemTitle} onPress={handleEdit} title="Edit Details" />
                            {rentOutStatus === 1 || rentOutStatus === 3 ? null :
                                <Menu.Item titleStyle={styles.menuItemTitle} onPress={() => props.openMarkRentOutDialog(props?.item?.id)} title="Mark Rent-Out" />
                            }
                        </Menu>
                    </View>
                    <Text style={styles.title}>{props?.item?.title}</Text>
                    <View style={[styles.flexItem, styles.colGap12, styles.mt5]}>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={CropIcon} style={styles.icon} />
                            <Text style={styles.detailText}>{props?.item?.propDetails?.propertyArea} sqft</Text>
                        </View>
                        <View style={[styles.flexItem, styles.iconBlock]}>
                            <Image source={KeyIcon} style={styles.icon} />
                            <Text style={styles.detailText}>{props?.item?.propDetails?.keyy === true ? 'Yes' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={[styles.flexItem, styles.colGap6, styles.mt5]}>
                        <Image source={LocationIcon} style={styles.icon} />
                        <Text style={styles.infoText}>{props?.item?.locality?.name}, {props?.item?.city?.name}, {props?.item?.state?.name}</Text>
                    </View>
                    <View style={[styles.flexItem, styles.colGap6, styles.mt5]}>
                        <Image source={BuildingIcon} style={styles.icon} />
                        <Text style={styles.linkText}>{props?.item?.society?.name}</Text>
                    </View>
                    <View style={[styles.flexItem, styles.colGap6, styles.mt5]}>
                        <View style={[styles.flexItem, styles.iconBlock, { flex: 1 }]}>
                            <Image source={CalendarIcon} style={styles.icon} />
                            <View style={{flex: 1}}>
                                <Text style={[styles.detailText]}>Available from</Text>
                                <Text style={styles.priceText}>{props?.item?.propDetails?.availableFrom ? moment(props?.item?.propDetails?.availableFrom).format('DD/MM/YY') : 'N/A'}</Text>
                            </View>
                        </View>
                        <View style={[styles.flexItem, styles.iconBlock, { flex: 1 }]}>
                            <Image source={RupeeIcon} style={styles.icon} />
                            <View style={{flex: 1}}>
                                <Text style={[[styles.detailText]]}>Monthly Rent</Text>
                                <Text style={styles.priceText}>₹{props?.item?.propDetails?.expectedRent}</Text>
                            </View>
                        </View>
                    </View>
                    {props?.item?.rentOutReq &&
                        <View style={styles.statusContainer}>
                            <Text style={styles.detailText}>Rent Out Status:</Text>
                            <View style={[styles.statusBox, {
                                borderColor: rentOutStatus === 3 ? '#FFA500' :
                                    rentOutStatus === 2 ? '#FF0000' : '#05C168',
                                backgroundColor: rentOutStatus === 3 ? '#FFA5001A' : rentOutStatus === 2 ? '#FF00001A' : '#05C1681A',
                            }]}>
                                <Text style={[styles.statusText, { color: rentOutStatus === 3 ? '#FFA500' : rentOutStatus === 2 ? '#FF0000' : '#05C168' }]}>
                                    {rentOutStatus === 3 ? 'Pending' : rentOutStatus === 2 ? 'Rejected' : 'Accepted'}
                                </Text>
                            </View>
                        </View>
                    }
                </View>
            </Pressable>
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
        borderWidth: 0.5,
        borderColor: '#F2F2F2',
        borderRadius: 8,
        overflow: 'hidden',
    },
    // image: {
    //     width: '100%',
    //     height: 170,
    //     // resizeMode: 'contain',
    //     borderRadius: 8,
    // },
    imageStyle: {
        width: GlobalStyle.width * 0.33,
        // height: 170,
        borderRadius: 8,
        resizeMode: 'contain',
    },
    contentBlock: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
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
        flex: 1,
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
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 4,
        marginTop: 6,
    },
    statusBox: {
        borderWidth: 0.4,
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    statusText: {
        fontFamily: GlobalStyle.fontSet.Poppins600,
        fontSize: 10,
    },
});
