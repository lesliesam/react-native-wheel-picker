import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Picker from './picker';

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
});

export default class DatePicker extends PureComponent {
  static propTypes = {
    labelUnit: PropTypes.shape({
      year: PropTypes.string,
      month: PropTypes.string,
      date: PropTypes.string,
    }),
    date: PropTypes.instanceOf(Date).isRequired,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onDateChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    labelUnit: { year: '', month: '', date: '' },
    mode: 'date',
    maximumDate: moment().add(10, 'years').toDate(),
    minimumDate: moment().add(-10, 'years').toDate(),
    date: new Date(),
  };

  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date,
      monthRange: [],
      yearRange: [],
    };

    const date = moment(this.state.date);
    this.newValue = {};

    ['year', 'month', 'date', 'hour', 'minute'].forEach((s) => { this.newValue[s] = date.get(s); });

    const dayNum = date.daysInMonth();
    this.state.dayRange = this.genDateRange(dayNum);

    const minYear = this.props.minimumDate.getFullYear();
    const maxYear = this.props.maximumDate.getFullYear();

    for (let i = 1; i <= 12; i += 1) {
      this.state.monthRange.push({ value: i, label: `${i}${this.props.labelUnit.month}` });
    }

    this.state.yearRange.push({ value: minYear, label: `${minYear}${this.props.labelUnit.year}` });

    for (let i = minYear + 1; i <= maxYear + 1; i += 1) {
      this.state.yearRange.push({ value: i, label: `${i}${this.props.labelUnit.year}` });
    }
  }

  onYearChange = (year) => {
    const oldYear = this.newValue.year;

    this.newValue.year = year;
    this.checkDate(oldYear, this.newValue.month);
    this.props.onDateChange(this.getValue());
  };

  onMonthChange = (month) => {
    const oldMonth = this.newValue.month;

    this.newValue.month = month - 1;
    this.checkDate(this.newValue.year, oldMonth);
    this.props.onDateChange(this.getValue());
  };

  onDateChange = (date) => {
    this.newValue.date = date;
    this.checkDate(this.newValue.year, this.newValue.month);
    this.props.onDateChange(this.getValue());
  };

  onHourChange = (hour) => {
    this.newValue.hour = hour;
    this.props.onDateChange(this.getValue());
  };

  onMinuteChange = (minute) => {
    this.newValue.minute = minute;
    this.props.onDateChange(this.getValue());
  };

  genDateRange(dayNum) {
    const days = [];

    for (let i = 1; i <= dayNum; i += 1) {
      days.push({ value: i, label: `${i}${this.props.labelUnit.date}` });
    }

    return days;
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {['date', 'datetime'].includes(this.props.mode) && this.datePicker}
        {['time', 'datetime'].includes(this.props.mode) && this.timePicker}
      </View>
    );
  }

  get datePicker() {
    return [
      <View key='year' style={styles.picker}>
        <Picker
          ref={(year) => { this.yearComponent = year; }}
          selectedValue={this.state.date.getFullYear()}
          pickerData={this.state.yearRange}
          onValueChange={this.onYearChange}
        />
      </View>,
      <View key='month' style={styles.picker}>
        <Picker
          ref={(month) => { this.monthComponent = month; }}
          selectedValue={this.state.date.getMonth() + 1}
          pickerData={this.state.monthRange}
          onValueChange={this.onMonthChange}
        />
      </View>,
      <View key='date' style={styles.picker}>
        <Picker
          ref={(date) => { this.dateComponent = date; }}
          selectedValue={this.state.date.getDate()}
          pickerData={this.state.dayRange}
          onValueChange={this.onDateChange}
        />
      </View>,
    ];
  }
  get timePicker() {
    const [hours, minutes] = [[], []];

    for (let i = 0; i <= 24; i += 1) {
      hours.push(i);
    }

    for (let i = 0; i <= 59; i += 1) {
      minutes.push(i);
    }

    return [
      <View key='hour' style={styles.picker}>
        <Picker
          ref={(hour) => { this.hourComponent = hour; }}
          selectedValue={this.state.date.getHours()}
          pickerData={hours}
          onValueChange={this.onHourChange}
        />
      </View>,
      <View key='minute' style={styles.picker}>
        <Picker
          ref={(minute) => { this.minuteComponent = minute; }}
          selectedValue={this.state.date.getMinutes()}
          pickerData={minutes}
          onValueChange={this.onMinuteChange}
        />
      </View>,
    ];
  }

  checkDate(oldYear, oldMonth) {
    const currentMonth = this.newValue.month;
    const currentYear = this.newValue.year;
    const currentDay = this.newValue.date;

    let dayRange = this.state.dayRange;
    let dayNum = dayRange.length;

    if (oldMonth !== currentMonth || oldYear !== currentYear) {
      dayNum = moment(`${currentYear}-${currentMonth + 1}`, 'YYYY-MM').daysInMonth();
    }

    if (dayNum !== dayRange.length) {
      dayRange = this.genDateRange(dayNum);

      if (currentDay > dayNum) {
        this.newValue.date = dayNum;
        this.dateComponent.setState({ selectedValue: dayNum });
      }

      this.setState({ dayRange });
    }

    const unit = this.props.mode === 'date' ? 'day' : undefined;
    const current = Object.assign({}, this.newValue, { date: this.newValue.date });
    let currentTime = moment(current);
    const min = moment(this.props.minimumDate);
    const max = moment(this.props.maximumDate);
    let isCurrentTimeChanged = false;

    if (currentTime.isBefore(min, unit)) {
      [currentTime, isCurrentTimeChanged] = [min, true];
    } else if (currentTime.isAfter(max, unit)) {
      [currentTime, isCurrentTimeChanged] = [max, true];
    }

    if (isCurrentTimeChanged) {
      if (this.monthComponent) {
        this.monthComponent.setState({ selectedValue: currentTime.get('month') + 1 });
      }

      ['year', 'date', 'hour', 'minute'].forEach((segment) => {
        const ref = this[`${segment}Component`];

        return ref && ref.setState({ selectedValue: currentTime.get(segment) });
      });
    }
  }

  getValue() {
    const { year, month, date, hour, minute } = this.newValue;
    const nextDate = new Date(year, month, date, hour, minute);

    if (nextDate < this.props.minimumDate) {
      return this.props.minimumDate;
    }

    return nextDate > this.props.maximumDate ? this.props.maximumDate : nextDate;
  }
}
