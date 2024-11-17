import Button from "@/components/ui/Button";
import { Text, Page } from '@/components/Themed';
import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';




export default function ContactUsPage() {

  return (
      <Page>
        <View style={{flexDirection: 'row',justifyContent:'space-between', width: '65%', alignItems: 'center', marginTop:40}}>
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
    
          <Text style={{fontWeight:'bold', fontSize: 26, textAlign:'center'}}>Contact Us</Text>
        </View>

        <View style={{width: 350, height: 250, alignSelf: 'center', marginTop: 20}}>
          <Image
              source={require("assets/images/contact-us-via.svg")}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </View>
        <Text style = {{fontWeight: '500',fontSize: 19, alignSelf: 'center'}}>Contact Us Via</Text>

        <View style={{flexDirection: 'row',alignSelf:"center", justifyContent:'space-between', width:'90%', alignItems: 'center', marginTop: 40}}>
          <View style={{flexDirection:'row', alignItems: "center"}}>
            <View style= {{width: 60, height: 60, elevation: 2, shadowColor:'#f72f2f', alignItems: 'center', justifyContent: 'center', borderRadius: 70}}>
              <Ionicons name="mail-outline" size={26} color="#f72f2f" />
            </View>
            <View style={{marginLeft:10}}>
              <Text style={{fontWeight:'bold', fontSize: 18}}>Email</Text>
              <Text style={{color:'#5C5C5C', fontSize: 17}}>Replies within 8hrs</Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={24} color="#f72f2f" />
        </View>
      </Page>
  )
}
