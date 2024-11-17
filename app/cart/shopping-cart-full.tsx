import Button from "../../components/ui/Button";
import { Text, Page } from '../../components/Themed';
import { Image } from "expo-image";
import { Pressable, View, ScrollView} from "react-native";
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import CartItem from '../../components/CartItem';
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import useCart from "@/hooks/useCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import { calculateServiceCharge, groupCartItemsByRestaurant } from "@/utils/functions";
import usePayment from "@/hooks/usePayment";




export default function CartFullPage() {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { cartItems: dbCartItems, refreshCart } = useCart(currentUser?.id!);
  const [localCartItems, setLocalCartItems] = useState(dbCartItems || []);
  const { initializeTransactionForPaystack } = usePayment();

  useEffect(() => {
    setLocalCartItems(dbCartItems || []);
  }, [dbCartItems]);

  const totalPrice = localCartItems?.reduce((prev, curr) => {
    return prev + (curr.menu_item.price * curr.quantity) + (curr?.addon_price || 0)
  }, 0) || 0;

  const subCharge = calculateServiceCharge(totalPrice || 0);
  const convertToKobo = 100;

  const handleQuantityChange = (menuItemId: number, newQuantity: number) => {
    setLocalCartItems(prevItems => 
      prevItems.map(item => 
        item.menu_item_id === menuItemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const confirmCharge = async () => {
    const vendorShares = groupCartItemsByRestaurant(localCartItems!);

    return await initializeTransactionForPaystack({
      email: currentUser?.email!,
      amount: totalPrice + subCharge,
      subaccounts: vendorShares.map((vendor) => ({
        share: vendor.total_price * convertToKobo,
        subaccount: vendor.restaurant_subaccount_code
      })),
      cartItems: localCartItems!,
      customerName: currentUser?.full_name!,
    })

  }

  return (
    <View>
      <Page>
        <View style={{flexDirection: 'row',justifyContent:'space-between', width: '55%', alignItems: 'center', marginTop: 50}}>
          <Pressable
            onPress={() => router.back()}
            style={{marginTop: 10, marginLeft: 10}}
          >
            <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
              <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
              <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
            </View>
          </Pressable>
    
          <Text style={{fontWeight:'bold', fontSize: 24, textAlign:'center', marginTop: 5}}>Cart</Text>
        </View>

        <View style={{width: '100%', height:'10%', alignItems: 'center',marginTop: -15 }}>
          <Image
              source={require("assets/images/shopping-cart-stage.svg")}
              style={{ width: '65%', height: '100%', resizeMode: 'contain' }}
          />
        </View>

        <ScrollView contentInset={{ bottom: 192 }}>
          <View style={{paddingBottom: 16}}>
            {localCartItems?.map((foodItem) => (
              <CartItem
                id={foodItem.id}
                key={foodItem.id}
                name={foodItem.menu_item.name}
                description={foodItem.menu_item.description}
                price={foodItem.menu_item.price}
                quantity = {foodItem.quantity}
                restaurantId={foodItem.menu_item.resturant_id}
                addon={{ name: foodItem.addon_name!, price: foodItem.addon_price! }}
                onQuantityChange={(newQuantity) => 
                  handleQuantityChange(foodItem.menu_item_id, newQuantity)
                }
              />
            ))}
          </View>

          <View style={{borderBottomWidth: 1.5, borderTopWidth: 1.5, borderColor: '#fe0000', marginHorizontal: 16, gap: 16}}>
              <View style={{justifyContent: 'space-between',flexDirection:'row', marginTop: 16}}>
                <Text style={{fontSize: 16, fontWeight: 500}}>Subtotal</Text>
                <Text style={{fontWeight:'bold', fontSize: 16}}>N {totalPrice}</Text>
              </View>

              <View style={{justifyContent: 'space-between',flexDirection:'row', marginBottom: 16}}>
                <Text style={{fontSize: 16, fontWeight: 500}}>Service Charge</Text>
                <Text style={{fontWeight:'bold', fontSize: 16}}>N {subCharge}</Text>
              </View>
          </View>

          <View style={{justifyContent: 'space-between', flexDirection:'row', marginTop:16, marginBottom: 48, marginHorizontal: 16}}>
              <Text style={{fontWeight:'bold', fontSize: 18}}>Total</Text>
              <Text style={{fontWeight:'bold', fontSize: 18}}>N {totalPrice + subCharge}</Text>
          </View>
          <Button 
            color="#F72F2F" 
            style={{ alignSelf: "center", width: "100%" }} 
            titleStyle={{ textAlign: "center", padding: 32, fontSize: 18 }} 
            buttonStyle={{ marginHorizontal: 16 }}
            onPress={confirmCharge}
          >
            Checkout
          </Button>
        </ScrollView>
 
      </Page>
    </View>
  )
}
