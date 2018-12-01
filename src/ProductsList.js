import { Component } from "react";
import React from "react";
import { Text, View } from 'react-native';
import ProductsListItem from './ProductListItem';
import { styles } from './styles';
import { products } from './data';

export default class ProductsList extends Component<Props> {
	render() {
		return (
			<View style={styles.productList}>
				<Text style={styles.title}>Products</Text>
				{ products.map(item =>
					<ProductsListItem
						key={item.id}
						item={item}
						navigation={this.props.navigation}
					/>
					)
				}
			</View>
		);
	}
}
