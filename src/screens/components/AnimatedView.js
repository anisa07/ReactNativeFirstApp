import React from 'react';
import { Animated } from 'react-native';

export class AnimatedView extends React.Component {
	state = {
		animInitValue: new Animated.Value(0),
	};

	componentDidMount() {
		Animated.timing(
			this.state.animInitValue,
			{
				toValue: 1,
				duration: 1000,
			}
		).start();
	}

	render() {
		let { animInitValue } = this.state;

		return (
			<Animated.View
				style={{
					...this.props.style,
					opacity: animInitValue,
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}
