import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/Header";

const HIDDEN_ROUTES = [
    'settings/contact-us',
    'profile/edit',
    'settings/feedback-1',
    'settings/feedback-2',
    'settings/privacy-policy',
    'settings/terms-conditions'
  ];
  

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer 
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: "#2C1801",
                    },
                    drawerLabelStyle: {
                        color: "#fff"
                    }
                }}
            >
                <Drawer.Screen
                    name="home"
                    options={{
                        drawerLabel: "Home",
                        headerTitle: "Home",
                        header: () => <Header pageTitle="Home" />
                    }}
                />

                <Drawer.Screen
                    name="profile/index"
                    options={{
                        drawerLabel: "Profile",
                        header: () => <Header pageTitle="Profile" />
                    }}
                />

                <Drawer.Screen
                    name="orders"
                    options={{
                        drawerLabel: "Orders",
                        header: () => <Header pageTitle="Order History" />
                    }}
                />

                <Drawer.Screen
                    name="settings/index"
                    options={{
                        drawerLabel: "Settings",
                        header: () => <Header pageTitle="Settings" altBack={true} altColor={true} />
                    }}
                />

                {HIDDEN_ROUTES.map((route) => (
                        <Drawer.Screen
                        key={route}
                        name={route}
                        options={{
                            drawerItemStyle: { display: 'none' },
                            headerShown: false
                        }}
                        />
                    ))}
            </Drawer>
        </GestureHandlerRootView>
    )
}