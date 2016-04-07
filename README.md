# react-native-wheel-picker

## Introduction
Cross platform Picker component based on React-native.

Since picker is originally supported by ios while Android only supports a ugly Spinner component. If you want to have the same user behaviour, you can use this.

The android component is based on https://github.com/AigeStudio/WheelPicker which runs super fast and smoothly. It also supports curved effect which make it exactly the same as the ios picker.

## How to use

npm i react-native-wheel-picker
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
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Picker = require('react-native-wheel-picker')
var PickerItem = Picker.Item;

class AwesomeProject extends Component {
  
  onPikcerSelect(value) {
    console.log(value)
  }

  render() {
    var itemArray = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
    var initialItemValue = 30

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Picker style={{width: 150, height: 180}}
          selectedValue={initialItemValue}
          itemStyle={{color:"white", fontSize:26}}
          onValueChange={(value) => this.onPikcerSelect(value)}>
            {itemArray.map((value) => (
              <PickerItem label={value} value={parseInt(value)} key={"money"+value}/>
            ))}
        </Picker>
      </View>
    );
  }
}

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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
```
