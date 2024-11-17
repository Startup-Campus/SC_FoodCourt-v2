import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, TextInput, StyleSheet, Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { scale, verticalScale } from "react-native-size-matters";

const Searchbar: React.FC<{setQuery?: React.Dispatch<React.SetStateAction<any>>, query?: any, disable?: any, width?: string | number}> = ({query, setQuery, disable}, width= '100%') => {

    const primary = useThemeColor({}, "primary");
    // const [query, setQuery] = useState("");
    // const debouncedQuery = useDebounce(query, 500);

    // useEffect(() => {
    //     router.setParams({ query: debouncedQuery });
    // }, [debouncedQuery])

    const searchbarStyle = {
        borderColor: primary
    }

    return (
        <View style={[styles.searchbar, searchbarStyle]}>
            <FontAwesome color={primary} name="search" size={24}/>
            {/* <Text className="flex-1 font-semibold ml-2" style={{color: primary}}>Search</Text> */}
            <TextInput 
                style={styles.searchInput}
                placeholder="Search" 
                className="flex-1 font-semibold ml-2"
                placeholderTextColor={primary}
                onChangeText={setQuery}
                value={query}
                editable={disable}
                selectTextOnFocus={disable}
            />
        </View>

    )
};

const styles = StyleSheet.create({
    searchInput: { flex: 1, marginLeft: 8},
    searchbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderWidth: 1, borderRadius: 24, backgroundColor: 'f72f2f4c', height: scale(40)    }
})

export default Searchbar;