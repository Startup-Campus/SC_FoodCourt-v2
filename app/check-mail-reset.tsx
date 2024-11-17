import { Page, Text } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Pressable, View,} from "react-native";
import { Entypo } from "@expo/vector-icons";



export default function CheckEmailPage() {

  return (
      <Page>
          <Pressable
                  onPress={() => {}}
                  style={{marginTop: 10, marginLeft: 10}}
              >
                <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                  <Entypo name="chevron-small-left" size={22} color="black" />
                  <Text style={{fontSize:15, textAlign:'center'}}>Back</Text>
                </View>
            </Pressable>

          <View style={{ width:"90%", height:"40%", alignSelf: 'center', alignItems: "center", justifyContent:"flex-end"}}>
            <Image
                source={require("../assets/images/check-email.svg")}
                style={{ height: '25%', width: '25%', resizeMode: 'contain',}}
            />
          </View>
          <View style={{width:'70%', marginTop:7, alignSelf: "center", alignItems: "center"}}>
            <Text style={{fontWeight: "700",fontSize:25,color: '#333333', textAlign:"center"}}>Check your mail</Text>
            <Text style={{ marginTop: 5, textAlign:"center", fontWeight: "500", color: '#333333',fontSize: 15}}>We have sent a password reset link to your email.</Text>
          </View>

          <View style={{width:'70%', height:'30%', marginTop:7, alignSelf: "center", alignItems: "center", justifyContent: "flex-end"}}>
            <Text style={{textAlign:"center", fontWeight: "500", color: '#333333',fontSize: 15}}>Did not receive password reset link?</Text>
            <Text style={{marginTop: -5}}>
              <Text style={{textAlign:"center", fontWeight: "500", color: '#333333',fontSize: 15}}>Check your spam folder, or </Text>
              <Pressable
                  onPress={() => {}}
                  style={{marginRight: 20, marginTop: 7}}
              >
                  <Text style={{fontWeight: "500", color: '#fe0000',fontSize: 16, textDecorationLine:"underline"}}>resend link</Text>
              </Pressable>

            </Text>
          </View>

      </Page>
  )
}






const styles = StyleSheet.create({
  boldText: {
      fontWeight: "900",
      fontSize:25,
      color: '#f34a4a'
  },

  mediumText: {
      fontWeight: "500",
      color: '#333333',
  },

  inputCon: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'white',
    alignSelf: "center", 
    overflow: "hidden",
    elevation:5,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowColor: '#52006A',
  },

})


