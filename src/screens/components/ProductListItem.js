import React from "react";
import { TouchableWithoutFeedback, Text, View, Image } from 'react-native';
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
				<TouchableWithoutFeedback
					onPress={() => this.onPress(item)}
					hitSlop={{ top: 20, left: 30, bottom: 20, right: 30 }}
				>
					<Image style={{width: 25, height: 25}} source={require('../../pics/arrowRight.png')} />
				</TouchableWithoutFeedback>
			</View>
		);
	}
}
