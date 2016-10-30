'use strict';

import React, { Component } from 'react'
import { View } from 'react-native'
import Picker from './picker'
import moment from 'moment'
import _ from 'lodash'

const styles = {
  picker: {
    flex: 1
  }
}

const dayNumOfMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]    // 各个月份的天数
export default class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = { date: this.props.date }
    let date = moment(this.state.date)
    this.newValue = {
      year: this.state.date.getFullYear(),
      month: this.state.date.getMonth(),
      day: this.state.date.getDate(),
      hour: this.state.date.getHours(),
      minute: this.state.date.getMinutes()
    }

    let dayNum = this._getCurrentDayNumOfMonth()
    this.state.dayRange = this._genDateRange(dayNum)

    // 生成年份范围
    let minYear = this.props.minimumDate.getFullYear()
    let maxYear = this.props.maximumDate.getFullYear()
    if ((maxYear - minYear) >= 1) {
      this.state.yearRange = _.map(_.range(minYear, maxYear + 1), (n) => {
        return { value: n, label: `${n}${this.props.labelUnit.year}` }
      })
    } else {
      this.state.yearRange = [ { value: minYear, label: `${minYear}${this.props.labelUnit.year}` } ]
    }

    // 生成月份范围
    this.state.monthRange = _.times(12, (n) => {
      return { value: n + 1, label: `${n + 1}${this.props.labelUnit.month}` }
    })
  }
  static propTypes = {
    labelUnit: React.PropTypes.shape({
      year: React.PropTypes.string,
      month: React.PropTypes.string,
      day: React.PropTypes.string
    }),
    date: React.PropTypes.instanceOf(Date).isRequired,
    maximumDate: React.PropTypes.instanceOf(Date),
    minimumDate: React.PropTypes.instanceOf(Date),
    mode: React.PropTypes.oneOf(['date', 'time', 'datetime']),
    onDateChange: React.PropTypes.func
  }
  static defaultProps = {
    labelUnit: { year: '年', month: '月', day: '日' },
    mode: 'date',
    maximumDate: moment().add( 10, 'years' ).toDate(),
    minimumDate: moment().add( -10, 'years' ).toDate(),
    date: new Date()
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.datePicker}
        {this.timePicker}
      </View>
    )
  }

  get datePicker() {
    if (!_.includes(['date', 'datetime'], this.props.mode)) {
      return []
    }

    return [
      <View key="year" style={styles.picker}>
        <Picker
          ref="year"
          selectedValue={this.state.date.getFullYear()}
          pickerData={this.state.yearRange}
          onValueChange={(value) => {
            let oldYear = this.newValue.year
            this.newValue.year = value
            this._checkDate(oldYear, this.newValue.month, this.newValue.day)
            this.props.onDateChange && this.props.onDateChange(this.getValue())
          }}
        />
      </View>,
      <View key="month" style={styles.picker}>
        <Picker
          ref="month"
          selectedValue={this.state.date.getMonth() + 1}
          pickerData={this.state.monthRange}
          onValueChange={(value) => {
            let oldMonth = this.newValue.month
            this.newValue.month = value - 1
            this._checkDate(this.newValue.year, oldMonth, this.newValue.day)
            this.props.onDateChange && this.props.onDateChange(this.getValue())
          }}
        />
      </View>,
      <View key="date" style={styles.picker}>
        <Picker
          ref="date"
          selectedValue={this.state.date.getDate()}
          pickerData={this.state.dayRange}
          onValueChange={(value) => {
            let oldDay = this.newValue.month
            this.newValue.day = value
            this._checkDate(this.newValue.year, this.newValue.month, oldDay)
            this.props.onDateChange && this.props.onDateChange(this.getValue())
          }}
        />
      </View>
    ]
  }
  get timePicker() {
    if (!_.includes(['time', 'datetime'], this.props.mode)) {
      return []
    }
    return [
      <View key="hour" style={styles.picker}>
        <Picker
          ref="hour"
          selectedValue={this.state.date.getHours()}
          pickerData={_.range(0, 24)}
          onValueChange={(value) => {
            this.newValue.hour = value
            this.props.onDateChange && this.props.onDateChange(this.getValue())
          }}
        />
      </View>,
      <View key="minute" style={styles.picker}>
        <Picker
          ref="minute"
          selectedValue={this.state.date.getMinutes()}
          pickerData={_.range(0, 60)}
          onValueChange={(value) => {
            this.newValue.minute = value
            this.props.onDateChange && this.props.onDateChange(this.getValue())
          }}
        />
      </View>
    ]
  }

  _checkDate(oldYear, oldMonth, oldDay) {                             // 检查新的值是否合法
    let currentMonth = this.newValue.month
    let currentYear = this.newValue.year
    let currentDay = this.newValue.day


    let dayRange = this.state.dayRange
    let dayNum = dayRange.length
    if (oldMonth !== currentMonth || oldYear !== currentYear) {            // 月份有发动
      dayNum = this._getCurrentDayNumOfMonth()
    }
    if (dayNum !== dayRange.length) {                                   // 天数有变
      dayRange = this._genDateRange(dayNum)
      if (currentDay > dayNum) {
        currentDay = this.newValue.day = dayNum
        this.refs.date.state.selectedValue = dayNum
      }
      this.setState({ dayRange })
    }

    let unit = undefined
    if (this.props.mode === 'date') {
      unit = 'day'
    }

    let { year, month, day, hour, minute } = this.newValue
    let currentTime = moment([year, month, day, hour, minute])
    let min = moment(this.props.minimumDate)
    let max = moment(this.props.maximumDate)
    let adjustToTime = currentTime
    if (currentTime.isBefore(min, unit)) {    // 超出最小值
      adjustToTime = min
    }
    if (currentTime.isAfter(max, unit)) {     // 超出最大值
      adjustToTime = max
    }
    if (!currentTime.isSame(adjustToTime)) {  // 超出选择范围
      year = adjustToTime.get('year')
      month = adjustToTime.get('month') + 1
      day = adjustToTime.get('date')
      hour = adjustToTime.get('hour')
      minute = adjustToTime.get('minute')

      this.refs.year && this.refs.year.setState({selectedValue: year})
      this.refs.month && this.refs.month.setState({selectedValue: month})
      this.refs.date && this.refs.date.setState({selectedValue: day})
      this.refs.hour && this.refs.hour.setState({selectedValue: hour})
      this.refs.minute && this.refs.minute.setState({selectedValue: minute})
    }
  }
  _getCurrentDayNumOfMonth() {
    let currentMonth = this.newValue.month
    let currentYear = this.newValue.year
    let dayNum

    if (currentMonth === 1) {                // 当前为2月份
      if (moment([currentYear]).isLeapYear()) {
        dayNum = 29    // 闰年2月29天
      } else {
        dayNum = 28    // 否则28天
      }
    } else {
      dayNum = dayNumOfMonth[currentMonth]
    }

    return dayNum
  }
  _genDateRange(dayNum) {     // 生成日期范围
    return _.times(dayNum, (n) => {
      return { value: n + 1, label: `${n + 1}${this.props.labelUnit.day}` }
    })
  }

  getValue() {
    const { year, month, day, hour, minute } = this.newValue
    let date = new Date(year, month, day, hour, minute)
    if (date < this.props.minimumDate) {
      date = this.props.minimumDate
    }
    if (date > this.props.maximumDate) {
      date = this.props.maximumDate
    }
    return date
  }
}
