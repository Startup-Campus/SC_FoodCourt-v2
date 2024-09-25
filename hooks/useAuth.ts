import { supabase } from '../utils/supabase';

interface SignUpData {
    email: string;
    password: string;
    name: string
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
                    user_type: "customer"
                }
            }
        })

        return res.data.user
    }

    return {
        signIn,
        signUpWithEmail,
        getCurrentUser
    }
}