import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";

interface ProfileDetailsProps {
    profileDetails: {
        name: string;
        value: string;
    }[]
}

export default function ProfileDetails({ profileDetails }: ProfileDetailsProps) {
    return (
        <>
            {
                profileDetails.map((profile) => (
                    <View key={profile.name} className="border-b-[1px] border-white w-full px-4 py-5">
                        <Text style={[styles.boldText, styles.baseText]}>
                            {profile.name}: <Text style={[styles.mediumText, styles.baseText]}>{profile.value}</Text>
                        </Text>
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
})