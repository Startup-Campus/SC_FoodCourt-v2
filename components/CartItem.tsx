import useRestaurant from '@/hooks/useRestaurant';
import { Text } from '../components/Themed';
import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Button, ListItem } from '@rneui/themed';
import useThemeColor from '@/hooks/useThemeColor';
import useCart from '@/hooks/useCart';
import useCurrentUser from '@/hooks/useCurrentUser';



interface CartItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  restaurantId: number;
  addon?: { name: string; price: number };
  onQuantityChange: (newQuantity: number) => void;
}
  
const CartItem: React.FC<CartItemProps> = ({ id, name, addon, description, price, quantity, restaurantId, onQuantityChange }) => {
  const { data: restaurants } = useRestaurant();
  const { currentUser } = useCurrentUser();
  const primary = useThemeColor({}, "primary");
  const { removeItem } = useCart(currentUser?.id!);

  const restaurant = restaurants?.find(({ id }) => id === restaurantId);


  // const handleIncrement = () => qty === 20 ? null : setQty(qty + 1);

  // const handleDecrement = () => qty === 1 ? null : setQty(qty - 1);

  const handleIncrement = () => {
    quantity === 20 ? null : onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    quantity === 1 ? null : onQuantityChange(quantity - 1);
  };

  return (
    <ListItem.Swipeable
      rightContent={
        () => (
          <Button 
            containerStyle={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: primary,
              paddingVertical: 4
            }}
            type="clear"
            icon={{ name: "delete-outline", color: 'white' }}
            onPress={() => removeItem(id)}
          >
            <Text style={{fontSize: 16, fontWeight: 600, color: 'white'}}>Delete</Text>
          </Button>
        )
      }
    >
      <ListItem.Content style={{ padding: 0 }}>
        <View style={styles.container}>
          <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
            <View style = {{flexDirection: 'row'}}>
              <Text style={styles.title}>{name} - </Text>
              <Text style={{fontWeight: 'bold',fontSize: 15, color:'#f72f2f'}}>{restaurant?.name}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>N {(price * quantity) + (addon?.price || 0)}</Text>
            </View>
          </View>

          {
            !description ? null : (
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{description}</Text>
              </View>
            )
          }

          {
            !addon ? null : (
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  Selected Addon: {addon.name} - {addon.price}
                </Text>
              </View>
            )
          }
          <View style={styles.actionsContainer}>
            <Pressable onPress={handleIncrement} style={styles.actionButton}>
              <View style={styles.iconContainer}>
                <Feather name="plus-circle" size={18} color="white" />
              </View>
            </Pressable>
            <Text style={styles.amountText}>{quantity}</Text>
            <Pressable onPress={handleDecrement} style={styles.actionButton}>
              <View style={styles.iconContainer}>
                <Feather name="minus-circle" size={18} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};
  
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    width: '70%',

  },
  priceContainer: {
    width: '23%',
    height: 30,
    borderWidth: 1.5,
    borderColor: '#fe0000',
    backgroundColor: '#fe00002e',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fe0000',
    marginHorizontal: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '27%',
    marginTop: 12
  },
  actionButton: {
    backgroundColor: '#f7941e',
    width: 32,
    height: 32,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default CartItem;