import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
    DrawerActions,
    ParamListBase,
    useNavigation,
} from '@react-navigation/native';
import { DrawerNavigationProp } from "@react-navigation/drawer";


export default function DrawerButton({ iconColor }: { iconColor: string }) {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    return (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Ionicons name="menu" size={35} color={iconColor} />
        </TouchableOpacity>
    )
}
