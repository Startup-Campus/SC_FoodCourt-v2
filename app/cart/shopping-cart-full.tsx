import Button from "../../components/ui/Button";
import { Text, Page } from '../../components/Themed';
import { Image } from "expo-image";
import { Pressable, View, ScrollView} from "react-native";
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';

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
  const { cartItems, refreshCart } = useCart(currentUser?.id!);
  const { initializeTransactionForPaystack } = usePayment();
  const totalPrice = cartItems?.reduce((prev, curr) => prev + (curr.menu_item.price * curr.quantity), 0) || 0;

  const subCharge = calculateServiceCharge(totalPrice || 0);
  const convertToKobo = 100;

  const confirmCharge = async () => {
    const vendorShares = groupCartItemsByRestaurant(cartItems!);

    return await initializeTransactionForPaystack({
      email: currentUser?.email!,
      amount: totalPrice + subCharge,
      subaccounts: vendorShares.map((vendor) => ({
        share: vendor.total_price * convertToKobo,
        subaccount: vendor.restaurant_subaccount_code
      })),
      cartItems: cartItems!,
      customerName: currentUser?.full_name!,
    })

  }

  return (
    <SafeAreaView>
      <Page>
      <View style={{flexDirection: 'row',justifyContent:'space-between', width: '55%', alignItems: 'center', marginTop:30}}>
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

      <ScrollView style={{marginBottom:200}} contentInset={{ bottom: 192 }}>
        <View style={{marginBottom:30}}>
          {cartItems?.map((foodItem) => (
            <CartItem
              key={foodItem.id}
              name={foodItem.menu_item.name}
              description={foodItem.menu_item.description}
              price={foodItem.menu_item.price}
              quantity = {foodItem.quantity}
              restaurantId={foodItem.menu_item.resturant_id}
            />
          ))}
        </View>

        <View style={{borderBottomWidth: 1.5, borderTopWidth: 1.5, borderColor: '#fe0000', width: '90%', alignSelf:'center', alignItems: 'center'}}>
            <View style={{justifyContent: 'space-between',flexDirection:'row', width:'95%', marginVertical:15}}>
              <Text style={{fontSize: 14}}>Subtotal</Text>
              <Text style={{fontWeight:'bold', fontSize: 14}}>N {totalPrice}</Text>
            </View>

            <View style={{justifyContent: 'space-between',flexDirection:'row', width:'95%', marginBottom:20}}>
              <Text style={{fontSize: 14}}>Service Charge (5%)</Text>
              <Text style={{fontWeight:'bold', fontSize: 14}}>N {subCharge}</Text>
            </View>
        </View>

        <View style={{justifyContent: 'space-between',flexDirection:'row', width:'85%',marginTop:10, marginBottom:100, alignSelf: 'center'}}>
            <Text style={{fontWeight:'bold', fontSize: 14}}>Total</Text>
            <Text style={{fontWeight:'bold', fontSize: 14}}>N {totalPrice + subCharge}</Text>
        </View>
        <Button 
          color="#F72F2F" 
          style={{ alignSelf: "center", width: "100%" }} 
          titleStyle={{ textAlign: "center", padding: 32, fontSize: 18 }} 
          buttonStyle={{ marginHorizontal: 16 }}
          onPress={confirmCharge}
        >
          Confirm Order
        </Button>
      </ScrollView>


        
    </Page>
    </SafeAreaView>
  )
}
