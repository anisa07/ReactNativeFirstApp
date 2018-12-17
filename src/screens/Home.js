import { Component } from "react";
import React from "react";
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { NetConnectionModal } from './components/NetConnectionModal';
import { styles } from '../style/styles';
import { loginUrl } from "../data/settings";

export default class Home extends React.PureComponent {
	state = {
		email: '',
		pwd: ''
	};

	handleLogin = () => {
		const { email, pwd } = this.state;
		const myHeaders = new Headers();

		myHeaders.append('Content-Type', 'application/json');
		fetch(loginUrl, {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({ username: email, password: pwd })
		}).then(res => {
				if (res.status === 200) {
					this.props.navigation.navigate('ProductsList', {title: 'Cool Product List'});
				}
				console.log(res.status)
			}).catch(e => {
			console.log(e)
		});
		// this.props.navigation.navigate('ProductsList', {title: 'Cool Product List'});
	};

	handleChangeEmail = (email) => {
		this.setState({ email })
	};

	handleChangePwd = (pwd) => {
		this.setState({ pwd })
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
				<TouchableOpacity
					onPress={this.handleLogin}
					style={styles.button}>
					<Text style={styles.label}> Login </Text>
				</TouchableOpacity>
				<NetConnectionModal />
			</View>
		);
	}
}


