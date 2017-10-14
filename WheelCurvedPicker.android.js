import React from 'react';
import { View, ColorPropType, requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';

const defaultItemStyle = { color: 'white', fontSize: 26 };
const WheelCurvedPicker = React.createClass({
  propTypes: {
    ...View.propTypes,
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
    return { itemSpace: 20 };
  },

  getInitialState() {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setState(this._stateFromProps(nextProps));
  },

  _stateFromProps(props) {
    let selectedIndex = 0;
    const items = [];

    React.Children.forEach(props.children, (child, index) => {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }
      items.push({ value: child.props.value, label: child.props.label });
    });

    const itemStyle = Object.assign({}, defaultItemStyle, props.itemStyle);
    const textSize = itemStyle.fontSize;
    const textColor = itemStyle.color;

    return { selectedIndex, items, textSize, textColor };
  },

  _onValueChange(e: Event) {
    if (this.props.onValueChange) {
      this.props.onValueChange(e.nativeEvent.data);
    }
  },

  render() {
    return (
      <WheelCurvedPickerNative
        {...this.props}
        onValueChange={this._onValueChange}
        data={this.state.items}
        textColor={this.state.textColor}
        textSize={this.state.textSize}
        selectedIndex={parseInt(this.state.selectedIndex, 10)}
      />
    );
  },
});

WheelCurvedPicker.Item = React.createClass({
  propTypes: {
    value: PropTypes.any,
    label: PropTypes.string,
  },

  render() {
    // These items don't get rendered directly.
    return null;
  },
});

const WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

module.exports = WheelCurvedPicker;
