# react-native-wheel-picker

## Introduction
Cross platform Picker component based on React-native.

Since picker is originally supported by ios while Android only supports a ugly Spinner component. If you want to have the same user behaviour, you can use this.

The android component is based on https://github.com/AigeStudio/WheelPicker which runs super fast and smoothly. It also supports curved effect which make it exactly the same as the ios picker.

## How to use

Run command
```
npm i react-native-wheel-picker --save
```
Add in settings.gradle 
```
include ':react-native-wheel-picker'
project(':react-native-wheel-picker').projectDir = new File(settingsDir, '../node_modules/react-native-wheel-picker/android')
```
Modify MainActivity
```
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(), new ReactNativeWheelPickerPackage()
        );
    }
```

## Example code
```
var React = require('react-native')

var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} = React;

var Picker = require('react-native-wheel-picker')
var PickerItem = Picker.Item;


var AwesomeProject = React.createClass({
  
  getInitialState: function() {
    return {
      selectedItem : 2,
      itemList: ['刘备', '张飞', '关羽', '赵云', '黄忠', '马超', '魏延', '诸葛亮']
    }
  },

  onPikcerSelect: function(index) {
    this.setState({
      selectedItem: index,
    })
  },

  onAddItem: function() {
    var name = '司马懿'
    if (this.state.itemList.indexOf(name) == -1) {
      this.state.itemList.push(name)
    }
    this.setState({
      selectedItem: this.state.itemList.indexOf(name),
    })
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Picker style={{width: 150, height: 180}}
          selectedValue={this.state.selectedItem}
          itemStyle={{color:"white", fontSize:26}}
          onValueChange={(index) => this.onPikcerSelect(index)}>
            {this.state.itemList.map((value, i) => (
              <PickerItem label={value} value={i} key={"money"+value}/>
            ))}
        </Picker>
        <Text style={{margin: 20, color: '#ffffff'}}>
          你最喜欢的是：{this.state.itemList[this.state.selectedItem]}
        </Text>

        <Text style={{margin: 20, color: '#ffffff'}}
            onPress={this.onAddItem}>
          怎么没有司马懿？
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1962dd',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
```
