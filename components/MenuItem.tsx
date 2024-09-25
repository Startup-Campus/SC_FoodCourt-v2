import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Product } from '@/types';

interface MenuItemProps {
    item: Product
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
    return (
        <Link href={`/item/${item.id}?restaurantId=${item.vendorId}`} key={item.id}>
            <View style={styles.menuItem}>
                <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
                <View style={styles.priceTag}>
                    <Text style={styles.price}>₦ {item.price}</Text>
                </View>
            </View>
        </Link>
    );
};

const styles = StyleSheet.create({
    itemInfo: { flex:1, marginRight: 16 },
    itemName: { fontSize: 18, fontWeight: 'bold' },
    itemDescription: { color: 'gray', marginTop: 4 },
    priceTag: { backgroundColor: 'red', borderRadius: 16, padding: 8 },
    price: { color: 'white', fontWeight: 'bold' },
    menuItem: { flexDirection: 'row', justifyContent: 'space-between', padding:16, borderBottomWidth: 1, borderBottomColor: '#eee', width: "100%"},
})

export default MenuItem;