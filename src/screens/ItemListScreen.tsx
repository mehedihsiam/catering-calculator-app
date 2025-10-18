import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultItems from '../data/defaultItems.json';
import ListItem from '../components/ListItem';
import colors from '../data/colors.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TQuantities from '../types/quantities';
import fetchItemList from '../utils/fetchItemList';

export default function ItemListScreen() {
  const [quantities, setQuantities] = useState<TQuantities>({});
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemQuantity, setNewItemQuantity] = useState<number | undefined>(
    undefined,
  );
  const [visibleNewItemInput, setVisibleNewItemInput] =
    useState<boolean>(false);

  const handleQuantityChange = (quantity: number, title: string) => {
    setQuantities(prev => {
      return { ...prev, [title]: quantity };
    });
  };

  const handleAddItem = async () => {
    if (!visibleNewItemInput) {
      setVisibleNewItemInput(true);
    } else {
      if (newItemName.trim() !== '' && newItemQuantity !== undefined) {
        const values = { ...quantities, [newItemName]: newItemQuantity };
        setQuantities(values);
        const jsonValue = JSON.stringify(values);
        await AsyncStorage.setItem('itemQuantities', jsonValue);
        setNewItemName('');
        setNewItemQuantity(undefined);
        setVisibleNewItemInput(false);
      }
    }
  };

  const handleSave = async () => {
    const jsonValue = JSON.stringify(quantities);
    await AsyncStorage.setItem('itemQuantities', jsonValue);
  };

  const handleLoadItems = async () => {
    const jsonValue = await fetchItemList();
    if (jsonValue) {
      setQuantities(jsonValue);
    } else {
      const initialQuantities: TQuantities = {};
      DefaultItems.forEach(item => {
        initialQuantities[item] = 0;
      });

      setQuantities(initialQuantities);
    }
  };

  useEffect(() => {
    handleLoadItems();
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
        ListFooterComponent={
          <View style={styles.footerContainer}>
            {visibleNewItemInput && (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="নতুন আইটেমের নাম"
                  value={newItemName}
                  onChangeText={text => setNewItemName(text)}
                  style={styles.input}
                />
                <TextInput
                  placeholder="পরিমাণ"
                  value={newItemQuantity?.toString()}
                  onChangeText={text => setNewItemQuantity(Number(text))}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
            )}
            <TouchableOpacity onPress={handleAddItem} activeOpacity={0.7}>
              <Text style={styles.footerText}>
                +{' '}
                {visibleNewItemInput
                  ? 'আইটেম সেইভ করুন'
                  : 'নতুন আইটেম যোগ করুন'}
              </Text>
            </TouchableOpacity>
          </View>
        }
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
  footerContainer: {
    alignItems: 'flex-end',
    padding: 10,
  },
  footerText: {
    color: colors.primary,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    flex: 1,
  },
});
