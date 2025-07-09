import { account } from "@/lib/appwrite";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        router.replace("./user/page");
      } catch (err: any) {
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {/* Custom Error Modal */}
      <Modal visible={!!error} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white w-11/12 max-w-sm p-6 rounded-2xl shadow-lg items-center">
            <Text className="text-xl font-bold text-red-600 mb-2">
              Authentication Error
            </Text>
            <Text className="text-base text-gray-600 text-center mb-4">
              {error}
            </Text>
            <TouchableOpacity
              onPress={() => setError(null)}
              className="bg-red-500 px-6 py-2 rounded-xl"
            >
              <Text className="text-white font-semibold text-base">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
