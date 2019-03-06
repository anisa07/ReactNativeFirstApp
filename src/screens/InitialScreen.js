import React from "react";
import * as Keychain from 'react-native-keychain';
import { LayoutAnimation, View } from 'react-native';

export default class InitialScreen extends React.PureComponent {
	constructor (props) {
		super(props);

		this.authenticateSession();
	}

	async authenticateSession () {
		const { navigation } = this.props;
		const credentials = await Keychain.getGenericPassword();

		if (credentials && credentials.password) {
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


