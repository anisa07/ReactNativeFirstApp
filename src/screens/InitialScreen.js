import React from "react";
import { LayoutAnimation, View, NativeModules } from 'react-native';
import { NetConnectionModal } from "./components/NetConnectionModal";

export default class InitialScreen extends React.PureComponent {
	constructor(props) {
		super(props);

		this.authenticateSession();
	}

	authenticateSession() {
		const { navigation } = this.props;

		NativeModules.NativeStorage.getItem((content = '{}') => {
			const response = JSON.parse(content);

			if (response.UserIsLoggedIn) {
				LayoutAnimation.spring();
				navigation.navigate('ProductsList', { title: 'Cool Product List' });
			} else {
				navigation.navigate('Auth');
			}
		});
	}

	render () {
		return (
			<View/>
		)
	}
}


