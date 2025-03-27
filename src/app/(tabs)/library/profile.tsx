import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen = () => {
	const [name, setName] = useState('Sơn Tùng M-TP');
	const [bio, setBio] = useState('Ca sĩ nổi tiếng với nhiều bản hit');
	const [genre, setGenre] = useState('Pop, R&B');
	const [avatar, setAvatar] = useState(null);

	// Chọn ảnh từ thư viện
	const pickImage = () => {
		launchImageLibrary({ mediaType: 'photo' }, response => {
			if (response.assets && response.assets.length > 0) {
				setAvatar(response.assets[0].uri);
			}
		});
	};

	return (
		<View style={styles.container}>
			{/* Ảnh đại diện */}
			<TouchableOpacity onPress={pickImage}>
				<Image
					source={avatar ? { uri: avatar } : require('./default-avatar.png')}
					style={styles.avatar}
				/>
			</TouchableOpacity>
			<Text style={styles.label}>Nhấn để thay đổi ảnh</Text>

			{/* Tên */}
			<Text style={styles.label}>Tên ca sĩ</Text>
			<TextInput style={styles.input} value={name} onChangeText={setName} />

			{/* Tiểu sử */}
			<Text style={styles.label}>Tiểu sử</Text>
			<TextInput
				style={[styles.input, { height: 80 }]}
				multiline
				value={bio}
				onChangeText={setBio}
			/>

			{/* Thể loại nhạc */}
			<Text style={styles.label}>Thể loại nhạc</Text>
			<TextInput style={styles.input} value={genre} onChangeText={setGenre} />

			{/* Nút Lưu */}
			<Button title="Lưu thay đổi" onPress={() => alert('Thông tin đã được cập nhật!')} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		alignSelf: 'center',
		marginBottom: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 5,
		marginBottom: 15,
	},
});

export default EditProfileScreen;
