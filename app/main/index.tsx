import { ScrollView, View as DefaultView, StyleSheet, FlatList, Pressable, View } from "react-native";
import { Page, Text } from "../../components/Themed";
import { SearchBar } from "react-native-screens";
import { TextInput } from "react-native";


import { Image, ImageBackground } from "expo-image"

import FontAwesome from "@expo/vector-icons/FontAwesome";
import useThemeColor from "../../hooks/useThemeColor";
import Styles from "../../constants/Styles";
import { Link, useRouter } from "expo-router";
import Searchbar from "../../components/Searchbar";
import CategoriesList from "../../components/CategoriesList";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import useRestaurant from "@/hooks/useRestaurant";
import HomeSearch from "@/components/HomeSearch";



const Recents = [
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
]

export default function HomePage() {
    const router = useRouter()
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<any | null>(null)
    const [isSearchActive, setIsSearchActive] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            supabase
                .from("profiles")
                .select("*")
                .eq("id", session?.user.id)
                .single()
                .then((profile) => {
                    setProfile(profile)
                })
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const { isLoading, data: restaurant } = useRestaurant();

    if(isSearchActive) {
        return (
            <Page  style={{ paddingHorizontal: 16 }}>
                <HomeSearch setIsSearchActive={setIsSearchActive} />
            </Page>
        )
    }

    return (
        <Page style={{ paddingHorizontal: 16 }}>
            <ScrollView contentInset={{ bottom: 128 }} showsVerticalScrollIndicator={false}>

                <DefaultView>
                    <Text>Hi There</Text>
                    <Text style={{ fontWeight: "900", marginVertical: 16, fontSize: 20 }}>What will we be having today?</Text>
                </DefaultView>

                <Pressable onPress={() => setIsSearchActive(true)}>
                    <Searchbar disable={false}/>
                </Pressable>

                <CategoriesList/>

                <DefaultView>
                    <Text style={{ fontWeight: "900", marginVertical: 16, fontSize: 20 }} >Recents</Text>
                    <FlatList
                        horizontal
                        data={Recents}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item: { name, resturant, status } }) => (
                            <Pressable 
                                style={{ 
                                    ...styles.horizontalListItem,
                                    backgroundColor: "#fff",
                                    borderWidth: 1,
                                    borderColor: "#C2C2C2",
                                    borderRadius: 8,
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    gap: 8 
                                }}
                            >
                                <Text style={{ alignSelf: "flex-start", fontWeight: "500" }}>{name}</Text>
                                <Text style={{ alignSelf: "flex-start", fontWeight: "700" }}>{resturant}</Text>

                                <View style={{ backgroundColor: "#FFD686", alignSelf: "flex-end", padding: 6, borderRadius: 16 }}>
                                    <Text style={{ color: "#000", textTransform: "capitalize", fontWeight: "700" }}>
                                        {status}
                                    </Text>
                                </View>
                            </Pressable>
                        )}
                    />
                </DefaultView>

                <DefaultView>
                    <Text style={{ fontWeight: "900", marginVertical: 16, fontSize: 20 }}>Vendor</Text>
                    {
                        isLoading ? 
                        <View>

                        </View>
                        :
                        <>
                            {
                                restaurant?.map((restaurant) => (
                                    <Pressable onPress={() => router.push(`/vendor/${restaurant.id}`)} key={restaurant.id} style={[styles.horizontalListItem, styles.vendorCard]}>
                                        <Image style={{ width: "100%", height: "100%", position: "absolute", zIndex: -10, borderRadius: 12 }} source={require("../../assets/images/food.png")}/>
                                        <Text style={{ color: "#fff" }}>{restaurant.name}</Text>
                                    </Pressable>

                                ))
                            }
                        </>
                    }
                </DefaultView>

            </ScrollView>

        </Page>
    )
}


const styles = StyleSheet.create({
    searchbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        height: 44,
        paddingHorizontal: 10,
    },
    horizontalListItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 12,
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