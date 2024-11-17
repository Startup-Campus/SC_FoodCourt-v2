import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Page, Text } from "../../components/Themed";
import useThemeColor from "../../hooks/useThemeColor";
import { Link, useLocalSearchParams, useRouter, router } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Styles from "../../constants/Styles";
import Searchbar from "../../components/Searchbar";
import CategoriesList from "../../components/CategoriesList";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import useSingleRestaurant from "@/hooks/useSingleResturant";
import { scale } from "react-native-size-matters";

export default function VendorDetailPage() {

    const primaryColor = useThemeColor({}, "primary");
    const { id, category } = useLocalSearchParams();
    const { restaurant, isLoading, menuItemsSorted } = useSingleRestaurant(Number(id));
    const availableCategories = Object.keys(menuItemsSorted ?? {});

    const router = useRouter();

    const priceTagColor = {
        color: primaryColor,
        borderColor: primaryColor,
        // backgroundColor: primaryColor + "50"
    }

    return (
        <SafeAreaView>
            <Page>
                <ScrollView>
                    {/* <Header pageTitle="Vendor"/> */}
                    <View style={{ position: "relative", width: "100%" }}>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, marginHorizontal: 12}}>
                            <Pressable onPress={() => router.back()}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                                    <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                                    <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
                                </View>
                            </Pressable>

                            <Link href="/cart/shopping-cart-full" asChild>
                                <MaterialCommunityIcons size={25} name="cart" color={primaryColor}/>
                            </Link>
                        </View>

                        <Text style={{ color: "#fff", marginVertical: 16, marginHorizontal: 16, fontSize: 20, fontWeight: "700" }}>{restaurant?.name}</Text>
                        <ImageBackground source={require("../../assets/images/food.png")} style={[Styles.ImageBackground]}/>

                        <View style={{ marginHorizontal: 16, marginVertical: 16, alignItems: 'flex-end' }}>
                            <Searchbar width= {scale(70)}/>
                        </View>
                    </View>

                    <View style={{marginHorizontal: 16}}>      
                        <Text style={styles.subtitle}>Select item, then add to cart</Text>
                    </View>

                    <CategoriesList onChange={(category) => router.setParams({ category })}/>

                    <View style={[Styles.DefaultPaddingX, Styles.DefaultSpaceY]}>
                        {
                            isLoading ? <ActivityIndicator/> :
                            !category || category == "all" ?
                            availableCategories.length === 0 ? 
                            <View className="px-3 py-16 flex flex-col items-center text-center gap-3">
                                <Text className="text-center">There are no menu items avialable for this vendor.</Text>
                                <Text>Please check back again soon.</Text>
                            </View> 
                            :
                            availableCategories.map((category, index) => (
                                <View key={category}>
                                    <View style={{paddingTop: 4, paddingBottom: 24}}>
                                        <Text style={[priceTagColor, { fontWeight: "700", fontSize: 20  }]}>{category}</Text>
                                    </View>
                                    {
                                        menuItemsSorted![category]?.map((dish, index) => (
                                            <Pressable 
                                                key={index} 
                                                style={styles.listItem}
                                                onPress={() => router.push({
                                                    pathname: "/item/[id]",
                                                    params: {
                                                        id: dish.id,
                                                        resturantId: restaurant?.id
                                                    }
                                                })}                                            
                                            >
                                                <View style={{ width: "70%" }}>
                                                    <Text style={{fontWeight: 600, fontSize: 16}}>{dish.name}</Text>
                                                </View>
                                                <View style={[styles.priceTag, priceTagColor]}>
                                                    <Text style={[priceTagColor]}>N {dish.price}</Text>
                                                </View>
                                            </Pressable>
                                        ))
                                    }
                                </View>
                            ))
                            :
                            <View>
                                <Text style={[priceTagColor, { fontWeight: "700" }]}>{category}</Text>
                                {
                                    menuItemsSorted![category as string]?.map((dish, index) => (
                                        <Pressable 
                                            key={index} 
                                            style={styles.listItem}
                                            onPress={() => router.push({
                                                pathname: "/item/[id]",
                                                params: {
                                                    id: dish.id,
                                                    resturantId: restaurant?.id
                                                }
                                            })}
                                        >
                                            <View style={{ width: "70%" }}>
                                                <Text style={{fontWeight: 600, fontSize: 16}}>{dish.name}</Text>
                                            </View>
                                            <Text style={[styles.priceTag, priceTagColor]}>N {dish.price}</Text>
                                        </Pressable>
                                    ))
                                }
                            </View>
                        }
                    </View>

                </ScrollView>
            </Page>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        height: 70
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 54,
    },
    priceTag: {
        height: '60%',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "#F72F2F4C"
    },
    subtitle: { 
        textAlign: 'right', 
        marginBottom: 4 
    },

})