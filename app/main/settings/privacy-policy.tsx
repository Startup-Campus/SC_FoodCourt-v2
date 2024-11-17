
import { Text, Page } from '@/components/Themed';
import { Pressable, View, ScrollView} from "react-native";
import { Feather, MaterialIcons, Entypo,Ionicons } from '@expo/vector-icons';




export default function PrivacyPolicyPage() {

  return (
      <Page>
        <View style={{flexDirection: 'row',justifyContent:'space-between', width: '70%', alignItems: 'center', marginTop:40}}>
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
    
          <Text style={{fontWeight:'bold', fontSize: 26, textAlign:'center'}}>Privacy Policy</Text>
        </View>

       
        

        <ScrollView style={{alignSelf:"center", marginTop: 40, margin: 20}}>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores totam explicabo labore quibusdam veniam, quia vitae tenetur adipisci optio accusantium quod dolores voluptates eum alias fugit accusamus quo, dolorem debitis?
          Nostrum sunt, non possimus maxime reprehenderit consequuntur deserunt rem veritatis. Veritatis ab aut provident facilis, corporis distinctio incidunt libero magnam a at vitae quia iure dicta dolore, alias nulla deserunt!
          Ab eum placeat saepe sequi? Saepe cupiditate, at ea autem harum excepturi ut quod nulla expedita ipsa asperiores facilis magni perspiciatis suscipit blanditiis. Quam voluptas, repudiandae odio aliquam unde enim.
          Dignissimos excepturi quas tenetur harum itaque nihil inventore aperiam. Minus debitis rerum qui commodi, reprehenderit magni expedita deleniti aliquid repudiandae placeat ratione libero, maiores id quibusdam quo iure molestiae eius.
          Aliquid exercitationem dolor neque id magnam minus quod, similique mollitia sit explicabo error recusandae eius. Qui, magnam! Ut quo nisi autem maxime facere quaerat mollitia vitae ipsa nobis? Saepe, officia?
          Ex praesentium facilis a minima necessitatibus ipsam reprehenderit dolores illo, quam id quasi quidem, quas quae voluptas ipsum maiores nostrum nesciunt enim ea repudiandae. Consequatur totam deserunt sapiente quam quibusdam?
          Facilis molestias qui reiciendis voluptatum quisquam optio vero fuga! Ipsum ducimus sed sapiente tempore blanditiis beatae dolores adipisci! Id deserunt sint officiis commodi, possimus doloribus nisi cumque ab expedita inventore.
          Ea deserunt asperiores molestias voluptas quidem. Expedita exercitationem non inventore aut facilis in culpa nisi error cupiditate odit sequi excepturi, quis impedit consectetur atque delectus. Deserunt sed suscipit quis dolorum.
          Deleniti nesciunt voluptatum veniam quam debitis aperiam doloremque nulla corporis ab sit vel ex eum saepe quia laboriosam quaerat, quibusdam voluptates voluptate repellendus temporibus, perspiciatis eos ipsa in! Totam, veritatis.
          Nam ipsam sequi nulla debitis voluptatem reiciendis repudiandae nobis earum cumque nemo iusto cum quos suscipit eius, facilis fugiat est culpa? Adipisci deleniti iusto blanditiis possimus beatae harum officia sed?
          Praesentium laudantium doloremque nihil recusandae sit, unde eligendi aperiam reiciendis vitae, obcaecati soluta. Asperiores obcaecati ipsa temporibus quasi rerum ex, est nisi error architecto aliquid omnis nesciunt officiis provident doloremque.
          Sint eos libero voluptates id porro repudiandae in aperiam doloribus quidem sunt, asperiores nesciunt non minus cupiditate. Ab, molestiae accusamus fugiat assumenda veniam dolore quibusdam, recusandae asperiores animi beatae quaerat?
          Ullam, cumque ipsum illo nisi ratione voluptates animi dolorum qui quidem repellendus voluptatibus, vero molestias ut. Recusandae a quas culpa ipsa accusamus quo aut, distinctio totam aliquam eaque laudantium cum!
          Sit enim earum saepe a quibusdam vitae optio placeat eos quasi, aliquam voluptatum inventore autem perferendis cupiditate suscipit distinctio sed! Beatae voluptas vitae repellat rerum nesciunt error natus voluptate incidunt.
          Repellendus quod repudiandae nostrum fugiat atque sit iste voluptatum porro debitis architecto? Provident, ducimus obcaecati. Dicta atque quisquam obcaecati libero exercitationem aliquam officiis saepe alias non excepturi aut, tempore nam?
          Molestias fugit nam explicabo aspernatur animi perferendis incidunt. Iure error consequatur modi, molestiae recusandae vitae accusamus maxime molestias libero eveniet quos corrupti cum est aspernatur in quo deleniti vero? Repellendus!
          Quis exercitationem deleniti ad odit dolores voluptas est ratione officiis. Sed impedit laudantium assumenda repellendus quisquam atque molestias odit maiores libero asperiores aliquam, qui, porro at! Dignissimos a aliquid aliquam.
          Asperiores fuga consectetur officiis odit rem, enim dicta assumenda, nihil voluptates ipsa iusto natus repellendus ad obcaecati exercitationem impedit quod iure! Magni, deserunt. Laudantium beatae suscipit voluptatem. Temporibus, in non.
          Impedit a repellendus magni voluptas! Sequi illo iusto, iste magni nihil corrupti harum est placeat voluptatibus incidunt ipsum libero inventore vero, eum laudantium ducimus vitae facilis atque voluptate repudiandae reiciendis.
          Corrupti voluptates at doloremque nihil vel ratione deleniti molestiae accusamus minima ullam quibusdam voluptas harum, consectetur aperiam molestias. Assumenda omnis voluptate maiores illum cum et numquam reprehenderit mollitia dolores. Numquam?</Text>
        </ScrollView>
      </Page>
  )
}
