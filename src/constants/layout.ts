import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors } from './tokens'
import { Platform } from 'react-native'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	headerLargeTitle: Platform.OS === 'ios', // Only apply on iOS
	headerLargeStyle: {
		backgroundColor: colors.background,
	},
	headerLargeTitleStyle: {
		color: colors.text,
	},
	headerTintColor: colors.text,
	headerTransparent: Platform.OS === 'ios', // Only apply on iOS
	headerStyle: {
		backgroundColor: colors.background
	},
	headerTitleStyle: {
		color: colors.text,
		fontSize: Platform.OS === 'android' ? 24 : undefined, // Increase font size for Android
	},
	headerShadowVisible: false,
}
