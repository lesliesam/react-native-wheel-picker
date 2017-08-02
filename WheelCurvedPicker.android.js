'use strict';

import React from 'react';
import {
  View,
  ColorPropType,
  requireNativeComponent,
} from 'react-native';


var WheelCurvedPicker = React.createClass ({

  propTypes: {
    ...View.propTypes,

    data: React.PropTypes.array,

    selectedIndex: React.PropTypes.number,

    selectTextColor: ColorPropType,

    itemStyle: React.PropTypes.object, //textColor  textSize

    textSize: React.PropTypes.number,
    textColor: ColorPropType,

    // 设置滚轮选择器指示器样式
    indicatorStyle: React.PropTypes.object, //indicatorColor  indicatorSize

    indicatorSize: React.PropTypes.number,
    indicatorColor: ColorPropType,

    // 设置滚轮选择器是否显示指示器
    indicator: React.PropTypes.bool,

    // 设置滚轮选择器是否显示幕布
    curtain: React.PropTypes.bool,
    // 设置滚轮选择器幕布颜色
    curtainColor: ColorPropType,

    // 设置滚轮选择器是否有空气感
    atmospheric: React.PropTypes.bool,

    // 滚轮选择器是否开启卷曲效果
    curved: React.PropTypes.bool,

    // 设置滚轮选择器可见数据项数量
    visibleItemCount: React.PropTypes.number,

    itemSpace: React.PropTypes.number,

    onValueChange: React.PropTypes.func,

    selectedValue: React.PropTypes.any,

  },

  getDefaultProps(): Object {
    return {
      itemStyle : {color:"white", fontSize:26},
      indicatorStyle: {color:"red", fontSize:2},
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
      items.push({value: index, theValue: child.props.value, label: child.props.label});
    });

    var textSize = props.itemStyle.fontSize
    var textColor = props.itemStyle.color
    var selectTextColor = props.selectTextColor
    var itemSpace = props.itemSpace
    var indicator = props.indicator
    var indicatorColor = props.indicatorStyle.color
    var indicatorSize = props.indicatorStyle.fontSize
    var curtain = props.curtain
    var curtainColor = props.curtainColor
    var atmospheric = props.atmospheric
    var curved = props.curved
    var visibleItemCount = props.visibleItemCount

    return {selectedIndex, items, textSize, textColor, selectTextColor, itemSpace,indicator, indicatorColor, indicatorSize, curtain, curtainColor, atmospheric, curved, visibleItemCount} ;
  },

  _onValueChange: function(e: Event) {
    if (this.props.onValueChange) {
      var selectedItem = this.state.items[e.nativeEvent.data];
      !selectedItem && (selectedItem = {theValue:0});
      this.props.onValueChange(selectedItem.theValue);
    }
  },

  render() {
    return <WheelCurvedPickerNative
    {...this.props}
    onValueChange={this._onValueChange}
    data={this.state.items}
    selectedIndex={parseInt(this.state.selectedIndex)}
    textColor={this.state.textColor}
    textSize={this.state.textSize}
    selectTextColor={this.state.selectTextColor}
    itemSpace={this.state.itemSpace}
    indicator={this.state.indicator}
    indicatorColor={this.state.indicatorColor}
    indicatorSize={this.state.indicatorSize}
    curtain={this.state.curtain}
    atmospheric={this.state.atmospheric}
    curved={this.state.curved}
    visibleItemCount={this.state.visibleItemCount}
  />;
  }
});

WheelCurvedPicker.Item = React.createClass({
  propTypes: {
    value: React.PropTypes.any, // string or integer basically
    label: React.PropTypes.string,
  },

  render: function() {
    // These items don't get rendered directly.
    return null;
  },
});

var WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

module.exports = WheelCurvedPicker;
