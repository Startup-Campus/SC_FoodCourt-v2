import { TouchableOpacity, View } from "react-native"
import { Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { OrderStatus } from "@/types";

const RecentOrderCard = ({ name, restaurant, status }: { name: string, restaurant: string, status: number }) => {
    const statusColors = {
        0: "bg-yellow-300",
        1: "bg-[#F7E11E]",
        2: "bg-[#F7E11E]",
        3: "bg-green-300",
        4: "bg-green-600",
        5: "bg-[#F72F2F]",
    }

    
    return (
        <TouchableOpacity style={[styles.horizontalListItem, styles.cardStyle]}>
            <View style={{gap: 4}}>
                <Text style={styles.mediumText}>{name}</Text>
                <Text style={styles.semiboldText}>{restaurant}</Text>
            </View>

            <View className={statusColors[status as 0 | 1 | 2 | 3 | 4]} style={styles.statusContainer}>
                <Text style={styles.statusText}>{OrderStatus[status]}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RecentOrderCard;

const styles = StyleSheet.create({
    horizontalListItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 12,
        left: 16
    },
    cardStyle: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#C2C2C2",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 16,
    },
    mediumText: { alignSelf: "flex-start", fontWeight: "500" },
    semiboldText: { alignSelf: "flex-start", fontWeight: "700" },
    statusContainer: { 
        alignSelf: "flex-end", 
        alignItems: "center",
        padding: 6, 
        borderRadius: 16, 
        width: 88
    },
    statusText: { color: "#000", fontSize: 12, textTransform: "capitalize", fontWeight: "700" }
})