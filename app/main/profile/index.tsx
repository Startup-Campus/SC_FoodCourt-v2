import EditProfilePhoto from "@/components/EditProfilePhoto";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import { Page, Text } from "@/components/Themed";
import Styles from "@/constants/Styles";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "expo-router";
import { Edit } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native";

export default function ProfilePage() {
    const { currentUser } = useCurrentUser();
    const router = useRouter();

    const profile = [
        { name: "Name", value: currentUser?.full_name },
        { name: "Email", value: currentUser?.email },
        { name: "Username", value: "@" + currentUser?.username },
    ]

    const imageUrl = currentUser?.image_url ?? `https://api.dicebear.com/9.x/adventurer/png?seed=${currentUser?.full_name}`;

    return (
        <Page>

            <EditProfilePhoto imageUrl={imageUrl} />

            <View style={Styles.ProfileSettingsContainer}>
                <View className="flex flex-row items-center justify-between w-full px-5">
                    <View/>
                    <Text style={styles.header}>Profile</Text>
                    <TouchableOpacity onPress={() => router.push('/main/profile/edit')}>
                        <Edit stroke="#fff"/>
                    </TouchableOpacity>
                </View>

                <View className="border-b-[1px] border-white w-full">
                    <ProfileDetails profileDetails={profile} />

                    <TouchableOpacity className="w-full px-4 py-5">
                        <Text style={[styles.boldText, styles.baseText]}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    boldText: { fontWeight: "700" },
    mediumText: { fontWeight: "500" },
    baseText: { color: "#fff", fontSize: 16 },
    borderVertical: {
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        // borderTopColor: "#fff",
        borderBottomColor: "#fff",
        width: "100%"
    },
    borderBotton: {
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        width: "100%"
    },
    header: { color: "#fff", textAlign: "center", fontWeight: "700", paddingVertical: 16, fontSize: 20 }
})