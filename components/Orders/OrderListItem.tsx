import { View, Text } from "react-native";

export default function OrderListItem({ order }: { order: any }) {
    return (
        <View className="border-[1px] rounded-xl p-3 my-2">
            <Text className="font-bold text-xl">Order No: {order?.id}</Text>

            <View className="my-2" style={{gap: 8}}>
                {
                    order?.order_items?.map(({ menu_items, quantity, menu_item_id }: any) => (
                        <View key={menu_item_id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontWeight: 400, fontSize: 16}}>{quantity}x   {(menu_items as any).name}</Text>
                            <Text>{(menu_items as any).price}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}