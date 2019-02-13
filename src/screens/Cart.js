import React from "react";
import { View, StyleSheet, Text, NativeStorage } from 'react-native';
import { NetConnectionModal } from './components/NetConnectionModal';
import { cartItemsUrl } from "../data/settings";


const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: 400,
		width: 400,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default class Cart extends React.PureComponent {
	cartItems = [];

	async componentDidMount() {
		const content = await NativeStorage.getItem() || '{}';
		const response = JSON.parse(content);
		const headers = new Headers();

		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', `Bearer ${response.token}`);

		const cartString = await fetch(cartItemsUrl, {
			method: 'GET',
			headers
		});

		this.cartItems = JSON.parse(cartString._bodyText);
	}

	render() {
		return (
			<View style={styles.container}>
				{
					this.cartItems.map(item => <View key={item.sku}>
						<Text>{item.name}</Text>
						<Text>{item.qty}</Text>
					</View>)
				}
				<NetConnectionModal />
			</View>
		);
	}
}
