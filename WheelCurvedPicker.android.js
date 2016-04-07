'use strict';

var React = require('react-native');
var {
	View,
	ColorPropType,
	requireNativeComponent,
} = React;


var WheelCurvedPicker = React.createClass ({

	propTypes: {
		...View.propTypes,

		data: React.PropTypes.array,

		currentTextColor: ColorPropType,
		
		otherTextColor: ColorPropType,
		
		textSize: React.PropTypes.number,
		
		itemSpace: React.PropTypes.number,

		onValueChange: React.PropTypes.func,

		selectedValue: React.PropTypes.any,

		selectedIndex: React.PropTypes.number,
	},

	getDefaultProps(): Object {
		return {
			currentTextColor: '#ffffff',
			otherTextColor: '#cccccc',
			textSize: 25,
			itemSpace: 20,
		};
	},

	getInitialState: function() {
		return this._stateFromProps(this.props);
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState(this._stateFromProps(nextProps));
	},

	_stateFromProps: function(props) {
		var selectedIndex = 0;
		var items = [];
		React.Children.forEach(props.children, function (child, index) {
			if (child.props.value === props.selectedValue) {
				selectedIndex = index;
			}
			items.push({value: child.props.value, label: child.props.label});
		});
		return {selectedIndex, items};
	},

	_onValueChange: function(e: Event) {
		if (this.props.onValueChange) {
			this.props.onValueChange(e.nativeEvent.data);
		}
	},

	render() {
		return <WheelCurvedPickerNative 
				{...this.props}
				onValueChange={this._onValueChange}
				data={this.state.items}
				selectedIndex={parseInt(this.state.selectedIndex)} />;
	}
});

WheelCurvedPicker.Item = React.createClass({
	propTypes: {
		value: React.PropTypes.any, // string or integer basically
		label: React.PropTypes.string,
	},

	render: function() {
		// These items don't get rendered directly.
		return null;
	},
});

var WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

module.exports = WheelCurvedPicker;