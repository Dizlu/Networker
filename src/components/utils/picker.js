import React from 'react';
import {Picker} from 'react-native';

const CustomPicker = ({selectedValue, onValueChange, options}) => (
  <Picker
    selectedValue={selectedValue}
    onValueChange={onValueChange}
  >
    {options.map(option => <Picker.Item label={option.name} value={option.value} />)}
  </Picker>
)

export default CustomPicker;
