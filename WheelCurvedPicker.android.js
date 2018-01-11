'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { View, ColorPropType, requireNativeComponent } from 'react-native'

export default class WheelCurvedPicker extends React.Component {
    static propTypes = {
        ...View.propTypes,

        data: PropTypes.array,

        textColor: ColorPropType,

        indicatorColor: ColorPropType,

        textSize: PropTypes.number,

        itemStyle: PropTypes.object,

        itemSpace: PropTypes.number,

        onValueChange: PropTypes.func,

        selectedValue: PropTypes.any,

        selectedIndex: PropTypes.number
    }

    static defaultProps = {
        itemStyle: { color: 'white', fontSize: 26 },
        itemSpace: 20
    }

    constructor(...params) {
        super(...params)

        this.state = this._stateFromProps(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this._stateFromProps(nextProps))
    }

    _stateFromProps(props) {
        var selectedIndex = 0
        var items = []
        React.Children.forEach(props.children, function(child, index) {
            if (child.props.value === props.selectedValue) {
                selectedIndex = index
            }
            items.push({ value: child.props.value, label: child.props.label })
        })

        var textSize = props.itemStyle.fontSize
        var textColor = props.itemStyle.color

        return { selectedIndex, items, textSize, textColor }
    }

    _onValueChange(e: Event) {
        if (this.props.onValueChange) {
            this.props.onValueChange(e.nativeEvent.data)
        }
    }

    render() {
        return (
            <WheelCurvedPickerNative
                {...this.props}
                onValueChange={this._onValueChange}
                data={this.state.items}
                textColor={this.state.textColor}
                textSize={this.state.textSize}
                selectedIndex={parseInt(this.state.selectedIndex)}
            />
        )
    }
}

WheelCurvedPicker.Item = class extends React.Component {
    static propTypes: {
        value: PropTypes.any, // string or integer basically
        label: PropTypes.string
    }

    render() {
        // These items don't get rendered directly.
        return null
    }
}

let WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker)
