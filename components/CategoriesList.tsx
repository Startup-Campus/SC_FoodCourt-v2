import React, { useState } from "react"
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import {Link, router, useRouter} from "expo-router";
import Styles from "../constants/Styles";
import { X } from "lucide-react-native";
import { Category } from "@/types";
import { CATEGORIES } from "@/utils/constants";


export type CategoryName = typeof CATEGORIES[number]['name'];

interface CategoriesListProps {
    onChange?: (category: CategoryName|"all") => void,
    filteredCategories?: Category[]
}

const CategoriesList: React.FC<CategoriesListProps> = ({ onChange, filteredCategories }) => {
    const [_, setCategory] = useState<CategoryName>();
    const data = filteredCategories ? filteredCategories : CATEGORIES;

    const handleChange = (category: CategoryName) => {
        if (category === _) {
            setCategory(undefined);
            onChange && onChange("all");
            return
        }
        setCategory(category);
        onChange && onChange(category)
    }

    return (
        <View style={Styles.DefaultSpaceY}>
            <Text style={{ marginBottom: 8, fontWeight: "900", fontSize: 20 }}>
                Categories
            </Text>
            <FlatList
                horizontal
                data={data}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: category }) => (
                    <Link href={{
                        pathname: '/category/[id]',
                        params: { id: category.id }
                    }} asChild>
                        <Pressable onPress={() => handleChange(category.name)} style={styles.horizontalListItem}>
                            <View style={styles.itemContainer}>
                                {
                                    category.name === _ ? <X /> :

                                    <Image style={{ width: 50, height: 50 }} source={category.image} />
                                }
                            </View>
                            <Text>{category.name}</Text>
                        </Pressable>
                    </Link>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    containerPadding: {
        paddingLeft: 12
    },
    horizontalListItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 12
    },
    itemContainer: {
        borderWidth: 1, 
        borderRadius: 999,
        width: 70,
        height: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    vendorCard: {
        backgroundColor: "red",
        marginRight: 0,
        height: 100,
        borderRadius: 12,
        marginVertical: 7,
        justifyContent: "center",
        position: "relative"
    }
})

export default CategoriesList;