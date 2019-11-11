import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fluid from 'react-native-fluid-transitions';

const size = 30;
const s = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  active: {
    transform: [{rotateZ: Math.PI}],
    backgroundColor: '#e45645',
  },
  inactive: {
    transform: [{rotateZ: 0}],
    backgroundColor: '#525251',
  },
});

interface ChevronProps {
  active: boolean;
}

export function Chevron({active}: ChevronProps) {
  return (
    <Fluid.View
      staticStyle={s.container}
      // @ts-ignore
      style={active ? s.active : s.inactive}>
      <Icon style={s.icon} name="ios-arrow-down" color="white" size={24} />
    </Fluid.View>
  );
}
