
import React from "react";
import CategoriesList from "@/components/CategoriesList";
import Header from "@/components/Header";
import { Page } from "@/components/Themed";
import Modal from "@/components/ui/Modal";
import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Chip, ListItem, Slider } from "@rneui/themed";
import { useState } from "react";
import { Pressable, Text, View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";

import vendors from "@/mock/vendors.json";
import orders from "@/mock/orders.json";
import Searchbar from "@/components/Searchbar";
import { OrderItem } from "@/types";
import OrderSearchbar from "@/components/OrderSearchModal";
import useOrders from "@/hooks/useOrders";
import OrderListItem from "@/components/Orders/OrderListItem";

export default function OrdersPage() {

    const [searchResults, setSearchResults] = useState<OrderItem[]>([]);

    const { orders, isLoading } = useOrders();

    return (
        <Page style={{ paddingHorizontal: 16, paddingTop: 16 }}>

            <OrderSearchbar setSearchResults={setSearchResults} />
            {
                isLoading ? <ActivityIndicator/> : 
                <ScrollView style={{flex: 1, marginTop: 16}}>
                    {
                        orders?.map((order, index) => (
                            <OrderListItem key={index} order={order} />
                        ))
                    }
                </ScrollView>

            }


        </Page>
    )
}

const FilterModal: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const primaryColor = useThemeColor({}, "primary");

    return (
        <>
            <Pressable onPress={() => setModalOpen(!modalOpen)}>
                <Text>Filter</Text>
                <MaterialCommunityIcons 
                    color={primaryColor} 
                    size={23}
                    name="filter-variant" 
                />
            </Pressable>
        
            <Modal isVisible={modalOpen}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Filter</Text>
                        <Pressable onPress={() => setModalOpen(false)}>
                            <Ionicons name="close" color="red" size={24}/>
                        </Pressable>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Date</Text>
                        <View style={styles.dateContainer}>
                            <Pressable style={styles.dateButton}>
                                <Text>From</Text>
                                <Ionicons name="chevron-down" size={16} color="red" />
                            </Pressable>
                            <Pressable style={styles.dateButton}>
                                <Text>To</Text>
                                <Ionicons name="chevron-down" size={16} color="red" />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Vendor</Text>
                        <View style={styles.chipContainer}>
                            {vendors.map((vendor) => (
                                <Chip
                                    key={vendor.id}
                                    title={vendor.name}
                                    buttonStyle={styles.chip}
                                    titleStyle={styles.chipText}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Price</Text>
                        <Text>From ₦500 to ₦5000</Text>
                        <Slider
                            minimumValue={500}
                            maximumValue={10000}
                            step={100}
                            value={5000}
                            thumbTintColor="red"
                            minimumTrackTintColor="red"
                        />
                        <Text style={styles.aboveText}>Above 10,000</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <View style={styles.categoryContainer}>
                            {['Rice', 'Shawarma', 'Pasta', 'Gr'].map((category) => (
                                <View key={category} style={styles.category}>
                                    <View style={styles.categoryIcon}></View>
                                    <Text>{category}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Pressable style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        padding: 10,
        width: '48%',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 1,
        marginRight: 5,
        marginBottom: 5,
    },
    chipText: {
        color: 'red',
    },
    aboveText: {
        color: 'red',
        alignSelf: 'flex-end',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    category: {
        alignItems: 'center',
    },
    categoryIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'red',
        marginBottom: 5,
    },
    applyButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});