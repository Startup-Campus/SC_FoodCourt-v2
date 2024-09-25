import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Image, Pressable } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import useThemeColor from "../hooks/useThemeColor";
import useDebounce from "@/hooks/useDebounce";
import orders from "@/mock/orders.json"
import { OrderItem } from '@/types';
import Searchbar from './Searchbar';

const OrderSearchbar: React.FC<{setSearchResults: React.Dispatch<React.SetStateAction<OrderItem[]>>}> = ({setSearchResults}) => {
  const primary = useThemeColor({}, "primary");
  const [orderQuery, setOrderQuery] = useState("");
  const debouncedQuery = useDebounce(orderQuery, 500);

  useEffect(() => {
    router.setParams({ query: debouncedQuery });

    if (debouncedQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = orders.filter(item =>
      item.orderId.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      item.products.some(product =>
        product.product.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    );

    setSearchResults(filteredResults as OrderItem[]);
  }, [debouncedQuery]);


  return (
    <Searchbar setQuery={setOrderQuery} query={orderQuery} />
  );
};

export default OrderSearchbar;