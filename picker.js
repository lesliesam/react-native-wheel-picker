'use strict';

import React, { Component } from 'react'
import WheelCurvedPicker from './WheelCurvedPicker'
const PickerItem = WheelCurvedPicker.Item
import _ from 'lodash'

const styles = {
  picker: {
    backgroundColor: '#d3d3d3',
    height: 220
  },
  picker__item: {
    color: '#333333',
    fontSize: 26
  }
}


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
    const { onValueChange, pickerData, itemStyle, style, ...props } = this.props
    return (
      <WheelCurvedPicker
        {...props}
        style={[styles.picker, style]}
        itemStyle={_.assign({}, styles.picker__item, itemStyle)}
        selectedValue={this.state.selectedValue}
        onValueChange={(value) => {
          this.setState({ selectedValue: value })
          onValueChange && onValueChange( value )
        }}
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
