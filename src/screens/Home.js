import React from "react";
import {
	TextInput,
	Text,
	View,
	TouchableOpacity,
	NativeModules,
	LayoutAnimation,
	Vibration,
	AsyncStorage,
} from 'react-native';
import { NetConnectionModal } from './components/NetConnectionModal';
import { styles } from '../style/styles';
import { loginUrl } from "../data/settings";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Home extends React.PureComponent {
	state = {
		email: '',
		pwd: '',
		showNotification: false,
	};

	handleLogin = async () => {
		const { email, pwd } = this.state;
		const myHeaders = new Headers();

		this.handleChangeShowNotification(false);

		myHeaders.append('Content-Type', 'application/json');

		try {
			const loggedIn = await AsyncStorage.getItem('UserIsLoggedIn');

			if (loggedIn !== null) {
				LayoutAnimation.spring();
				this.props.navigation.navigate('ProductsList', { title: 'Cool Product List' });
			} else {
				try {
					const response = await fetch(loginUrl, {
						method: 'POST',
						headers: myHeaders,
						body: JSON.stringify({ username: email, password: pwd })
					});

					if (response.status === 200) {
						try {
							await AsyncStorage.setItem('UserIsLoggedIn', 'true');
						} catch (error) {
							console.log(`${error} setting authorise status`)
						}
						LayoutAnimation.spring();
						this.props.navigation.navigate('ProductsList', { title: 'Cool Product List' });
					}
					if (response.status === 400) {
						this.handleChangeShowNotification(true);
						Vibration.vibrate(700);
					} else {
						console.log(response.status)
					}
				}
				catch (error) {
					console.log(`${error} fetching login and pwd`)
				}
			}
		} catch (error) {
			console.log(`${error} checking authorise status`)
		}
	};

	handleChangeEmail = (email) => {
		this.setState({ email })
	};

	handleChangePwd = (pwd) => {
		this.setState({ pwd })
	};

	handleChangeShowNotification = (showNotification) => {
		this.setState({ showNotification })
	};

	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Friday the 13th shop</Text>
				<TextInput
					placeholder="login"
					style={styles.input}
					value={this.state.email}
					onChangeText={(email) => this.handleChangeEmail(email)}/>
				<TextInput
					placeholder="password"
					style={styles.input}
					value={this.state.pwd}
					secureTextEntry={true}
					onChangeText={(pwd) => this.handleChangePwd(pwd)}/>
				{this.state.showNotification && <Text style={styles.errorText}>Wrong login or password!!!</Text>}
				<TouchableOpacity
					onPress={this.handleLogin}
					style={styles.button}>
					<Text style={styles.label}> Login </Text>
				</TouchableOpacity>
				<NetConnectionModal/>
			</View>
		);
	}
}


