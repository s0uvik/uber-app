import { images } from "@/constant";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-2xl font-JakartaBold">Chat</Text>
        <View className="flex-1 h-fit flex justify-start items-center pt-8">
          <Image
            source={images.message}
            alt="message"
            className="w-full h-40"
            resizeMode="contain"
          />
          <Text className="text-2xl text-center font-JakartaSemiBold mt-3">
            No Messages Yet
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
