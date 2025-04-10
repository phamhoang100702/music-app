import React, { useState, useLayoutEffect } from 'react'
import { TextInput, View, StyleSheet, Platform } from 'react-native'
import { useNavigation } from 'expo-router'
import { colors } from '@/constants/tokens'
import { SearchBarProps } from 'react-native-screens'

export const useNavigationSearch = ({
																			searchBarOptions,
																		}: {
	searchBarOptions?: SearchBarProps
}) => {
	const [search, setSearch] = useState('')
	const navigation = useNavigation()

	const handleOnChangeText = (text: string) => {
		setSearch(text)
	}

	// Tạo thanh tìm kiếm tùy chỉnh
	const renderSearchBar = () => {
		return (
			<View style={styles.searchBarContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search..."
					value={search}
					onChangeText={handleOnChangeText}
				/>
			</View>
		)
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			// Đặt thanh tìm kiếm vào headerRight cho cả iOS và Android
			headerRight: () => renderSearchBar(),
		})
	}, [navigation, searchBarOptions, search])

	return search
}

const styles = StyleSheet.create({
	searchBarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#333', // Màu xám tối để tạo sự nổi bật nhưng không quá đen
		borderRadius: 13,
		paddingHorizontal: 10,
		height: 40,
		width: 200,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		padding: 0,
		color: 'white', // Văn bản vẫn giữ màu trắng để dễ đọc trên nền tối
	},
})

