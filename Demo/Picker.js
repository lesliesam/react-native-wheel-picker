import React, { Component } from 'react';
import Picker from 'react-native-wheel-picker';
const PickerItem = Picker.Item;
import _ from 'lodash';

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

export default class PickerContainer extends Component {
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
    return (
      <Picker
        style={[styles.picker, this.props.style]}
        itemStyle={_.assign({}, styles.picker__item, this.props.itemStyle)}
        selectedValue={this.state.selectedValue}
        onValueChange={(value) => {
          this.setState({ selectedValue: value })
          this.props.onValueChange && this.props.onValueChange( value )
        }}
      >
        {this.props.pickerData.map((data, index) => (
            <PickerItem key={index} value={data.value || data} label={data.label || data.toString()} />
          )
        )}
      </Picker>
    )
  }

  getValue() {
    return this.state.selectedValue
  }
}
