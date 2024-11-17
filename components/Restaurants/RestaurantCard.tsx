import { useRouter } from "expo-router"
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Text } from "@/components/Themed";
import { Scale, verticalScale } from "react-native-size-matters";


const RestaurantCard = ({ id, name, image_url }: { id: number, name: string, image_url: string | null }) => {
    const router = useRouter();

    const moveToVendorPage = () => router.push(`/vendor/${id}`)

    return (
        <TouchableOpacity 
            onPress={moveToVendorPage} 
            style={[styles.horizontalListItem, styles.vendorCard]}
        >
            {
                !image_url ? 
                <Image 
                    style={styles.backgroundImage} 
                    source={require("@/assets/images/food.png")}
                />
                :
                <Image 
                    style={styles.backgroundImage} 
                    source={{ uri: image_url }}
                />
            }
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, }}>
                {
                    !image_url ?
                    <Image
                        style={styles.restaurantLogo} 
                        source={require("@/assets/images/food.png")}
                    />
                    :
                    <Image 
                        style={styles.restaurantLogo} 
                        source={{ uri: image_url }}
                    />
                }
                {/* <View style={{backgroundColor: 12}}/> */}
                <View>
                    {/* <Text style={[styles.text, {fontSize: 20}]}>{name}</Text> */}
                    <Text style={styles.text}>{name}</Text>

                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    horizontalListItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 12,
    },
    vendorCard: {
        backgroundColor: "black",
        marginRight: 0,
        height: verticalScale(150),
        borderRadius: 12,
        marginVertical: 7,
        justifyContent: "flex-end",
        alignItems: 'flex-start'
    },
    backgroundImage: { 
        width: "100%", 
        height: "100%", 
        position: "absolute", 
        zIndex: -10, 
        borderRadius: 12 ,
        tintColor: "#11111",
    },
    text: { 
        color: "#fff", 
        fontSize: 16, 
        fontWeight: 600
    },
    restaurantLogo: {
        width: 40,
        height: 40,
        borderRadius: 82,
        borderWidth: 3,
        borderColor: 'white'
    }
})

export default RestaurantCard;