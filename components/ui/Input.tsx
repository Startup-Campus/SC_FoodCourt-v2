import useThemeColor from "@/hooks/useThemeColor"
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native"

interface InputProps extends React.ComponentProps<typeof TextInput> {
    icon?: React.ReactNode,
    containerStyle?: StyleProp<ViewStyle>
}

const Input: React.FC<InputProps> = ({ icon, containerStyle, ...restProps }) => {
    const primaryColor = useThemeColor({}, "primary");
    const { style, ...rest } = restProps;

    const containerColorsStyle = {
        borderColor: primaryColor
    }

    return (
        <View style={[styles.inputContainer, containerColorsStyle, containerStyle, icon ? styles.padding: {}]}>
            { icon && <>{icon}</> }
            <TextInput 
                {...rest}
                style={[styles.defaultInputStyles, style]}
                placeholderTextColor="#33333350"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 30,
        height: 50,
        width: "100%",
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
    },
    defaultInputStyles: {
        minWidth: "90%"
    },
    padding: {
        paddingHorizontal: 16
    }
})

export default Input;