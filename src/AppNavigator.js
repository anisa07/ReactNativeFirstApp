import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Cart from './screens/Cart';
import Product from './screens/Product';
import ProductsList from './screens/ProductsList';
import ProductMap from './screens/ProductMap';
import InitialScreen from './screens/InitialScreen';

const AppStack = createStackNavigator({ ProductsList, Product, ProductMap, Cart });
const AppNavigator = createSwitchNavigator(
	{
		App: AppStack,
		Auth: Home,
		InitialScreen,
	},
	{
		headerMode: 'none',
		initialRouteName: 'InitialScreen',
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

