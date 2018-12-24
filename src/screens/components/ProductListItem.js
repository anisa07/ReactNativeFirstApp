import React from "react";
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { styles } from '../../style/styles';

export default class ProductsListItem extends React.PureComponent {

	onPress = (item) => {
		this.props.onPressItem(item.id);
		this.props.navigation.navigate('Product', {itemId: item.id, item});
	};

	render() {
		const { item } = this.props;

		return (
			<View style={styles.itemContainer}>
				{/*<Image style={{width: 20, height: 20}} source={item.image} />*/}
				<Text style={styles.itemName}>{item.name}</Text>
				<TouchableOpacity
					onPress={() => this.onPress(item)}
				>
					<Image style={{width: 25, height: 25}} source={require('../../pics/arrowRight.png')} />
				</TouchableOpacity>
			</View>
		);
	}
}
