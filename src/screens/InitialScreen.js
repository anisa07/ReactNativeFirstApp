import React from "react";
import { AsyncStorage, LayoutAnimation, View } from 'react-native';

export default class InitialScreen extends React.PureComponent {
	constructor(props) {
		super(props);

		this.authenticateSession();
	}

	async authenticateSession() {
		const { navigation } = this.props;

		try {
			const loggedIn = await AsyncStorage.getItem('UserIsLoggedIn');

			if (loggedIn !== null) {
				LayoutAnimation.spring();
				navigation.navigate('ProductsList', { title: 'Cool Product List' });
			} else {
				navigation.navigate('Auth');
			}
		}
		catch(e) {
			console.log(`${e} checking authorise status`)
		}
	}

	render () {
		return (
			<View/>
		)
	}
}


