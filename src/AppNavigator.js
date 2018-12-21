import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Product from './screens/Product';
import ProductsList from './screens/ProductsList';
import ProductMap from './screens/ProductMap';

const AppStack = createStackNavigator({ ProductsList, Product, ProductMap });
const AppNavigator = createSwitchNavigator(
	{
		App: AppStack,
		Auth: Home,
	},
	{
		initialRouteName: 'Auth',
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

