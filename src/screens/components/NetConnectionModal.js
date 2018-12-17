import React, {Component} from 'react';
import { Modal, NetInfo, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles';

export class NetConnectionModal extends Component<Props> {
	constructor () {
		super();
		this.state = {
			status: true,
			modalVisible: false
		}
	}

	componentDidMount() {
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
		NetInfo.isConnected.fetch().done(
			(isConnected) => { this.setState({ status: isConnected }); }
		);
		console.log(`is modalVisible: ${this.state.modalVisible}`);
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
	}

	handleConnectionChange = (isConnected) => {
		this.setState({ status: isConnected });
		console.log(`is connected: ${this.state.status}`);
		console.log(`is modalVisible: ${this.state.modalVisible}`);
		this.setState({modalVisible: !isConnected});
	};

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {}}>
						<Text>Connection is lost. Try again</Text>
						<TouchableOpacity
							onPress={() => {
								this.setModalVisible(false);
							}}>
							<Text>Close</Text>
						</TouchableOpacity>
				</Modal>
			</View>
		);
	}
}
