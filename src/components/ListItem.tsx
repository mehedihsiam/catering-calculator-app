import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

type TProps = {
  title: string;
  quantity: number | undefined;
  onQuantityChange: (quantity: number, title: string) => void;
};

export default function ListItem(props: TProps) {
  const [quantity, setQuantity] = React.useState<string>('');

  const handleBlur = () => {
    const qty = parseInt(quantity, 10);
    if (!isNaN(qty)) {
      props.onQuantityChange(qty, props.title);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => setQuantity(text)}
          value={quantity}
          onBlur={handleBlur}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text>গ্রাম</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: 100,
    textAlign: 'right',
  },
});
