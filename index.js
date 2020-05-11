'use strict';

import React from 'react';

import {
	Platform,
} from 'react-native';
import {PickerIOS} from '@react-native-community/picker';

import WheelCurvedPicker from './WheelCurvedPicker'

module.exports = (Platform.OS === 'ios' ? PickerIOS : WheelCurvedPicker)
