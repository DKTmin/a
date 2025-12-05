import { View, Text } from 'react-native'
import React, { use, useCallback, useState } from 'react'
import { addItem, toggle, updateItem, useAppDispatch, useAppSelector } from '@/core/store';
import { useFetch } from '@/core/useFetch';
import { GroceryItem } from '@/core/types';
import { Button, TextInput } from 'react-native-paper';
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { AffixAdornment } from 'react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputAffix';

const FormPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { isLoading, GET, POST, PUT, DEL } = useFetch();

    const { items } = useAppSelector(state => state.grocery);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const navigation = useNavigation();

    const [formData, setFormData] = useState<GroceryItem>({
        id: "",
        name: "",
        quantity: 0,
        catagory: "",
        bought: false,
        createdAt: new Date().toISOString(),

    } as GroceryItem);


    useFocusEffect(
        useCallback(() => {
            if (id) {
                GET<GroceryItem>(`/grocery-items/${id}`).then((res) => setFormData(res));
            }
            return () => {
                setFormData({
                    id: "",
                    name: "",
                    quantity: 0,
                    catagory: "",
                    bought: false,
                    createdAt: new Date().toISOString(),

                } as GroceryItem);
                (navigation as any).setParams({ id: undefined });
            };
        }, [id])
    )

    const handleSubmit = () => {
        if (formData.id) {
            // Update existing item
            PUT(`/grocery-items/${formData.id}`, formData).then(() => dispatch(updateItem(formData)));
        } else {
            // Create new item
            POST('/grocery-items', formData).then(() => dispatch(addItem(formData)));
        }
        setFormData({
            id: "",
            name: "",
            quantity: 0,
            catagory: "",
            bought: false,
            createdAt: new Date().toISOString(),

        } as GroceryItem);
        router.push('/(home)');
    }

   

    return (
        <View className='flex flex-1 justify-center items-center'>
            <View className='px-4 gap-4'>
                <TextInput label="Name"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <TextInput label="Quantity"
                    value={formData.quantity.toString()}
                    onChangeText={(text) => setFormData({ ...formData, quantity: isNaN(Number(text)) ? 0 : Number(text) })}
                    keyboardType='numeric'
                />
                <TextInput label="Category"
                    value={formData.catagory}
                    onChangeText={(text) => setFormData({ ...formData, catagory: text })}
                />
                <Button mode='contained' onPress={handleSubmit}>Submit</Button>
                <Button mode='contained' onPress={() => router.back()}>Back</Button>
            </View>
        </View>
    )
}

export default FormPage