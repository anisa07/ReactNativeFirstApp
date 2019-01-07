import React from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NetConnectionModal } from './components/NetConnectionModal';
import { AnimatedView } from './components/AnimatedView';
import { styles } from '../style/styles';

export default class Product extends React.PureComponent {
	handleOpenProductList = () => {
		this.props.navigation.navigate('ProductsList')
	};

	render () {
		const { navigation } = this.props;
		const item = navigation.getParam('item', {});

		return (
			<AnimatedView style={styles.containerDescription}>
				<View style={styles.imageTitle}>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('ProductMap')}
					>
						<Image style={{ width: 25, height: 25 }} source={require('../pics/map.png')}/>
					</TouchableOpacity>
					<Text style={styles.product}>{item.name}</Text>
				</View>
				<Text style={styles.description}>{item.description}</Text>
				<TouchableOpacity
					onPress={this.handleOpenProductList}
					style={styles.button}>
					<Text style={styles.label}>Products</Text>
				</TouchableOpacity>
				<NetConnectionModal/>
			</AnimatedView>
		);
	}
}
