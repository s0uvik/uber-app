import GoogleTextInput from "@/components/GoogleTextInput";
import * as Location from "expo-location";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constant";
import { useLocationStore } from "@/store";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

export default function Page() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const { data: ride, loading } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermission(false);
      }
      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });
      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].formattedAddress}`,
      });
    };
    requestLocation();
  }, []);

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };
  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };
  return (
    <SafeAreaView className=" bg-general-500">
      <FlatList
        data={ride?.slice(0, 5)}
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
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row justify-between items-center my-5">
              <Text className=" text-lg font-JakartaBold capitalize">
                Welcome,{" "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}
              </Text>
              <TouchableOpacity onPress={handleSignOut}>
                <Image source={icons.out} className="w-5 h-5" />
              </TouchableOpacity>
            </View>

            {/* google text input */}
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
