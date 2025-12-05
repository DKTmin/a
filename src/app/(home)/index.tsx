import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { useFetch } from '@/core/useFetch'
import { setAll, useAppDispatch, useAppSelector } from '@/core/store';
import { GroceryItem } from '@/core/types';
import { router, useFocusEffect } from 'expo-router';
import GroceryItemCard from '@/components/GroceryItemCard';
import { FAB, TextInput } from 'react-native-paper';


const HomePage = () => {
    const { isLoading, GET } = useFetch();

    const { items } = useAppSelector(state => state.grocery);
    const dispatch = useAppDispatch();
    const [searchName, setSearchName] = useState("");

    const handleFecthData = () => {
        GET<GroceryItem[]>('/grocery-items')
            .then((res) => dispatch(setAll(res)));
    }

    useFocusEffect(
        useCallback(() => {
            handleFecthData();
        }, [])
    );
    
    const filterItemsByName = useMemo(() => {
        if (!searchName) return items;
        return items.filter(item => item.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()));
    }, [searchName, items]);

    if (isLoading) {
        return (
            <ActivityIndicator size='large' className='flex flex-1 justify-center items-center' />
        )
    }

    if(items.length === 0) {
        return (
            <View className='flex flex-1 justify-center items-center'>
                <Text>No items found.</Text>
            </View>
        )
    }

    return (
        <View className='flex flex-1 px-4'>
            <Text> Danh sach </Text>
            
            <TextInput
                placeholder="Search by name"
                value={searchName}
                onChangeText={(v) => setSearchName(v)}
                className="border p-2 mb-4"
            />

            <FlatList
                data={filterItemsByName}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <GroceryItemCard data={item} />
                )}
            />

            <FAB className='bg-green-400 absolute bottom-8 right-8' icon="plus"  onPress={() => router.push('/(home)/form')} />
        </View>
    )
}

export default HomePage