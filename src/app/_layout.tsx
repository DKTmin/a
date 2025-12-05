import "../global.css";
import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "@/core/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView className="flex flex-1">
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
