'use strict';

import React, { Component } from 'react'
import WheelCurvedPicker from './WheelCurvedPicker'
const PickerItem = WheelCurvedPicker.Item
import _ from 'lodash'


export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.selectedValue
    };
  }

  static propTypes = {
    onValueChange: React.PropTypes.func,
    pickerData: React.PropTypes.array,
    selectedValue: React.PropTypes.any
  }

  static defaultProps = {
    pickerData: []
  }

  render() {
    const { onValueChange, pickerData, ...props } = this.props
    return (
      <WheelCurvedPicker
        onValueChange={(value) => {
          this.setState({ selectedValue: value })
          onValueChange && onValueChange( value )
        }}
        {...props}
      >
        {pickerData.map((data, index) => (
            <PickerItem key={index} value={data.value || data} label={data.label || data.toString()} />
          )
        )}
      </WheelCurvedPicker>
    )
  }

  getValue() {
    return this.state.selectedValue
  }
}
