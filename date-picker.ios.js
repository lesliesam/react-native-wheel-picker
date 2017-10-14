import React, { Component } from 'react';
import { DatePickerIOS } from 'react-native';
import PropTypes from 'prop-types';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = { date: this.props.date };
  }

  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onDateChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    mode: 'date',
    date: new Date(),
  };

  render() {
    const { onDateChange, ...props } = this.props;

    return (
      <DatePickerIOS
        {...props}
        onDateChange={(date) => {
          this.setState({ date });
          onDateChange(date);
        }}
        date={this.state.date}
      />
    );
  }

  getValue() {
    return this.state.date;
  }
}
