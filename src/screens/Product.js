import { Component } from "react";
import React from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NetConnectionModal } from './components/NetConnectionModal';
import { styles } from '../style/styles';

export default class Product extends React.PureComponent {
	render() {
		const { navigation } = this.props;
		const item = navigation.getParam('item', {});

		return (
			<View style={styles.containerDescription}>
				<View style={styles.imageTitle}>
					<Image style={{width: 25, height: 25}} source={require('../pics/map.png')}  />
					<Text style={styles.product} >{item.name}</Text>
				</View>
				<Text style={styles.description}>{item.description}</Text>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('ProductsList')}
					style={styles.button}>
					<Text style={styles.label}>Products</Text>
				</TouchableOpacity>
				<NetConnectionModal />
			</View>
		);
	}
}
