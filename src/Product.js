import { Component } from "react";
import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export default class Product extends Component<Props> {
	render() {
		const { navigation } = this.props;
		const item = navigation.getParam('item', {});

		return (
			<View style={styles.containerDescription}>
				<View style={styles.imageTitle}>
					<Image style={{width: 25, height: 25}} source={item.image} />
					<Text style={styles.product} >{item.name}</Text>
				</View>
				<Text style={styles.description}>{item.description}</Text>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('ProductsList')}
					style={styles.button}>
					<Text style={styles.label}>Products</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
