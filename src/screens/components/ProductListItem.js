import React from "react";
import { TouchableOpacity, Text, Image, Animated, Easing, View } from 'react-native';
import { styles } from '../../style/styles';

export default class ProductsListItem extends React.PureComponent {
	scaleValue = new Animated.Value(0);
	itemScale = this.scaleValue.interpolate({
		inputRange: [0, 0.6, 1.1],
		outputRange: [1, 1.2, 1.3]
	});

	handlePressIn = () => {
		Animated.loop(
			Animated.sequence([
				Animated.spring(this.scaleValue, {
					toValue: 1,
					duration: 1000,
					easing: Easing.in,
					useNativeDriver: true
				}),
				Animated.timing(this.scaleValue, {
					toValue: 0,
					duration: 100,
					easing: Easing.linear,
					useNativeDriver: true
				})
			])
		).start();
	};

	handlePressOut = (item) => {
		Animated.timing(this.scaleValue, {
			toValue: 0,
			duration: 100,
			easing: Easing.linear,
			useNativeDriver: true
		}).start();

		this.props.onPressItem(item.id);
		this.props.navigation.navigate('Product', { itemId: item.id, item });
	};


	render () {
		const { item } = this.props;
		const style = {...{ transform: [{ scale: this.itemScale }] } };
		return (
			<View style={styles.itemContainer}>
				<Text style={styles.itemName}>{item.name}</Text>
				<TouchableOpacity
					onPressOut={() => {
						this.handlePressOut(item)
					}}
					onPressIn={this.handlePressIn}
				>
					<Animated.View style={style}>
						<Image style={{ width: 25, height: 25 }} source={require('../../pics/arrowRight.png')}/>
					</Animated.View>
				</TouchableOpacity>
			</View>
		);
	}
}
