import AuthForm from "@/components/AuthForm";
import { Page, Text } from "@/components/Themed";
import Button from "@/components/ui/Button";
import useThemeColor from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginPage() {
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();

    return (
        <Page
            style={{ 
                paddingTop: top + 80, 
                paddingHorizontal: 16, 
                paddingBottom: bottom 
            }} 
            scrollBg="#FFF"
        >
            <View className="flex-row justify-center mb-10">
                <Image
                    source={require("../assets/images/login-image.png")}
                    style={{ height: 233, width: 286 }}
                />
            </View>

            <Text style={styles.loginText}>
                Login
            </Text>

            <AuthForm formType="login" />

            <Button 
                type="outline" 
                buttonStyle={{ borderColor: "#F72F2F" }}
                titleStyle={{ color: "#F72F2F" }}
                style={{ marginTop: 16 }}
                onPress={() => router.push("/create-account")}
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
        fontWeight: "700",
        marginBottom: 16
    }
})