import { useState } from 'react';
import { supabase } from "@/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import useCurrentUser from './useCurrentUser';

interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: number;
  quantity: number;
  menu_item: {
    name: string;
    price: number;
  };
}

interface Order {
  id: string;
  status: number;
  total_amount: number;
  order_date: string;
  customer_name: string;
  order_items: OrderItem[];
}

export default function useOrders() {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  

  async function getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        status,
        total_amount,
        order_date,
        customer_name,
        order_items:order_items (
          id,
          order_id,
          menu_item_id,
          quantity,
          menu_items:menu_item_id (
            name,
            price,
            restaurant:resturant_id (
              name
            )
          )
        )
      `)
      .eq('user_id', currentUser?.id!)
      .order('order_date', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    enabled: !!currentUser,
  });

  const getRecentOrders = () => {
    return orders?.slice(0, 5).map((order) => ({
      id: order?.id,
      name: order?.order_items?.length > 1 ?
       `${((order?.order_items[0]?.menu_items) as any)?.name} + ${order?.order_items?.length - 1} more` : 
       ((order?.order_items[0]?.menu_items) as any)?.name,
      restaurant: ((order?.order_items[0]?.menu_items) as any)?.restaurant?.name,
      status: order?.status
    }))
  }

  const refreshOrders = () => queryClient.invalidateQueries({ queryKey: ["orders"] })

  return {
    orders,
    isLoading,
    error,
    getRecentOrders,
    refreshOrders
  };
}