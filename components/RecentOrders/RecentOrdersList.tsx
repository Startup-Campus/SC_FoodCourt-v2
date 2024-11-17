import { ActivityIndicator, FlatList, View } from "react-native"
import RecentOrderCard from "./RecentOrdersCard"
import { Text } from "@/components/Themed";


const RecentOrdersList = ({ recentOrders }: { recentOrders: any[] }) => {
    
    if (!recentOrders) {
        return (
            <View className="py-6 px-3 w-full flex flex-row item-center justify-center border border-zinc-800 rounded-2xl">
                <ActivityIndicator/>
            </View>
        )
    }

    if (recentOrders?.length === 0) {
        return (
            <View className="py-6 px-3 w-full flex flex-row item-center justify-center border border-zinc-800 rounded-2xl">
                <Text>You have not made any recent orders</Text>
            </View>
        )
    }

    
    return (
        <FlatList
            horizontal
            data={recentOrders}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: { name, restaurant, status } }) => (
                <RecentOrderCard
                    name={name}
                    restaurant={restaurant}
                    status={status}
                />
            )}
        />
    )
}


export default RecentOrdersList