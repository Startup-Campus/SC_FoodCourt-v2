import { Page, Text } from "../components/Themed";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Pressable, View,} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";



export default function ChangePasswordPage() {

  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [cNewEmail, setCNewEmail] = useState("");

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
          <View style={{ width:"90%", height:"27%", alignSelf: 'center',}}>
            <Image
                source={require("../assets/images/change-password.svg")}
                style={{ height: '95%', width: '95%', resizeMode: 'contain', marginLeft:10,}}
            />
          </View>
          <View style={{width:'90%',paddingLeft:30, marginTop:7}}>
            <Text style={styles.boldText}>Change password?</Text>
            <Text style={StyleSheet.compose(styles.mediumText, { marginTop: 5})}>To set a new password, please enter your current password first.</Text>
          </View>


          <View style={{width:'100%', flexDirection:"column", alignItems:"center", height: '20%', justifyContent: "space-between", marginTop: 20}}>
            <Input
              placeholder="Old Email"
              onChangeText={(oldEmail) => setOldEmail(oldEmail)}
              containerStyle={styles.inputCon}
              style={{}}
              icon={<Image
                  source={require("../assets/images/lock-icon.svg")}
                  style={{ height: 20, width: 20, resizeMode: 'contain', paddingRight: 45, marginLeft: 80}}
                />}
            />
            <Input
              placeholder="New Email"
              onChangeText={(newEmail) => setNewEmail(newEmail)}
              containerStyle={styles.inputCon}
              style={{}}
              icon={<Image
                  source={require("../assets/images/lock-icon.svg")}
                  style={{ height: 20, width: 20, resizeMode: 'contain', paddingRight: 45, marginLeft: 80}}
                />}
            />
            <Input
              placeholder="Confirm New Email"
              onChangeText={(cNewEmail) => setCNewEmail(cNewEmail)}
              containerStyle={styles.inputCon}
              style={{}}
              icon={<Image
                  source={require("../assets/images/lock-icon.svg")}
                  style={{ height: 20, width: 20, resizeMode: 'contain', paddingRight: 45, marginLeft: 80}}
                />}
            />
            
          </View>

            <Pressable
                onPress={() => {}}
                style={{marginRight: 20, marginTop: 7}}
            >
              <View style={{alignSelf: "flex-end" }}>
                <Text style={{fontSize:13, }}>Forgot password?</Text>
              </View>
            </Pressable>

            <View style={{ width:'100%', alignItems: "center", marginTop: 40}}>
            <Button
              title="Continue"
              onPress={() => {
                    // Handle button press
              }}
              buttonStyle={{backgroundColor:'#fe0000',width:160,}}
              titleStyle={{color:'#fff', fontSize:15}}
              />
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


