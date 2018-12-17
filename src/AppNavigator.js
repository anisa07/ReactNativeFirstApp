import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Product from './screens/Product';
import ProductsList from './screens/ProductsList';

const AppStack = createStackNavigator({ ProductsList, Product });
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

