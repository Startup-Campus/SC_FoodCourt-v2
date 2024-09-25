import { supabase } from "@/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { MenuItem } from "@/types"; // Assuming you have a MenuItem type defined

// Interface for the cart item
interface CartItem {
  id: number;
  menu_item_id: number;
  quantity: number;
  user_id: string;
  menu_item: MenuItem;
}

// Interface for adding an item to the cart
interface AddToCartData {
  menu_item_id: number;
  quantity: number;
  user_id: string;
}

export default function useCart(userId: string) {
  const queryClient = useQueryClient();

  async function getCartItems() {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        menu_item_id,
        quantity,
        user_id,
        menu_items:menu_item_id (*)
      `)
      .eq('user_id', userId);

    if (error) throw new Error(error.message);

    return data.map((item: any) => ({
      id: item.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      user_id: item.user_id,
      menu_item: item.menu_items,
    })) as CartItem[];
  }

  async function addToCart(data: AddToCartData) {
    const { error } = await supabase
      .from('cart_items')
      .insert(data);

    if (error) throw new Error(error.message);
  }

  async function updateCartItem(id: number, quantity: number) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async function removeFromCart(id: number) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  const { data: cartItems, isLoading, error } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCartItems,
    enabled: !!userId,
  });

  const { mutateAsync: addItem } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      Toast.show({
        text1: "Item added to cart",
        type: "success"
      });
    },
    onError: (error: Error) => {
      Toast.show({
        text1: "Failed to add item to cart",
        text2: error.message,
        type: "error"
      });
    }
  });

  const { mutateAsync: updateItem } = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) => updateCartItem(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      Toast.show({
        text1: "Cart item updated",
        type: "success"
      });
    },
    onError: (error: Error) => {
      Toast.show({
        text1: "Failed to update cart item",
        text2: error.message,
        type: "error"
      });
    }
  });

  const { mutateAsync: removeItem } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      Toast.show({
        text1: "Item removed from cart",
        type: "success"
      });
    },
    onError: (error: Error) => {
      Toast.show({
        text1: "Failed to remove item from cart",
        text2: error.message,
        type: "error"
      });
    }
  });

  return {
    cartItems,
    isLoading,
    error,
    addItem,
    updateItem,
    removeItem,
  };
}