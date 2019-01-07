import React from "react";
import { View, StyleSheet, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { NetConnectionModal } from './components/NetConnectionModal';


const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: 400,
		width: 400,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default class ProductMap extends React.PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121,
					}}
				>
					<Marker
						coordinate={{
							latitude: 37.78825,
							longitude: -122.4324
						}}
						title={'Foo Place'}
						description={'1234 Foo Drive'}
						onPress={() => {
							Linking.openURL(`tel:+79819730864`)
						}}
					>
					</Marker>
				</MapView>
				<NetConnectionModal />
			</View>
		);
	}
}
