import {
  TextInput,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useEffect } from 'react';
import TQuantities, { TQuantity } from '../types/quantities';
import FoodCalculations from '../components/FoodCalculations';
import CalculationItemList from '../components/CalculationItemList';
import fetchItemList from '../utils/fetchItemList';

export default function CalculatorScreen() {
  const [peopleCount, setPeopleCount] = React.useState<string>('');
  const [selectedItems, setSelectedItems] = React.useState<TQuantities>([]);
  const [items, setItems] = React.useState<TQuantities>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleGetItems = async () => {
    setLoading(true);
    const itemList = await fetchItemList();
    // items which is not exists in selectedItems
    setItems(itemList);
    setLoading(false);
  };

  const handleRefresh = () => {
    setSelectedItems([]);
    handleGetItems();
  };

  const handleSelectItem = (item: TQuantity) => {
    const filteredItems = items.filter(
      _item => _item.itemName !== item.itemName,
    );
    setItems(filteredItems);

    const exists = selectedItems.find(
      selectedItem => selectedItem.itemName === item.itemName,
    );

    if (!exists) {
      setSelectedItems(prevItems => [...prevItems, item]);
    }
  };

  useEffect(() => {
    handleGetItems();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
      }
    >
      <TextInput
        style={styles.input}
        placeholder="লোকসংখ্যা"
        value={peopleCount}
        onChangeText={text => setPeopleCount(text)}
        keyboardType="numeric"
      />
      <FoodCalculations
        items={selectedItems}
        peopleCount={Number(peopleCount || '0')}
      />
      <CalculationItemList items={items} onSelectItem={handleSelectItem} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});
