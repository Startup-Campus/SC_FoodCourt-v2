import { Alert, AppState, View } from "react-native"
import Input from "@/components/ui/Input";
import { useState } from "react";
import Button from "./ui/Button";
import { supabase } from "@/utils/supabase";

import { CheckBox } from "@rneui/themed"
import useThemeColor from "@/hooks/useThemeColor";
import { Link, useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";

interface FormProps {
    formType: "login"|"sign-up"
}

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
})  

const AuthForm: React.FC<FormProps> = ({ formType }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false)

    const router = useRouter()


    const [rememberMe, setRememberMe] = useState(false);
    const primaryColor = useThemeColor({}, "primary");

    const handleButtonPress = () => {

    }

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
    
        if (error) Alert.alert(error.message)
        setLoading(false)
    
        router.replace("/main/")
      }
    
      async function signUpWithEmail() {
        setLoading(true)
        const {
          data: { session },
          error,
        } = await supabase.auth.signUp({
          email: email,
          password: password,
        })

        await supabase.from("profiles").upsert({
            id: session?.user.id,
            full_name: `${firstName} ${lastName}`,
            phone_number: phoneNumber
        })
    
        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)

        router.replace("/main/")
      }

    return (
        <View>
            <View style={{ gap: 16 }}>
                {
                    formType !== "sign-up" ? null :
                    <>
                        <Input
                            placeholder="First Name"
                            onChangeText={(firstName) => setFirstName(firstName)}
                            style={{ padding: 16 }}
                        />

                        <Input
                            placeholder="Last Name"
                            onChangeText={(lastName) => setLastName(lastName)}
                            style={{ padding: 16 }}
                        />

                        <Input  
                            placeholder="Phone Number"
                            inputMode="numeric"
                            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                            style={{ padding: 16 }}
                        />
                    </>
                }
                <Input
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    style={{ padding: 16 }}
                    icon={<Mail stroke={primaryColor}/>}
                />
                
                <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    style={{ padding: 16 }}
                    icon={<Lock stroke={primaryColor}/>}
                />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "stretch", justifyContent: "space-between" }}>
                <CheckBox
                    checked={rememberMe}
                    onPress={() => setRememberMe(!rememberMe)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor={primaryColor}
                    title="Remeber Me"
                    containerStyle={{ borderRadius: 5 }}
                    center={true}
                />

                {
                    formType !== "login" ? null :
                    <Link href="/forgot-password">Forgot Password?</Link>
                }
            </View>
            
            <Button loading={loading} color="#F72F2F" style={{ alignSelf: "center", width: "100%" }} titleStyle={{ textAlign: "center", padding: 32 }} onPress={formType === "login" ? signInWithEmail : signUpWithEmail}>
                Continue
            </Button>
        </View>
    )
}

export default AuthForm;