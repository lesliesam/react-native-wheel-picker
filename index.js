
import React from 'react'; 
 
import { 
  PickerIOS, 
  Platform, 
} from 'react-native'; 
 
import WheelCurvedPicker from './WheelCurvedPicker' 
 
module.exports = (Platform.OS === 'ios' ? PickerIOS : WheelCurvedPicker) 
module.exports = (WheelCurvedPicker) 
