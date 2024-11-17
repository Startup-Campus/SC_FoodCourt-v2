import { Page, Text } from "../components/Themed";
import { Image } from "expo-image";
import useThemeColor from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import AuthForm from "@/components/AuthForm";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";

export default function LoginPage() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter();

    const moveToCreateAccount = () => {
        return router.push("/create-account")
    }
    

    return (
        <Page>
            <Image
                source={require("@/assets/images/login-illustration.svg")}
                style={{ height: 233, width: 286 }}
            />

            <Text style={styles.loginText}>
                Login
            </Text>

            <AuthForm formType="login"/>

            <Button 
                type="outline" 
                color={primary}
                onPress={moveToCreateAccount}
            >
                New User? Create Account
            </Button>
            
        </Page>
    )
}

const styles = StyleSheet.create({
    loginText: {
        color: "#FF3551", 
        textAlign: "center", 
        fontSize: 30, 
        fontWeight: "700" 
    }
})