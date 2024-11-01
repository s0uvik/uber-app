import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { ReactNode, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { icons } from "@/constant";
import Map from "./Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const RideLayout = ({
  children,
  title,
  snapPoints,
}: {
  children: ReactNode;
  title: string;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = useRef(null);
  return (
    <GestureHandlerRootView>
      <View className=" flex-1 bg-white">
        <View className=" flex flex-col h-screen bg-blue-500">
          <View className=" flex flex-row absolute z-10 top-12 items-center justify-center px-4">
            <TouchableOpacity onPress={() => router.back()}>
              <View className=" w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <Image source={icons.backArrow} className=" w-6 h-6" />
              </View>
            </TouchableOpacity>
            <Text className=" text-lg font-JakartaSemiBold ml-5 pb-1">
              {title || "Go back"}
            </Text>
          </View>
          <Map />
        </View>

        <BottomSheet
          keyboardBehavior="extend"
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "85%"]}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 15 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
