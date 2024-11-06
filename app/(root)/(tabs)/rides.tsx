import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constant";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rides = () => {
  const { user } = useUser();
  const { data: ride, loading } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  return (
    <SafeAreaView>
      <FlatList
        data={ride}
        // data={[]}
        renderItem={({ item }) => <RideCard ride={item} />}
        className=" px-4"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={() => (
          <View className=" flex justify-center items-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className=" w-40 h-40"
                  alt="no recent ride found"
                  resizeMode="contain"
                />
                <Text>No recent Ride found</Text>
              </>
            ) : (
              <ActivityIndicator size="large" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <Text className="text-2xl font-JakartaBold my-3">All Rides</Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;
