import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { Input } from "@rneui/themed";

interface ProfileDetailsProps {
    profileDetails: {
        name: string;
        value: string;
    }[],
    updateProfileDetail: (name: string, value: string) => any
}

export default function EditProfileDetails({ profileDetails, updateProfileDetail }: ProfileDetailsProps) {
    return (
        <>
            {
                profileDetails.map((profile) => (
                    <View className="w-full" key={profile.name}>
                        <Input
                            label={profile.name.replace("_", " ")}
                            value={profile.value}
                            onChangeText={(text) => updateProfileDetail(profile.name, text)}
                            labelStyle={styles.inputLabel}
                            inputStyle={{ color: "#fff" }}
                        />
                    </View>
                ))
            }
        </>
    )

}

const styles = StyleSheet.create({
    boldText: { fontWeight: "700" },
    mediumText: { fontWeight: "500" },
    baseText: { color: "#fff", fontSize: 16 },
    inputLabel: { 
        textTransform: "capitalize", 
        color: "#fff",
        fontWeight: "400",
        fontSize: 14
    }
})