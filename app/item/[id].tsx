import { Pressable, ScrollView, View, Text as RnText, TouchableOpacity } from "react-native";
import { Page, Text } from "../../components/Themed";
import useThemeColor from "../../hooks/useThemeColor";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { ImageBackground } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useSingleRestaurant from "@/hooks/useSingleResturant";
import useCart from "@/hooks/useCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Clock, Minus, Plus } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuItemAddons from "@/components/MenuItemAddons";
import { Entypo } from "@expo/vector-icons";
import Styles from "@/constants/Styles";

export default function MenuItemDetail() {
  const router = useRouter();
  const { id, resturantId } = useLocalSearchParams();

  const { getSingleMenuItem } = useSingleRestaurant(Number(resturantId));
  const menuItem = getSingleMenuItem(Number(id));
  const [quantity, setQuantity] = useState(1);
  const { currentUser } = useCurrentUser();
  const [selectedAddon, setAddon] = useState<{ name: string, price: number }|null>(null);

  const placeAddOn = (data: {name: string, price: number }|null) => {
    if (!selectedAddon || selectedAddon.name !== data?.name) {
      return setAddon(data);
    }
    return setAddon(null);
  }

  const { addItem, updateItem, getSingleCartItem } = useCart(currentUser?.id!);

  const primary = useThemeColor({}, "primary");

  const reduceQuantity = () => {
    if (quantity <= 1) return;
    return setQuantity(quantity - 1);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);

  const addItemToCart = () => {
    const existingItem = getSingleCartItem(menuItem?.id!);

    if (existingItem) {
      updateItem({id: existingItem.id, quantity: existingItem.quantity + quantity});
    } else {
      addItem({
        user_id: currentUser?.id!,
        menu_item_id: menuItem?.id!,
        quantity: quantity,
        addon_name: selectedAddon?.name,
        addon_price: selectedAddon?.price,
      });
    }

    router.back() //Usiere- it'a too quick
  };

  const totalPrice = (menuItem?.price || 0) * quantity + (selectedAddon?.price || 0);

  return (
    <SafeAreaView>
      <Page className="flex-1 bg-white h-screen">
        <View className="relative h-48">
          <ImageBackground
            source={require("@/assets/images/food.png")}
            style={[Styles.ImageBackground]}
          >

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, marginHorizontal: 12}}>
            <Pressable onPress={() => router.back()}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                    <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                    <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
                </View>
            </Pressable>

            <Link href="/cart/shopping-cart-full" asChild>
                <MaterialCommunityIcons size={25} name="cart" color={primary}/>
            </Link>
          </View>

          </ImageBackground>
        </View>

        <ScrollView className="p-4 space-y-4">
          <View className="flex flex-row items-center justify-between">
            <View className="w-2/3">
              <Text className="text-xl font-semibold">{menuItem?.name}</Text>
              <Text className="text-gray-500">
                {menuItem?.description || "No description available for this item."}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity onPress={reduceQuantity} className="p-2 border border-primary rounded-full">
                <Minus stroke={primary} className="text-primary" />
              </TouchableOpacity>

              <Text className="text-xl">{quantity}</Text>

              <TouchableOpacity onPress={increaseQuantity} className="p-2 border border-primary rounded-full">
                <Plus stroke={primary} className="text-primary" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="my-3 flex flex-col">
            <Text className="font-medium">Category: {menuItem?.category}</Text>
          </View>

          <View className="flex flex-row items-center gap-2 my-3">
            <Clock stroke={primary} />
            <Text>{menuItem?.preparation_time || '15 mins'}</Text>
          </View>

          <MenuItemAddons 
            addons={menuItem?.add_ons!} 
            selectedAddon={selectedAddon}
            placeAddOn={placeAddOn}
          />

          <TouchableOpacity
            onPress={addItemToCart}
            disabled={menuItem?.quantity! < menuItem?.warning_stock_value!}
            className="bg-primary disabled:bg-red-600 rounded-3xl py-4 flex flex-row items-center justify-center mt-32"
            style={{borderRadius: 50}}
          >
            <RnText className="text-white font-medium text-lg">Add to Cart (₦ {totalPrice})</RnText>
          </TouchableOpacity>
        </ScrollView>
      </Page>
    </SafeAreaView>
  );
}
