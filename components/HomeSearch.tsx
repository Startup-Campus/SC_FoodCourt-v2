import React, { SetStateAction, useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Image, Pressable, StyleSheet } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import useThemeColor from "../hooks/useThemeColor";
import useDebounce from "@/hooks/useDebounce";
import categories from "@/mock/categories.json"
import vendors from "@/mock/vendors.json"
import products from "@/mock/products.json"
import MenuItem from '@/components/MenuItem';
import CategoriesList from './CategoriesList';
import { Product, Vendor, Category } from '@/types';

type SearchResult = 
  | (Product & { vendorName: string; categoryName: string; type: string })
  | (Vendor & { type: string })
  | (Category & { type: string });

const HomeSearch: React.FC<{setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>}> = ({setIsSearchActive}) => {
  const primary = useThemeColor({}, "primary");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchbarStyle = {
    borderColor: primary
}

  useEffect(() => {
    router.setParams({ query: debouncedQuery });

    if (debouncedQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredProducts = products.filter(item =>
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).map(item => ({
      ...item,
      vendorName: vendors.find(v => v.id === item.vendorId)?.name || 'Unknown Vendor',
      categoryName: categories.find(c => c.id === item.categoryId)?.name || 'Uncategorized',
      type: 'product'
    }));

    const filteredVendors = vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).map(vendor => ({
      ...vendor,
      type: 'vendor'
    }));

    const filteredCategories = categories.filter(category =>
      category.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).map(category => ({
      ...category,
      type: 'category'
    }));

    setSearchResults([...filteredProducts, ...filteredVendors, ...filteredCategories]);
  }, [debouncedQuery]);

  const productResults = searchResults.filter(result => result.type === 'product') as (Product & { vendorName: string; categoryName: string })[];
  const vendorResults = searchResults.filter(result => result.type === 'vendor') as Vendor[];
  const categoryResults = searchResults.filter(result => result.type === 'category') as Category[];

  return (
    <View className="flex-1">
      <View style={[styles.searchbar, searchbarStyle]} className="flex-row items-center rounded-full border-2 h-11 px-3 mb-2">
        <Pressable onPress={() => setIsSearchActive(false)} className="mr-2">
            <FontAwesome name="arrow-left" size={16} color={primary} />
        </Pressable>
        <TextInput 
          placeholder="Search..." 
          style={{flex: 1, marginLeft: 8}}
          className="flex-1 font-semibold ml-4"
          placeholderTextColor={primary}
          onChangeText={setQuery}
          value={query}
        />
      </View>
      {searchResults.length === 0 && query !== '' ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Sorry this item cannot be found</Text>
        </View>
      ) : ( query !== '' && (
        <View>
          <View className='mt-20' style={{marginTop: 20}}>
            <Text style={{fontWeight: "900", fontSize: 20 }}>
                Products
            </Text>
            {productResults.length > 0 ? (
              productResults.map(product => (
                <MenuItem item={product} />
              ))
            ) : (
              <Text>No products found</Text>
            )}
          </View>
          <View style={{marginTop: 20}}>
            {categoryResults.length > 0 ? (
              <CategoriesList filteredCategories={categoryResults}/>
            ) : (
              <Text>No categories found</Text>
            )}
          </View>
          <View style={{marginTop: 20}}>
              <Text style={{fontWeight: "900", fontSize: 20 }}>
                  Vendors
              </Text>
            {vendorResults.length > 0 ? (
              vendorResults.map(vendor => (
                <View key={vendor.id}>
                  <Text>{vendor.name}</Text>
                </View>
              ))
            ) : (
              <Text>No vendors found</Text>
            )}
          </View>
        </View>)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    searchbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        height: 44,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
})

export default HomeSearch;