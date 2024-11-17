import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { View, StyleSheet, Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";
import { Link } from "expo-router";
import DrawerButton from "./DrawerButton";

interface HeaderProps {
    pageTitle: 'Home' | 'Profile' | 'Order History' | 'Settings'
    altColor?: boolean
    altBack?: boolean
}

const Header: React.FC<HeaderProps> = ({ pageTitle, altColor, altBack }) => {
    const primaryColor = useThemeColor({}, "primary");

    return (
        <View style={{...styles.header, backgroundColor: altBack ? "#f72f2f" : "#fff"}}>
            <DrawerButton iconColor={altColor ? "#fff" : primaryColor}/>

            {pageTitle === 'Order History' ? <Text style= {{fontSize: 20, fontWeight: 600}}>{pageTitle}</Text> : null }

            <Link href="/cart/shopping-cart-full" asChild>
                <MaterialCommunityIcons size={25} name="cart" color={altColor ? "#fff" : primaryColor}/>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingTop: 45,
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: "900",
        fontSize: 24
    }
})

export default Header;