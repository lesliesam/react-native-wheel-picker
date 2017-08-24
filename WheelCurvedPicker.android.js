'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import {
	ColorPropType,
	requireNativeComponent,
	ViewPropTypes
} from 'react-native';


var WheelCurvedPicker = createReactClass ({

	propTypes: {
		...ViewPropTypes,

		data: PropTypes.array,

		textColor: ColorPropType,

		textSize: PropTypes.number,

		itemStyle: PropTypes.object,

		itemSpace: PropTypes.number,

		onValueChange: PropTypes.func,

		selectedValue: PropTypes.any,

		selectedIndex: PropTypes.number,
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

WheelCurvedPicker.Item = createReactClass({
	propTypes: {
		value: PropTypes.any, // string or integer basically
		label: PropTypes.string,
	},

	render: function() {
		// These items don't get rendered directly.
		return null;
	},
});

var WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

module.exports = WheelCurvedPicker;
