import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/utils/supabase'; // Adjust this import based on your Supabase client location
import useCurrentUser from './useCurrentUser';

export const useImagePickerUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [imageUri, setImageUri] = useState<string|null>(null);
  const { currentUser } = useCurrentUser();

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      setError('Permission to access media library is required!');
      return false;
    }
    return true;
  };

  const pickAndUploadImage = async (bucketName: string, folderPath = 'avatars') => {
    try {
      setIsLoading(true);
      setError(null);

      // Request permission first
      const hasPermission = await requestPermission();
      if (!hasPermission) return null;

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        return null;
      }

      const uri = result.assets[0].uri;
      setImageUri(uri);

      // Generate unique filename
      const fileExt = uri.substring(uri.lastIndexOf('.') + 1);
      const fileName = `${currentUser?.id!}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, uri);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return {
        uri,
        publicUrl,
        fileName: filePath
      };

    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pickAndUploadImage,
    isLoading,
    error,
    imageUri
  };
};