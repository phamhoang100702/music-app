import { Icon } from "@rneui/base";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function AuthLayout() {
	const navigate = useRouter();
	return (
		<Stack>
			<Stack.Screen name="login" options={{ headerShown: false }} />
	<Stack.Screen
	name="otp"
	options={{
		headerStyle: { backgroundColor: "#55B3F3" },
		headerTitle: "",
			headerLeft: (props) => (
			<TouchableOpacity onPress={() => navigate.back()}>
		<Icon {...props} size={30} color={"#fff"} name="arrowleft" type="antdesign" />
			</TouchableOpacity>
	),
		headerTitleAlign: "center",
			headerTitleStyle: { color: "#fff" },
		headerShadowVisible: false,
	}}
	/>
	<Stack.Screen
	name="register"
	options={{
		headerStyle: { backgroundColor: "#55B3F3" },
		headerTitle: "Register",
			headerLeft: (props) => (
			<TouchableOpacity onPress={() => navigate.back()}>
		<Icon {...props} size={30} color={"#fff"} name="arrowleft" type="antdesign" />
			</TouchableOpacity>
	),
		headerTitleAlign: "center",
			headerTitleStyle: { color: "#fff" },
		headerShadowVisible: false,
	}}
	/>
	</Stack>
);
}
