import { View, Text } from 'react-native';
import React from 'react';
import TQuantities from '../types/quantities';
import gramToKG from '../utils/gramToKG';

type TProps = {
  items: TQuantities;
  peopleCount: number;
};

export default function FoodCalculations(props: TProps) {
  return (
    <View>
      {props.items.map((item, index) => (
        <Text key={index}>
          {item.itemName}: {item.quantity} x {props.peopleCount} ={' '}
          {gramToKG(item.quantity * props.peopleCount)}
        </Text>
      ))}
    </View>
  );
}
