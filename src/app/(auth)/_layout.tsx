import { Icon } from '@rneui/base'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const AuthLayout = () => {
	console.log('vao day')
	return (
		<Stack>
			<Stack.Screen name="login" options={{ headerShown: false }} />
			<Stack.Screen
				name="register"
				options={{ headerShown: false }}
			/>
		</Stack>
	)
}

export default AuthLayout
