import React from "react";
import { Text, View, FlatList } from 'react-native';
import ProductsListItem from './components/ProductListItem';
import { NetConnectionModal } from './components/NetConnectionModal';
import { styles } from '../style/styles';
import { productListUrl, productListUrl2 } from "../data/settings";

export default class ProductsList extends React.PureComponent {
	state = {
		selected: new Map(),
		items: [],
		page: 11,
		refreshing: false,
		len: 0,
	};

	componentDidMount () {
		this.getData();
	}

	getData = (url = productListUrl) => {
		fetch(url).then((result) => {
			const products = this.state.items.slice();
			const parsedResults = JSON.parse(result._bodyText);
			console.log(parsedResults)
			this.setState({
				len: parsedResults.total_count
			});
			const newProducts = parsedResults.items.map(item => {
				item.id = (item.id).toString();
				const attr = item.custom_attributes.find(attr => {
					if (attr.attribute_code === 'description') {
						return attr;
					}
				});
				item.description = attr ? attr.value.replace(/<.{1,3}>/g, '') : 'fake description';

				return item;
			});

			this.setState({
				items: products.concat(newProducts),
				refreshing: false
			})
		});
	};

	keyExtractor = (item) => item.id;

	onPressItem = (id) => {
		this.setState((state) => {
			const selected = new Map(state.selected);
			selected.set(id, !selected.get(id));
			return { selected };
		});
	};

	handleRefresh = () => {
		const { page, len } = this.state;
		if (page < len) {
			this.setState({
				refreshing: true,
				page: page + 1,
			}, () => {
				this.getData(`${productListUrl2}${page}`)
			})
		}
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
					// onEndReached={this.handleRefresh}
				/>
				<NetConnectionModal/>
			</View>
		);
	}
}
