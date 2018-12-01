import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Product from './Product';
import ProductsList from './ProductsList';

const AppNavigator = createStackNavigator({
		Home,
		ProductsList,
		Product,
	},
	{
		initialRouteName: "Home"
	}
);
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
