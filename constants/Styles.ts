import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Styles = StyleSheet.create({
    DefaultPaddingX: {
        paddingHorizontal: 16
    },
    DefaultSpaceY: {
        marginVertical: 16
    },
    ImageBackground: { 
        width: "100%", 
        height: "100%", 
        position: "absolute", 
        zIndex: -10, 
    },
    ProfileSettingsContainer: {
        // width: screenWidth,
        alignItems: "center",
        borderTopStartRadius: 35,
        borderTopEndRadius: 35,
        backgroundColor: "#F72F2F",
        paddingVertical: 8,
        paddingBottom: 24,
        //maxHeight: 350,
        flex: 1
    },
    FlexCenterJustifyBetween: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    FlexCenterJustifyCenter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Styles;