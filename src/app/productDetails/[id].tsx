import { Image, View , Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { PRODUCTS } from '@/utils/data/products';
import { formatCurrency } from '@/utils/functions/formatCurrency';
import { Button } from '@/components/button';
import { LinkButton } from '@/components/link-button';
import { Feather } from '@expo/vector-icons';
import { useCartStore } from '@/stores/cart-store';



export default function ProductDetails(){
    const cartStore = useCartStore();
    const navigate = useNavigation();

    const { id } = useLocalSearchParams();
    const product = PRODUCTS.filter(item=> item.id === id)[0];
    console.log(cartStore.products)

    const handleAddToCart =()=>{
       cartStore.add(product);
        navigate.goBack();
    };

    return (
        <View className='flex-1'>
            <Image 
                source={product.cover}
                className='h-52 w-full'
                resizeMode='cover'
                />

            <View className='p-5 mt-8 flex-1'>
                <Text className='text-lime-400 text-2xl font-heading my-2'>
                    {formatCurrency(product.price)}
                </Text>

                <Text className='text-slate-400 text-base font-body mb-6 leading-6'>
                    {product.description}
                </Text>

                { product.ingredients.map(ingredient =>(
                    <Text 
                        className='text-slate-400 font-body text-base leading-6'
                        key={ingredient}
                        >
                            {'\u2022'}  {ingredient}
                    </Text>
                ))}

            </View>

            <View
                className='p-5 pb-8 gap-5'
            >
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name='plus-circle' size={20}/>
                    </Button.Icon>

                    <Button.Text>
                        Add to Order
                    </Button.Text>
                </Button>
                
                <LinkButton href='/' title='Return to Menu'/>

            </View>

        </View>
    )
}