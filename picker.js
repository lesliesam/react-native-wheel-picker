import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import WheelCurvedPicker from './WheelCurvedPicker';
const PickerItem = WheelCurvedPicker.Item;

const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#d3d3d3',
    height: 220,
  },
  picker__item: {
    color: '#333333',
    fontSize: 26,
  },
});


export default class Picker extends Component {
  static propTypes = {
    itemStyle: PropTypes.object,
    onValueChange: PropTypes.func.isRequired,
    pickerData: PropTypes.array.isRequired,
    style: PropTypes.object,
    selectedValue: PropTypes.any,
  };

  static defaultProps = {
    itemStyle: null,
    style: null,
  };

  state = {
    selectedValue: this.props.selectedValue,
  };

  handleChange = (selectedValue) => {
    this.setState({ selectedValue });
    this.props.onValueChange(selectedValue);
  };

  render() {
    const { pickerData, itemStyle, style, ...props } = this.props;

    return (
      <WheelCurvedPicker
        {...props}
        style={[styles.picker, style]}
        itemStyle={Object.assign({}, styles.picker__item, itemStyle)}
        selectedValue={this.state.selectedValue}
        onValueChange={this.handleChange}
      >
        {pickerData.map((data, index) => (
          <PickerItem
            key={index}
            value={data.value || data}
            label={data.label || data.toString()}
          />
        ))}
      </WheelCurvedPicker>
    );
  }

  getValue() {
    return this.state.selectedValue;
  }
}
