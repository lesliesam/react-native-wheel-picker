declare module 'react-native-wheel-picker' {
  import React from 'react'
  import { ViewStyle, StyleProp } from 'react-native'

  export interface PickerProps {
    style?: StyleProp<ViewStyle>
    itemStyle?: any
    selectedValue?: string | number,
    onValueChange?: (index: number) => void
  }

  export interface PickerItemProps {
    label: string | number,
    value: string | number,
    key: string | number,
  }

  class PickerItem extends React.Component<PickerItemProps> {}

  class Picker extends React.Component<PickerProps> {
    static Item: typeof PickerItem
  }

  export default Picker
}
