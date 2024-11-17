import useAuth from "@/hooks/useAuth"
import useCurrentUser from "@/hooks/useCurrentUser";
import { Redirect } from "expo-router";

export default function FirstPage() {
    const { currentUser } = useCurrentUser();

    if (!currentUser?.id) return <Redirect href="/login" />

    return <Redirect href="/main/home" />
}