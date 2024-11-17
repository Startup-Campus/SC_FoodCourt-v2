import { View } from "react-native"
import { Image } from "expo-image";
import Button from "@/components/ui/Button";
import { useImagePickerUpload } from "@/hooks/usePhotoLibrary";
import useAuth from "@/hooks/useAuth";
import Toast from "react-native-toast-message";


const EditProfilePhoto: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
    const { pickAndUploadImage, imageUri } = useImagePickerUpload();
    const { updateUser } = useAuth();


    const changeAvatar = async () => {
        try {
            const result = await pickAndUploadImage("avatars");
    
            if (!result) return;
    
            const { publicUrl } = result;
            await updateUser({
                image_url: publicUrl,
            })
            return Toast.show({
                type: "success",
                text1: "Updated Profile Photo Successfully"
            })
        } catch {
            return Toast.show({
                type: "error",
                text1: "Failed to update Profile Photo"
            })
        }
    }

    
    return (
        <View className="flex-1 items-center justify-center gap-3">
            <Image
                source={{ uri: imageUri || imageUrl }}
                style={{ width: 200, height: 200, borderRadius: 999 }}
            />

            <Button 
                titleStyle={{ textDecorationLine: "underline", color: "#F34A4A", fontSize: 14, textAlign: "center" }} 
                style={{ width: "100%", alignItems: "center" }}
                containerStyle={{ width: "100%" }}
                type="clear"
                onPress={changeAvatar}
            >
                Edit Profile Photo
            </Button>
        </View>
    )
}

export default EditProfilePhoto;