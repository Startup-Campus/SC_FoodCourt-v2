
import { Page, Text } from "@/components/Themed";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Pressable, View,} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";



export default function ForgotPasswordPage() {

  const [emailPassword, setEmailPassword] = useState("");
  const router = useRouter();

  const { sendResetEmail } = useAuth();

  const resetPassword = async () => {
    try {
      await sendResetEmail(emailPassword);
      return router.push('/forgot-password/confirmation')
    } catch (e: any) {
      return Toast.show({
        text1: e.message,
        type: "error"
      })
    }
  }


  return (
      <Page>
          <TouchableOpacity
              onPress={() => router.back()}
              style={{marginTop: 10, marginLeft: 10}}
            >
              <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                <Entypo name="chevron-small-left" size={22} color="black" />
                <Text style={{fontSize:15, textAlign:'center'}}>Back</Text>
              </View>
          </TouchableOpacity>
          <View style={{ width:"90%", height:"27%", alignSelf: 'center'}}>
            <Image
                source={require("@/assets/images/forgot-password.svg")}
                style={{ height: '100%', width: '95%', resizeMode: 'contain', marginLeft:10 }}
            />
          </View>
          <View style={{width:'90%',paddingLeft:30, marginTop:10}}>
            <Text style={styles.boldText}>Forgot password?</Text>
            <Text style={StyleSheet.compose(styles.mediumText, { marginTop: 5})}>
              Enter the email associated with this account and we’ll send you a link to reset your password.
            </Text>
          </View>
          

          <Input
            placeholder="Email"
            onChangeText={(emailPassword) => setEmailPassword(emailPassword)}
            containerStyle={styles.inputCon}
            style={{}}
            icon={<Image
                source={require("@/assets/images/email_icon.svg")}
                style={{ height: 13, width: 17, resizeMode: 'contain', paddingRight: 45, marginLeft: 80}}
              />}
          />
          <View style={{ width:'100%', alignItems: "center", marginTop: 40}}>
            <Button
              title="Continue"
              onPress={resetPassword}
              buttonStyle={{backgroundColor:'#fe0000',width:160, marginTop:50}}
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
    marginTop: 60,
  },

})