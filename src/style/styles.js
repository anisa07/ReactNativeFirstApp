import { StyleSheet } from 'react-native';
const base1 = '#FFFFFF';
const base2 = '#222222';
const base3 = '#CEDB56';
const add1 = '#CCCCCC';
const err = '#FF11BB';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: base1,
	},
	productList: {
		backgroundColor: base1,
	},
	containerDescription: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: base1,
	},
	title: {
		fontSize: 20,
		// marginBottom: 10,
		color: base2,
		fontFamily: 'VINCHAND',
		textAlign: 'center',
	},
	input: {
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: add1,
		padding: 0,
		width: 200,
		marginTop: 15,
		height: 25,
		textAlign: 'center',
		fontFamily: 'VINCHAND'
	},
	button: {
		height: 25,
		width: 50,
		backgroundColor: base3,
		margin: 15,
	},
	label: {
		fontFamily: 'VINCHAND',
		textAlign: 'center',
		width: 50,
	},
	itemContainer: {
		flexDirection: 'row',
		marginBottom: 5
	},
	itemName: {
		flexGrow: 1,
		fontFamily: 'VINCHAND',
		marginLeft: 10,
	},
	product: {
		fontFamily: 'VINCHAND',
		fontSize: 20,
		marginLeft: 5,
		color: base2,
		textAlign: 'left'
	},
	description: {
		margin: 15,
		fontFamily: 'VINCHAND',
		color: base2,
	},
	imageTitle: {
		flexDirection: 'row',
		paddingLeft: 10
	},
	errorText: {
		fontSize: 18,
		color: err,
		fontFamily: 'VINCHAND',
		textAlign: 'center',
		margin: 15
	}
});

export { styles };
