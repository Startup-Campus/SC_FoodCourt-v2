import { Pressable, ScrollView, View } from "react-native";
import { Page, Text } from "../../components/Themed";
import useThemeColor from "../../hooks/useThemeColor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Button } from "@rneui/themed";
import useSingleRestaurant from "@/hooks/useSingleResturant";
import useCart from "@/hooks/useCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import products from "@/mock/products.json";

export default function MenuItemDetail() {
    const router = useRouter();
    const { id, resturantId } = useLocalSearchParams();
    const { getSingleMenuItem } = useSingleRestaurant(Number(resturantId));
    const menuItem = getSingleMenuItem(Number(id));
    const [quantity, setQuantity] = useState(1);
    const { currentUser } = useCurrentUser();
    const { addItem } = useCart(currentUser?.id!);


    return (
        <Page className="flex-1 bg-white">
            <View className="relative h-48">
                <ImageBackground
                    source={require("../../assets/images/food.png")}
                    className="w-full h-full"
                    resizeMode="cover"
                >
                    <View className="absolute top-0 left-0 p-4 flex-row justify-between items-center w-full">
                        <Pressable onPress={() => router.back()}>
                            <FontAwesome name="bars" size={24} color="black" />
                        </Pressable>
                        <Text className="text-black text-lg font-semibold">Mexican Shawarma</Text>
                        <FontAwesome name="shopping-cart" size={24} color="red" />
                    </View>
                </ImageBackground>
            </View>

            <ScrollView className="p-4 space-y-4">
                <Text className="text-xl font-semibold">{menuItem?.name}</Text>
                <Text className="text-gray-500">{menuItem?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</Text>
                
                <View className="flex-row items-center space-x-4">
                    <Pressable onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="p-2 bg-gray-200 rounded-full">
                        <FontAwesome name="minus" size={16} color="black" />
                    </Pressable>
                    <Text className="text-lg">{quantity}</Text>
                    <Pressable onPress={() => setQuantity(quantity + 1)} className="p-2 bg-gray-200 rounded-full">
                        <FontAwesome name="plus" size={16} color="black" />
                    </Pressable>
                </View>

                <View className="space-y-2">
                {menuItem?.addons.map((addon, index: number) => (
                        <Pressable key={index} className="border-b border-gray-300 py-2">
                            <Text className="text-red-500">{addon.foodName}</Text>
                        </Pressable>
                    ))}
                </View>

                <View className="pt-4">
                    <Text className="text-gray-400">Notes:</Text>
                    <Text className="text-gray-500">E.g. no cucumber, no onions, etc.</Text>
                </View>

                <Button
                    onPress={() => addItem({
                        user_id: currentUser?.id!,
                        menu_item_id: menuItem?.id!,
                        quantity: quantity,
                    })}
                    color="#F72F2F"
                    className="mt-4 py-3 rounded-full"
                    title={`Add to Cart (₦${(menuItem?.price || 0) * quantity})`}
                />
            </ScrollView>
        </Page>
    );
}
