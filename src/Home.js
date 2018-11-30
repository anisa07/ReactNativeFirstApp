import { Component } from "react";
import React from "react";
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default class Home extends Component<Props> {
	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Friday the 13th shop</Text>
				<TextInput placeholder="email" style={styles.input}/>
				<TextInput placeholder="password" style={styles.input}/>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('ProductsList')}
					style={styles.button}>
					<Text style={styles.label}> Login </Text>
				</TouchableOpacity>
			</View>
		);
	}
}


