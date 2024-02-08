import { useState, useRef  } from 'react';
import { View, FlatList, SectionList, Text } from "react-native";
import { Header } from '@/components/header';
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products';
import { CategoryButton } from "@/components/category-button";
import { Product } from '@/components/product';
import { Link } from 'expo-router';
import { useCartStore } from '@/stores/cart-store';


export default function Home() {
  const cardStore = useCartStore();

  const[ category, setCategory ] = useState('');
  const sectionListRef = useRef<SectionList<ProductProps>>(null);


  const cartQuantityItems = cardStore.products.reduce((total, currentProduct) => total + currentProduct.quantity, 0);


  function handleSelectedCategory(categorySelected: string){
    setCategory(categorySelected);

    const sectionIndex = CATEGORIES.findIndex(categoryItem => categoryItem === categorySelected );
    
    if(sectionListRef.current){
      // por padrão mostrar o item no index 0 na tela (itemIndex:0) 
      // ao selecionar outra categoria vai fazer scroll para o sectionIndex selecionado
      sectionListRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex
      })
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title='Place your order' cartQuantity={cartQuantityItems} />
      <FlatList 
        data={CATEGORIES}
        keyExtractor={(item)=>item}
        renderItem={({item})=>(
          <CategoryButton title={item} onPress={()=>handleSelectedCategory(item)} isSelected={item === category}/>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        className='max-h-10 mt-5'
        contentContainerStyle={{ gap: 12, paddingHorizontal:20}}
        />
    
      <SectionList 
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item)=>item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({item})=>
        (
          <Link href={`/productDetails/${item.id}`} asChild>
            <Product data={item}/>
          </Link>
          )}
          renderSectionHeader={({ section: {title}})=>(
            <Text 
            className='text-white font-heading mt-8 mb-3 text-xl '>
            {title}
            </Text>
            )}
            showsVerticalScrollIndicator={false}
            
        className='p-5 flex-1'
        contentContainerStyle={{ paddingBottom: 100}}
            />

    </View>
  );
}
