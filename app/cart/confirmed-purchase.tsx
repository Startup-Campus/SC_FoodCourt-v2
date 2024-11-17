import Button from "../../components/ui/Button";
import { Text, Page } from '../../components/Themed';
import { Image } from "expo-image";
import { Pressable, View, ScrollView} from "react-native";
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';




export default function ConfirmedPurchasePage() {

  const order_num = 324211

  return (
    <Page>
      <View style={{flexDirection: 'row',justifyContent:'space-between', width: '70%', alignItems: 'center', marginTop:30}}>
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
    
          <Text style={{fontWeight:'bold', fontSize: 24, textAlign:'center', marginTop: 5}}>Confirmation</Text>
        </View>
    <View style={{width: '100%', height:'10%', alignItems: 'center',marginTop: 5 }}>
      <Image
          source={require("assets/images/confirmation-stage.svg")}
          style={{ width: '65%', height: '100%', resizeMode: 'contain' }}
      />
    </View>

    <View style={{ alignItems: 'center', width:'80%', height:'70%', alignSelf:'center', marginTop:80}}>

      <Image
        source={require("assets/images/confirmation-stage.svg")}
        style={{ width: '45%', height: '40%', resizeMode: 'contain',}}
      />

      <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 18 }}>
        Order #{order_num}
      </Text>

      <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 14, marginTop:5 }}>
        Thanks for your purchase
      </Text>

    </View>
      
  </Page>
  )
}
