import { useState } from 'react';
import { View, FlatList} from "react-native";
import { Header } from '@/components/header';
import { CATEGORIES} from '@/utils/data/products';
import { CategoryButton } from "@/components/category-button";


export default function Home() {
  const[ category, setCategory ] = useState('');

  function handleSelectedCategory(categorySelected: string){
    setCategory(categorySelected);
  }

  return (
    <View className="flex-1 pt-8">
      <Header title='Place your order' cartQuantity={1} />
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
    
    </View>
  );
}
