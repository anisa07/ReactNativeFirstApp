import React from "react";
import {
	TextInput,
	Text,
	View,
	TouchableOpacity,
	NativeModules,
	LayoutAnimation,
	Vibration,
} from 'react-native';
import LottieView from 'lottie-react-native';
import DeviceInfo from 'react-native-device-info';
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
		niceMg: `Only TODAY, we have special SALE proposals 
		for users of ${DeviceInfo.getSystemName()} devices, located in ${DeviceInfo.getDeviceCountry()}.`,
		waitLogin: false
	};

	handleLogin = async () => {
		const { email, pwd } = this.state;
		this.setState({ waitLogin: true });
		const myHeaders = new Headers();

		this.handleChangeShowNotification(false);

		myHeaders.append('Content-Type', 'application/json');

		try {
			const response = await fetch(loginUrl, {
				method: 'POST',
				headers: myHeaders,
				body: JSON.stringify({ username: email, password: pwd })
			});


			switch(response.status){
				case(200):
					try {
						console.log(response._bodyText)
						NativeModules.NativeStorage.setItem(JSON.stringify({
							UserIsLoggedIn: true,
							//token: response._bodyText
							token: response._bodyText.slice(1, response._bodyText.length-1),
						}));

					} catch (error) {
						console.log(`${error} setting authorise status`)
					}
					LayoutAnimation.spring();
					this.props.navigation.navigate('ProductsList', { title: 'Cool Product List' });
					break;
				case(401):
					this.handleChangeShowNotification(true);
					this.setState({ waitLogin: false });
					Vibration.vibrate(700);
					break;
				default:
					this.setState({ waitLogin: false });
					console.log(response.status)
			}
		}
		catch (error) {
			console.log(`${error} fetching login and pwd`)
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
		const { waitLogin, showNotification, pwd, email } = this.state;
		const internalContainerClass = waitLogin ? styles.containerOpacity : styles.container;

		return (
			<View style={styles.container}>
				<View style={internalContainerClass}>
					<Text style={styles.title}>Friday the 13th shop</Text>
					<Text style={styles.subtitle}>{this.state.niceMg}</Text>
					<TextInput
						placeholder="login"
						style={styles.input}
						value={email}
						onChangeText={(email) => this.handleChangeEmail(email)}/>
					<TextInput
						placeholder="password"
						style={styles.input}
						value={pwd}
						secureTextEntry={true}
						onChangeText={(pwd) => this.handleChangePwd(pwd)}/>
					{showNotification && <Text style={styles.errorText}>Wrong login or password!!!</Text>}
					<TouchableOpacity
						onPress={this.handleLogin}
						style={styles.button}>
						<Text style={styles.label}> Login </Text>
					</TouchableOpacity>
				</View>
				{waitLogin && <LottieView
					source={require('../pics/shape_circle_color_full.json')}
					autoPlay
					loop
				/>}
				<NetConnectionModal/>
			</View>
		);
	}
}


