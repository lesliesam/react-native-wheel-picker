'use strict';

var React = require('react-native');

var {
	PickerIOS,
	Platform,
} = React;

var WheelCurvedPicker = require('./WheelCurvedPicker')

module.exports = (Platform.OS === 'ios' ? PickerIOS : WheelCurvedPicker)