import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import DefaultItems from '../data/defaultItems.json';
import ListItem from '../components/ListItem';
import colors from '../data/colors.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TQuantities = { [key: string]: number };

export default function ItemListScreen() {
  const [quantities, setQuantities] = React.useState<TQuantities>({});

  const handleQuantityChange = (quantity: number, title: string) => {
    setQuantities(prev => {
      return { ...prev, [title]: quantity };
    });
  };

  const handleSave = async () => {
    console.log('Saved', quantities);
    const jsonValue = JSON.stringify(quantities);
    await AsyncStorage.setItem('itemQuantities', jsonValue);
  };

  useEffect(() => {
    const initialQuantities: TQuantities = {};

    DefaultItems.forEach(item => {
      initialQuantities[item] = 0;
    });

    setQuantities(initialQuantities);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>আইটেমের নাম</Text>
        <Text style={styles.headerText}>জনপ্রতি পরিমাণ</Text>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={Object.keys(quantities)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item}
            quantity={quantities[item]}
            onQuantityChange={handleQuantityChange}
          />
        )}
      />
      <TouchableOpacity
        onPress={handleSave}
        activeOpacity={0.8}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>সেইভ করুন</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: 'center',
    margin: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
