
import { Text, Page } from '@/components/Themed';
import { Pressable, View, ScrollView, TextInput} from "react-native";
import { Feather, MaterialIcons, Entypo,Ionicons } from '@expo/vector-icons';
import Button from "@/components/ui/Button";






export default function Feedback1Page() {

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
    
          <Text style={{fontWeight:'bold', fontSize: 26, textAlign:'center'}}>Feedback</Text>
        </View>

       
        

        <View style={{alignSelf:"center", margin: 20,marginTop:30, alignItems:'center'}}>
          <Text style={{fontSize: 18}}>Your feedback shapes the student food court experience. We're all ears, ready to enhance your time. 
            Share your thoughts, suggestions, and experiences - let's make every visit more enjoyable, one order at a time. 
            Your input matters!
          </Text>
          <TextInput
            style={{borderColor:'black', borderWidth: 2, borderRadius: 10, maxWidth: '100%', padding:15, textAlignVertical:"top", marginTop: 40, maxHeight: 170}}
            multiline = {true}
            numberOfLines={9}
            placeholder="What did/didn’t you like about your foodcourt experience?"  
          />

          <Button
              title="Continue"
              onPress={() => {
                    // Handle button press
              }}
              buttonStyle={{backgroundColor:'#f72f2f',width:160, marginTop:250}}
              titleStyle={{color:'#fff', fontSize:17}}
            />
        </View>
      </Page>
  )
}
