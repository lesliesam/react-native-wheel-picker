'use strict';

import React from 'react';
import {
	View,
	ColorPropType,
	requireNativeComponent,
} from 'react-native';


var WheelCurvedPicker = React.createClass ({

	propTypes: {
		...View.propTypes,

		data: React.PropTypes.array,

		textColor: ColorPropType,

		textSize: React.PropTypes.number,

		itemStyle: React.PropTypes.object,

		itemSpace: React.PropTypes.number,

		onValueChange: React.PropTypes.func,

		selectedValue: React.PropTypes.any,

		selectedIndex: React.PropTypes.number,
	},

	getDefaultProps(): Object {
		return {
			itemStyle : {color:"white", fontSize:26},
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

		var textSize = props.itemStyle.fontSize
		var textColor = props.itemStyle.color

		return {selectedIndex, items, textSize, textColor};
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
				textColor={this.state.textColor}
				textSize={this.state.textSize}
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
