import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Picker from './picker';
import moment from 'moment';

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
});

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date,
      monthRange: [],
      yearRange: [],
    };

    const date = moment(this.state.date);

    this.newValue = {
      year: this.state.date.getFullYear(),
      month: this.state.date.getMonth(),
      day: this.state.date.getDate(),
      hour: this.state.date.getHours(),
      minute: this.state.date.getMinutes(),
    };

    const dayNum = date.daysInMonth();
    this.state.dayRange = this._genDateRange(dayNum);

    const minYear = this.props.minimumDate.getFullYear();
    const maxYear = this.props.maximumDate.getFullYear();

    for (let i = 1; i <= 12; i += 1) {
      this.state.monthRange.push({ value: i, label: `${i}${this.props.labelUnit.month}` });
    }

    this.state.yearRange.push({ value: minYear, label: `${minYear}${this.props.labelUnit.year}` });

    for (let i = minYear + 1; i <= maxYear + 1; i += 1) {
      this.state.yearRange.push({ value: n, label: `${n}${this.props.labelUnit.year}` });
    }
  }

  static propTypes = {
    labelUnit: PropTypes.shape({
      year: PropTypes.string,
      month: PropTypes.string,
      day: PropTypes.string,
    }),
    date: PropTypes.instanceOf(Date).isRequired,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onDateChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    labelUnit: { year: '年', month: '月', day: '日' },
    mode: 'date',
    maximumDate: moment().add(10, 'years').toDate(),
    minimumDate: moment().add(-10, 'years').toDate(),
    date: new Date(),
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.datePicker}
        {this.timePicker}
      </View>
    );
  }

  get datePicker() {
    if (!['date', 'datetime'].includes(this.props.mode)) {
      return [];
    }

    return [
      <View key="year" style={styles.picker}>
        <Picker
          ref="year"
          selectedValue={this.state.date.getFullYear()}
          pickerData={this.state.yearRange}
          onValueChange={(value) => {
            const oldYear = this.newValue.year;
            this.newValue.year = value;
            this._checkDate(oldYear, this.newValue.month, this.newValue.day);
            this.props.onDateChange(this.getValue());
          }}
        />
      </View>,
      <View key="month" style={styles.picker}>
        <Picker
          ref="month"
          selectedValue={this.state.date.getMonth() + 1}
          pickerData={this.state.monthRange}
          onValueChange={(value) => {
            const oldMonth = this.newValue.month;
            this.newValue.month = value - 1;
            this._checkDate(this.newValue.year, oldMonth, this.newValue.day);
            this.props.onDateChange(this.getValue());
          }}
        />
      </View>,
      <View key="date" style={styles.picker}>
        <Picker
          ref="date"
          selectedValue={this.state.date.getDate()}
          pickerData={this.state.dayRange}
          onValueChange={(value) => {
            const oldDay = this.newValue.month;
            this.newValue.day = value;
            this._checkDate(this.newValue.year, this.newValue.month, oldDay);
            this.props.onDateChange(this.getValue());
          }}
        />
      </View>,
    ];
  }
  get timePicker() {
    if (!['time', 'datetime'].includes(this.props.mode)) {
      return [];
    }

    const [hours, minutes] = [[], []];

    for (let i = 0; i <= 24; i += 1) {
      hours.push(i);
    }

    for (let i = 0; i <= 60; i += 1) {
      minutes.push(i);
    }

    return [
      <View key="hour" style={styles.picker}>
        <Picker
          ref="hour"
          selectedValue={this.state.date.getHours()}
          pickerData={hours}
          onValueChange={(value) => {
            this.newValue.hour = value;
            this.props.onDateChange(this.getValue());
          }}
        />
      </View>,
      <View key="minute" style={styles.picker}>
        <Picker
          ref="minute"
          selectedValue={this.state.date.getMinutes()}
          pickerData={minutes}
          onValueChange={(value) => {
            this.newValue.minute = value;
            this.props.onDateChange(this.getValue());
          }}
        />
      </View>,
    ];
  }

  _checkDate(oldYear, oldMonth, oldDay) {
    const currentMonth = this.newValue.month;
    const currentYear = this.newValue.year;
    let currentDay = this.newValue.day;


    let dayRange = this.state.dayRange;
    let dayNum = dayRange.length;

    if (oldMonth !== currentMonth || oldYear !== currentYear) {
      dayNum = moment(`${currentYear}-${currentMonth}`, 'YYYY-MM').daysInMonth();
    }

    if (dayNum !== dayRange.length) {
      dayRange = this._genDateRange(dayNum);

      if (currentDay > dayNum) {
        currentDay = this.newValue.day = dayNum;
        this.refs.date.state.selectedValue = dayNum;
      }

      this.setState({ dayRange });
    }

    let unit;

    if (this.props.mode === 'date') {
      unit = 'day';
    }

    let { year, month, day, hour, minute } = this.newValue;
    const currentTime = moment([year, month, day, hour, minute]);
    const min = moment(this.props.minimumDate);
    const max = moment(this.props.maximumDate);

    let adjustToTime = currentTime;

    if (currentTime.isBefore(min, unit)) {
      adjustToTime = min;
    }

    if (currentTime.isAfter(max, unit)) {
      adjustToTime = max;
    }

    if (!currentTime.isSame(adjustToTime)) {
      year = adjustToTime.get('year');
      month = adjustToTime.get('month') + 1;
      day = adjustToTime.get('date');
      hour = adjustToTime.get('hour');
      minute = adjustToTime.get('minute');

      this.refs.year && this.refs.year.setState({ selectedValue: year });
      this.refs.month && this.refs.month.setState({ selectedValue: month });
      this.refs.date && this.refs.date.setState({ selectedValue: day });
      this.refs.hour && this.refs.hour.setState({ selectedValue: hour });
      this.refs.minute && this.refs.minute.setState({ selectedValue: minute });
    }
  }

  _genDateRange(dayNum) {
    const days = [];

    for (let i = 1; i <= dayNum; i += 1) {
      days.push({ value: i, label: `${i}${this.props.labelUnit.day}` });
    }

    return days;
  }

  getValue() {
    const { year, month, day, hour, minute } = this.newValue;
    let date = new Date(year, month, day, hour, minute);

    if (date < this.props.minimumDate) {
      date = this.props.minimumDate;
    } else if (date > this.props.maximumDate) {
      date = this.props.maximumDate;
    }

    return date;
  }
}
