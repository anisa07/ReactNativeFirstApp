import { Component } from "react";
import React from "react";
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { styles } from './styles';

export default class ProductsListItem extends Component<Props> {
	render() {
		const { item } = this.props;
		const imagePath = `/pics/${item.image}`;
		return (
			<View style={styles.itemContainer}>
				{/*<Image style={{width: 20, height: 20}} source={require(imagePath)} />*/}
				<Text style={styles.itemName}>{item.name}</Text>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Product', {itemId: item.id})}
				>
					<Image style={{width: 20, height: 20}} source={require('./pics/arrowRight.png')} />
				</TouchableOpacity>
			</View>
		);
	}
}
