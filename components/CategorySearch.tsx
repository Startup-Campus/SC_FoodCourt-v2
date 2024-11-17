import React, { useEffect, useState } from 'react';

import { router } from "expo-router";
import { Product } from '@/types';
import useThemeColor from "../hooks/useThemeColor";
import useDebounce from "@/hooks/useDebounce";
import Searchbar from './Searchbar';



const CategorySearchbar: React.FC<{setSearchResults: React.Dispatch<React.SetStateAction<Product[]>>, products: Product[]}> = ({setSearchResults, products}) => {
  const primary = useThemeColor({}, "primary");
  const [categoryQuery, setCategoryQuery] = useState("");
  const debouncedQuery = useDebounce(categoryQuery, 500);

  useEffect(() => {
    router.setParams({ query: debouncedQuery });

    if (debouncedQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = products.filter(item =>
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    setSearchResults(filteredResults as Product[]);
  }, [debouncedQuery]);


  return (
    <Searchbar setQuery={setCategoryQuery} query={categoryQuery} />
  );
};

export default CategorySearchbar;