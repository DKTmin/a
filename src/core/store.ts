import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroceryItem } from "./types";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


// ===== SLICE 
type GrocerySliceState = {
    items: GroceryItem[];
}


const initialState: GrocerySliceState = {
    items: [],
};

const grocerySlice = createSlice({
    name: "grocery",
    initialState,
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload);
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateItem(state, action) {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        toggle(state, action) {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.items[index].bought = !state.items[index].bought;
            }
        },
        setAll(state, action: PayloadAction<GroceryItem[]>) {
            state.items = action.payload;
        }
    }
});


// ===== STORe
export const store = configureStore({
    reducer: {
        grocery: grocerySlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
// ===== EXPORTS 
export const { addItem, removeItem, updateItem, setAll, toggle } = grocerySlice.actions;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
