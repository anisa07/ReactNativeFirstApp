import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Product from './Product';
import ProductsList from './ProductsList';

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

