import Button from "../../components/ui/Button";
import { Text, Page } from '../../components/Themed';
import { Image } from "expo-image";
import { Pressable, View, ScrollView} from "react-native";
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import CartItem from '../../components/CartItem';
import cartItemList from 'mock/cart.json';




export default function CartEmptyPage() {

  return (
      <Page>
        <View style={{flexDirection: 'row',justifyContent:'space-between', width: '55%', alignItems: 'center', marginTop:30}}>
          <View>
            <Pressable
                  onPress={() => {}}
                  style={{marginTop: 10, marginLeft: 10}}
              >
                <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                  <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                  <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
                </View>
            </Pressable>
          </View>
    
          <Text style={{fontWeight:'bold', fontSize: 24, textAlign:'center', marginTop: 5}}>Cart</Text>
        </View>

        <View style={{width: '100%', height:'10%', alignItems: 'center'}}>
          <Image
              source={require("assets/images/shopping-cart-stage.svg")}
              style={{ width: '65%', height: '100%', resizeMode: 'contain' }}
          />
        </View>

        <View style={{ alignItems: 'center', width:'80%', height:'70%', alignSelf:'center', marginTop:40}}>
          {/* <Text style={{textAlign:'center', color: '#fe0000', fontWeight: 'bold', fontSize: 14 }}>
            Opps! Looks like there’s nothing in your shopping cart...
          </Text> */}

          <Image
            source={require("assets/images/empty-cart.svg")}
            style={{ width: '85%', height: '70%', resizeMode: 'contain',}}
          />

        </View>
          
      </Page>
  )
}
