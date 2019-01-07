import React from "react";
import { TouchableOpacity, Text, Image, Animated, Easing, View } from 'react-native';
import { styles } from '../../style/styles';

let scaleValue = new Animated.Value(0);

const itemScale = scaleValue.interpolate({
	inputRange: [0, 0.6, 1.1],
	outputRange: [1, 1.2, 1.3]
});

export default class ProductsListItem extends React.PureComponent {

	handlePressIn = (item) => {
		scaleValue.setValue(0);
		Animated.timing(scaleValue, {
			toValue: 1,
			duration: 1000,
			easing: Easing.linear,
			useNativeDriver: true
		}).start();

		this.props.onPressItem(item.id);
		this.props.navigation.navigate('Product', { itemId: item.id, item });
	};

	handlePressOut = () => {
		Animated.timing(scaleValue, {
			toValue: 0,
			duration: 100,
			easing: Easing.linear,
			useNativeDriver: true
		}).start();
	};


	render () {
		const { item } = this.props;
		const style = {...{ transform: [{ scale: itemScale }] } };
		return (
			<View style={styles.itemContainer}>
				<Text style={styles.itemName}>{item.name}</Text>
				<TouchableOpacity
					onPressIn={() => {
						this.handlePressIn(item)
					}}
					onPressOut={this.handlePressOut}
				>
					<Animated.View style={style}>
						<Image style={{ width: 25, height: 25 }} source={require('../../pics/arrowRight.png')}/>
					</Animated.View>
				</TouchableOpacity>
			</View>
		);
	}
}
