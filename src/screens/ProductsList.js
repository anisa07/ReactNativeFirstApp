import React from "react";
import { Text, View, FlatList } from 'react-native';
import ProductsListItem from './components/ProductListItem';
import { NetConnectionModal } from './components/NetConnectionModal';
import { styles } from '../style/styles';
import { products } from '../data/data';
import { productListUrl } from "../data/settings";

export default class ProductsList extends React.PureComponent {
	state = {
		selected: new Map(),
		items: [],
		page: 1,
		refreshing: false,
	};

	componentDidMount () {
		this.getData();
	}

	getData = () => {
		fetch(productListUrl).then((result) => {
			const products = this.state.items.slice();
			const newProducts = JSON.parse(result._bodyText).items.map(item => {
				item.id = (item.id).toString();
				return item
			});

			this.setState({
				items: products.concat(newProducts),
				refreshing: false
			})
		});
	};

	keyExtractor = () => {
		const key = new Date();
		return (Math.floor(Math.random() * key.getTime())).toString();
	};

	onPressItem = (id) => {
		// updater functions are preferred for transactional updates
		this.setState((state) => {
			// copy the map rather than modifying state.
			const selected = new Map(state.selected);
			selected.set(id, !selected.get(id)); // toggle
			return { selected };
		});
	};

	handleRefresh = () => {
		const page = this.state.page++;

		this.setState({
			refreshing: true,
			page: page,
		}, () => {
			this.getData()
		})
	};

	handleAddMore = () => {
		const page = this.state.page++;

		this.setState({
			page: page,
		}, () => {
			this.getData()
		})
	};

	renderItem = ({ item }) => {
		return <ProductsListItem
			id={item.id}
			item={item}
			page={this.state.page}
			navigation={this.props.navigation}
			onPressItem={this.onPressItem}
			selected={!!this.state.selected.get(item.id)}
		/>
	};


	render () {
		const { navigation } = this.props;
		const title = navigation.getParam('title', 'Products');

		return (
			<View>
				<Text style={styles.title}>{title}</Text>
				<FlatList
					data={this.state.items}
					extraData={this.state}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderItem}
					refreshing={this.state.refreshing}
					onRefresh={this.handleRefresh}
					onEndReached={this.handleAddMore}
					onEndReachedThreshold={100}
				/>
				<NetConnectionModal/>
			</View>
		);
	}
}
