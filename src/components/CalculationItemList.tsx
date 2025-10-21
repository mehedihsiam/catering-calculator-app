import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import TQuantities, { TQuantity } from '../types/quantities';
import colors from '../data/colors.json';

type TProps = {
  items: TQuantities;
  onSelectItem: (item: TQuantity) => void;
};

export default function CalculationItemList(props: TProps) {
  const { items, onSelectItem } = props;
  return (
    <View>
      {items?.map((item, index) => (
        <View key={index} style={styles.buttonContainer}>
          <Text onPress={() => onSelectItem?.(item)}>
            {item.itemName}: {item.quantity}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSelectItem?.(item)}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  button: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
