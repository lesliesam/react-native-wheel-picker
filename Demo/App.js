import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Picker, DatePicker } from 'rn-wheel-picker';

const styles = StyleSheet.create({
  text__info: {
    backgroundColor: 'green',
    paddingTop: 10,
    paddingBottom: 10,
  },
  separator: {
    backgroundColor: 'green',
    height: 30,
  },
});

export default class App extends Component {
  static propTypes = {};
  static defaultProps = {};

  state = {};

  render() {
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <StatusBar hidden />

        <ScrollView style={{ flex: 1 }}>
          <View>
            <Text style={styles.text__info}>
              current date: {this.state.date && this.state.date.toJSON()}
            </Text>
            <DatePicker mode="date" onDateChange={date => this.setState({ date })} />

            <View style={styles.separator} />
            <Text style={styles.text__info}>
              current time: {this.state.time && this.state.time.toJSON()}
            </Text>
            <DatePicker mode="time" onDateChange={time => this.setState({ time })} />

            <View style={styles.separator} />
            <Text style={styles.text__info}>
              current datetime: {this.state.datetime && this.state.datetime.toJSON()}
            </Text>
            <DatePicker
              mode="datetime"
              onDateChange={datetime => this.setState({ datetime })}
              labelUnit={{ year: 'Y', month: 'M', date: 'D' }}
            />

            <View style={styles.separator} />
            <Text style={styles.text__info}>
              current selectedValue: {this.state.value}
            </Text>
            <Picker
              style={{ flex: 1 }}
              selectedValue={1}
              pickerData={[1, 2, 3, 4, 5, 6]}
              onValueChange={value => this.setState({ value })}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
