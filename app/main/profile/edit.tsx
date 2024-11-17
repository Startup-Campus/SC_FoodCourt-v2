import EditProfilePhoto from "@/components/EditProfilePhoto";
import Header from "@/components/Header";
import EditProfileDetails from "@/components/Profile/EditProfile";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import { Page, Text } from "@/components/Themed";
import Styles from "@/constants/Styles";
import useAuth from "@/hooks/useAuth";
import useCurrentUser from "@/hooks/useCurrentUser";
import Drawer from "expo-router/drawer";
import { Edit } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

export default function EditProfilePage() {
    const { currentUser } = useCurrentUser();
    const { updateUser } = useAuth();
    const [profile, setProfile] = useState<{ name: string, phone_number: string }>({
        name: currentUser?.full_name,
        phone_number: currentUser?.phone_number
    })

    const updateProfileDetail = (name: string, value: string) => {
        return setProfile((prevVal) => ({
            ...prevVal,
            [name]: value
        }))
    }

    const profileArray = Object.keys(profile).map((key) => ({
        name: key, value: profile[key as "name" | "phone_number"]
    }))

    const updateProfile = () => {
        try {
            updateUser({
                full_name: profile.name,
                phone_number: profile.phone_number
            })
            return Toast.show({
                type: "success",
                text1: "Profile Updated Successfully"
            })
        } catch (e) {
            return Toast.show({
                type: "error",
                text1: "Error while updating profile"
            })
        }
    }

    const imageUrl = currentUser?.image_url ?? `https://api.dicebear.com/9.x/adventurer/png?seed=${currentUser?.full_name}`;

    return (
        <Page>
            <Drawer.Screen options={{ header: () => <Header pageTitle="Profile" /> }} />

            <EditProfilePhoto imageUrl={imageUrl} />

            <View style={Styles.ProfileSettingsContainer}>
                <View className="flex flex-row items-center justify-center w-full px-5">
                    <Text style={styles.profileHeading}>Edit Profile</Text>
                </View>

                <View className="w-full">
                    <EditProfileDetails 
                        profileDetails={profileArray} 
                        updateProfileDetail={updateProfileDetail}
                    />

                    <TouchableOpacity onPress={updateProfile} className="ml-auto px-4 py-5">
                        <Text style={[styles.boldText, styles.baseText]}>
                            Save
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
    baseText: { color: "#fff", fontSize: 20 },
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
    profileHeading: { color: "#fff", textAlign: "center", fontWeight: "700", paddingVertical: 16, fontSize: 20 }
})