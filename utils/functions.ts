import { CartItemAlt } from "@/types"

export function groupArrayBy(array: any[], key: string) {
    return array?.reduce((result, currentItem) => {
      // Get the value of the key we're grouping by
      const groupKey = currentItem[key];
      
      // If an array doesn't exist for this key, create it
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      
      // Push the entire item to the array for this key
      result[groupKey].push(currentItem);
      
      return result;
    }, {});
}

interface GroupedCartItems {
  restaurant_subaccount_code: string;
  total_price: number;
}

export function groupCartItemsByRestaurant(cartItems: CartItemAlt[]): GroupedCartItems[] {
  // Create a map to group items by restaurant_subaccount_code
  const groupedMap = cartItems?.reduce((acc, item) => {
    const code = item.restaurant_subaccount_code;
    
    if (!acc.has(code)) {
      acc.set(code, {
        restaurant_subaccount_code: code,
        total_price: 0,
      });
    }
    
    const group = acc.get(code)!;
    group.total_price += (item.menu_item.price * item.quantity);
    
    return acc;
  }, new Map<string, GroupedCartItems>());

  // Convert the map to an array
  return Array.from(groupedMap?.values());
}

export function calculateServiceCharge(amount: number) {
  const baseCharge = 100;
  const paystackCharge = 0.015 * amount;

  if (amount < 2500) {
    return paystackCharge + baseCharge
  }

  return paystackCharge + 100 + baseCharge
}