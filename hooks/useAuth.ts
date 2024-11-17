import { supabase } from '../utils/supabase';

interface SignUpData {
    email: string;
    password: string;
    name: string;
    phone_number?: string;
}

interface UpdateUserData  {
    full_name: string;
    phone_number: string;
    username: string;
    image_url: string;
}

export default function useAuth() {

    const getCurrentUser = async () => {
        const user = await supabase.auth.getUser();
        return user;
    }
    
    const signIn = async (email: string, password: string) => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password,
        })        
        return res.data.user;
    }

    const signUpWithEmail = async (data: SignUpData) => {
        const res = await supabase.auth.signUp({ 
            email: data.email, 
            password: data.password, 
            options: {
                data: {
                    full_name: data.name,
                    image_url:  `https://api.dicebear.com/9.x/initials/png?seed=${data.name}`,
                    username: data.name.toLowerCase().replace(" ", ""),
                    user_type: "customer",
                    phone_number: data?.phone_number
                }
            }
        })

        return res
    }

    const updateUser = async (data: Partial<UpdateUserData>) => {
        return await supabase.auth.updateUser({
            data: { ...data }
        })
    }

    const sendResetEmail = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw new Error(error?.message);
    }

    const changePassword = async (newPassword: string) => {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw new Error(error?.message);
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error?.message);
    }

    return {
        signIn,
        signUpWithEmail,
        getCurrentUser,
        sendResetEmail,
        changePassword,
        updateUser,
        signOut
    }
}