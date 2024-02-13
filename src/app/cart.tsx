import { useState } from 'react'
import { View, Text, ScrollView, Alert , Linking } from "react-native";
import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Input } from "@/components/input";

import { ProductCartProps } from "@/stores/cart-store";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@/components/button";
import { LinkButton } from '@/components/link-button';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function Cart() {
  const cartStore = useCartStore();
  const [ address, setAddress ] = useState('');
  const navigate = useNavigation();
  const PHONE_NUMBER = '19089065858'

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, currentProduct) =>
        total + currentProduct.quantity * currentProduct.price,
      0
    )
  );


  function handleProductRemove(product: ProductCartProps){
    Alert.alert('Remove item', `Do you want to remove your ${product.title} from your cart ? `, [
      {text: 'Cancel'},
      {text: 'Remove', 
      style: 'destructive',
      onPress:()=> cartStore.remove(product.id)
    }
    ])

  }


  const handleOrder = ()=>{
    if(address.trim().length === 0 ){
      return  Alert.alert('Warning', 'Please enter your address')
    }
    const orderDetails = cartStore.products.map(product=> `\n ${product.quantity} ${product.title}`).join('');

    const whatAppMessage = `🍔 NEW ORDER 🍔
                            \n Deliver to: ${address}
                            ${orderDetails}
                            ${total}
       
       
                            `;
    
    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${whatAppMessage}`);

    cartStore.clear();
    navigate.goBack();
   

  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Your cart" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className='border-b border-slate-700'>
                {cartStore.products.map((product) => (
                  <Product key={product.id} data={product} onPress={()=>handleProductRemove(product)}/>
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Your cart is empty
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white font-subtitle text-xl">Total</Text>
              <Text className="text-lime-400 font-heading text-2xl">
                {total}
              </Text>
            </View>

            <Input 
              placeholder="Inform the delivery address. Please add details and contact number."
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              blurOnSubmit={true}
              returnKeyType='next'
              />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className='p-5 gap-5'>
        <Button onPress={handleOrder}>
          <Button.Text>Place Order</Button.Text>
          <Button.Icon>
            <Feather size={20} name='arrow-right-circle'/>
          </Button.Icon>
        </Button>

        <LinkButton href='/' title='Return to Menu'/>
  
      </View>
    </View>
  );
}
