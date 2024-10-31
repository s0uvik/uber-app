import { InputFieldProps } from "@/types/type";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  secureTextEntry = false,
  icon,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className=" my-2 w-full">
        <Text
          className={` text-[16px] font-JakartaSemiBold mb-2 ${labelStyle}`}
        >
          {label}
        </Text>
        <View
          className={` flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
        >
          {icon && <Image source={icon} className={` w-6 h-6 ml-4`} />}
          <TextInput
            className={` rounded-full px-4 py-3 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default InputField;