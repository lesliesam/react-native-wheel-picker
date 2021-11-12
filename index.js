"use strict";

import React from "react";

import { Platform, PickerIOS } from "react-native";

import WheelCurvedPicker from "./WheelCurvedPicker";

module.exports = Platform.OS === "ios" ? PickerIOS : WheelCurvedPicker;
