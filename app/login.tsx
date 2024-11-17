import AuthForm from "@/components/AuthForm";
import { Page, Text } from "@/components/Themed";
import Button from "@/components/ui/Button";
import useThemeColor from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { StyleSheet } from "react-native";

export default function LoginPage() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Page style={{ paddingTop: 80, paddingHorizontal: 16 }}>
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
        </SafeAreaView>
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