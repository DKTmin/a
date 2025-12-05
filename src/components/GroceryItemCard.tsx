import { View, Text } from 'react-native'
import React, { use } from 'react'
import { GroceryItem, } from '@/core/types';
import { ActivityIndicator, Button, Card } from 'react-native-paper'
import { useFetch } from '@/core/useFetch';
import { removeItem, toggle, useAppDispatch } from '@/core/store';
import { useRouter } from 'expo-router';

type Props = {
    data: GroceryItem;
}

const GroceryItemCard = ({ data }: Props) => {
    const { isLoading, GET, POST, PUT, DEL } = useFetch();
    const dispatch = useAppDispatch();
    const router = useRouter();
    if (isLoading) {
        return (
            <ActivityIndicator size='large' className='flex flex-1 justify-center items-center' />
        )
    }

    const handleDelete = () => {
        // Confirm deletion
        if (!confirm("Are you sure you want to delete this item?")) return;

        // Delete item
        DEL(`/grocery-items/${data.id}`).then(() => {
            dispatch(removeItem(data.id));
        });
    }

    const handleToggleBought = () => {
        const newData = { ...data, bought: !data.bought };

        PUT(`/grocery-items/${data.id}`, newData)
            .then(() => dispatch(toggle(data.id)));
    };


    return (
        <View className='p-4 bg-white rounded-lg shadow mb-4'>
            <Card onPress={handleToggleBought}>
                <Card.Title title={data.name} />
                <Card.Content>
                    <Text className='text-xl font-bold mb-2'>{data.name}</Text>
                    <Text className='text-gray-600'>Quantity: {data.quantity}</Text>
                    <Text className='text-gray-600'>Bought: {data.bought ? "Yes" : "No"}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => router.push(`/(home)/form?id=${data.id}`)}>Edit</Button>
                    <Button onPress={handleDelete}>Delete</Button>
                </Card.Actions>
            </Card>
        </View>
    )
}

export default GroceryItemCard