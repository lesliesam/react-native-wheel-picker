'use strict';

import React, { Component } from 'react'
import { DatePickerIOS } from 'react-native'


export default class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = { date: this.props.date }
  }
  static propTypes = {
    date: React.PropTypes.instanceOf(Date).isRequired,
    maximumDate: React.PropTypes.instanceOf(Date),
    minimumDate: React.PropTypes.instanceOf(Date),
    mode: React.PropTypes.oneOf(['date', 'time', 'datetime']),
    onDateChange: React.PropTypes.func
  }
  static defaultProps = {
    mode: 'date',
    date: new Date()
  }

  render() {
    const { onDateChange, ...props } = this.props
    return (
      <DatePickerIOS
          {...props}
          onDateChange={(date) => {
            this.setState({date})
            onDateChange && onDateChange(date)
          }}
          date={this.state.date}
      />
    )
  }

  getValue() {
    return this.state.date
  }
}
