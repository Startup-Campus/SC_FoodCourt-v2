import { supabase } from "@/utils/supabase";
import useRestaurant from "./useRestaurant";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "@/types";
import { groupArrayBy } from "@/utils/functions";

export default function useSingleRestaurant(restaurantId: number) {
    const { data: restaurants } = useRestaurant();

    
    const { data: menuItems, isLoading } = useQuery({
        queryKey: ["menuItems", restaurantId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("menu_items")
                .select("*")
                .eq("resturant_id", restaurantId);
            
            if (error) {
                throw new Error(error.message);
            }
            
            return data as MenuItem[];
        },
        enabled: !!restaurantId
    })

    function getSingleRestaurant() {
        const restaurant = restaurants?.find(
            (restaurant) => restaurant.id === restaurantId
        );
        return restaurant;
    }

    function getSingleMenuItem(menuItemId: number) {
        const menuItem = menuItems?.find(
            (menuItem) => menuItem.id === menuItemId
        );
        return menuItem;
    }


    return {
        restaurant: getSingleRestaurant(),
        menuItems,
        menuItemsSorted: groupArrayBy(menuItems!, "category") as Record<string, MenuItem[]>,
        isLoading,
        getSingleMenuItem
    }
}