import React from "react";
import { LayoutAnimation, View, NativeModules } from 'react-native';

const { NativeStorage } = NativeModules;

export default class InitialScreen extends React.PureComponent {
	constructor (props) {
		super(props);

		this.authenticateSession();
	}

	async authenticateSession () {
		const { navigation } = this.props;
		const content = await NativeStorage.getItem() || '{}';
		const response = JSON.parse(content);

		if (response.UserIsLoggedIn) {
			LayoutAnimation.spring();
			navigation.navigate('ProductsList', { title: 'Cool Product List' });
		} else {
			navigation.navigate('Auth');
		}
	}

	render () {
		return (
			<View/>
		)
	}
}


