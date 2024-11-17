import { Text, Page } from '../../components/Themed';
import { Image } from "expo-image";
import { Pressable, View} from "react-native";
import { MaterialIcons, Entypo, Ionicons, MaterialCommunityIcons, Fontisto, Octicons } from '@expo/vector-icons';
import { Switch } from 'react-native-switch';

import React, { useState } from 'react';




export default function SettingsPage() {

  const [switchValue, setSwitchValue] = useState(true);

  return (
      <Page>
        {/* <View style={{backgroundColor: '#f72f2f', height: 180, zIndex: 0}}> */}
          {/* <View style={{flexDirection: 'row',justifyContent:'space-between', width: '95%', alignItems: 'center',alignSelf:'center', marginTop:30}}> */}
            {/* <Text style={{fontWeight:'bold', fontSize: 24, textAlign:'center', color: '#fff'}}>Settings</Text>  */}
          {/* </View> */}
        {/* </View> */}

        <View style={{width: '90%', backgroundColor: '#fff', borderRadius: 25, marginTop: -50, alignSelf:'center', elevation: 3}}>
          <View style={{padding: 30}}>
            {/* INTERFACE */}
            <View style={{paddingBottom: 40}}>
              <Text style ={{fontWeight: 'bold', fontSize: 14 }}>Interface</Text>

              <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between', paddingTop: 20, paddingBottom: 10}}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="notifications-outline" size={28} color="#f72f2f" />
                  <Text style ={{fontWeight: '500', fontSize: 14, paddingLeft: 10 }}>Notifications</Text>
                </View>

                <Switch
                  value={switchValue}
                  onValueChange={(switchValue) => {
                    const newValue = switchValue == true ? false : true;
                    console.log(newValue);
                    setSwitchValue(newValue); // Update the state with the new value
                  }}
                  activeText={''}
                  inActiveText={''}
                  circleSize={22}
                  barHeight={30}
                  backgroundActive={'#fe0000'}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#fff'}
                  circleInActiveColor={'#000000'}
                  switchWidthMultiplier={2.70}
                />
              </View>
            </View>

            {/* LEGAL */}
            <View style={{paddingBottom: 40}}>
              <Text style ={{fontWeight: 'bold', fontSize: 14 }}>Legal</Text>

              <Pressable
                    onPress={() => {}}
                    style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between', paddingTop: 20, paddingBottom: 10}}
                >

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Octicons name="checklist" size={28} color="#f72f2f" />
                  <Text style ={{fontWeight: '500', fontSize: 14, paddingLeft: 10 }}>Terms & Conditions</Text>
                </View>

                <Ionicons name="chevron-forward" size={24} color="#f72f2f" />
              </Pressable>

              <Pressable
                    onPress={() => {}}
                    style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between', paddingTop: 20, paddingBottom: 10}}
                >

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="shield-account-outline" size={28} color="#f72f2f" />
                  <Text style ={{fontWeight: '500', fontSize: 14, paddingLeft: 10 }}>Privacy Policy</Text>
                </View>

                <Ionicons name="chevron-forward" size={24} color="#f72f2f" />
              </Pressable>
            </View>

            {/* SUPPORT */}
            <View>
              <Text style ={{fontWeight: 'bold', fontSize: 14 }}>Support</Text>

              <Pressable
                    onPress={() => {}}
                    style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between', paddingTop: 20, paddingBottom: 10}}
                >

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Fontisto name="smiley" size={24} color="#f72f2f" />
                  <Text style ={{fontWeight: '500', fontSize: 14, paddingLeft: 10 }}>Feedback</Text>
                </View>

                <Ionicons name="chevron-forward" size={24} color="#f72f2f" />
              </Pressable>

              <Pressable
                    onPress={() => {}}
                    style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between', paddingTop: 20, paddingBottom: 10}}
                >

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require("../../assets/images/contact-us.svg")}
                    style={{ width: 30, height: 30, resizeMode: 'contain' }}
                  />
                  <Text style ={{fontWeight: '500', fontSize: 14, paddingLeft: 10 }}>Contact Us</Text>
                </View>

                <Ionicons name="chevron-forward" size={24} color="#f72f2f" />
              </Pressable>
            </View>


          </View>
        </View>
        
        <View style={{width: '90%', backgroundColor: '#fff', borderRadius: 30, marginTop: 20, alignSelf:'center', borderColor: '#7E7E7E66', borderWidth: 1}}>
          <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
            <Pressable
                    onPress={() => {}} // Usiere- e no gree me to sign out
                    style={{flexDirection:'row', alignItems: 'center'}}
                >

                <Ionicons name="log-out-outline" size={28} color="#f72f2f" />
                <Text style ={{fontWeight: '600', fontSize: 16, paddingLeft: 10 }}>Sign Out</Text>

            </Pressable>
          </View>
        </View>
          
      </Page>
  )
}
