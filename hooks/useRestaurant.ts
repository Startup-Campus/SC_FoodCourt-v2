import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export default function useRestaurant() {
    return useQuery({
        queryKey: ["restaurants"],
        queryFn: async () => {
            const { data, error } = await supabase.from("restaurants").select("*");
            console.log(data);
            if (error) {
                throw new Error(error.message);
            }
            return data as {
                name: string;
                id: number;
            }[];
        }
    })
}