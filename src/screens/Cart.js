import React from "react";
import { View, StyleSheet, Text, NativeModules, TouchableOpacity } from 'react-native';
import { NetConnectionModal } from './components/NetConnectionModal';
import { cartItemsUrl } from "../data/settings";
import { styles } from '../style/styles';

const { NativeStorage } = NativeModules;

export default class Cart extends React.PureComponent {
	state = {
		cartItems: [],
	};


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

		this.setState({
			cartItems: JSON.parse(cartString._bodyText)
		});
		console.log(this.cartItems);
	}

	handleOpenProduct = () => {
		this.props.navigation.navigate('Product')
	};

	render() {
		return (
			<View style={styles.container2}>
				<Text>Cart</Text>
				<View>
					{
						this.state.cartItems.map(item => <View key={item.sku}>
							<View style={styles.itemContainer}>
								<Text>{item.name}</Text>
								<Text>{`  ${item.qty}`}</Text>
							</View>
						</View>)
					}
				</View>
				<TouchableOpacity
					onPress={this.handleOpenProduct}
					style={styles.button}>
					<Text style={styles.label}>Product</Text>
				</TouchableOpacity>
				<NetConnectionModal />
			</View>
		);
	}
}
