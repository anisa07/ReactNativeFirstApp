import { Component } from "react";
import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { products } from './data';
import { styles } from './styles';

export default class Product extends Component<Props> {
	render() {
		const { navigation } = this.props;
		const itemId = navigation.getParam('itemId');
		const product = products.find(product => product.id === itemId);

		return (
			<View style={styles.containerDescription}>
				<View style={styles.imageTitle}>
					<Image style={{width: 25, height: 25}} source={product.image} />
					<Text style={styles.product} >{product.name}</Text>
				</View>
				<Text style={styles.description}>{product.description}</Text>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('ProductsList')}
					style={styles.button}>
					<Text style={styles.label}>Products</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
