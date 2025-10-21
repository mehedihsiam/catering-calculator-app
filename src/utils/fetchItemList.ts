import AsyncStorage from '@react-native-async-storage/async-storage';
import TQuantities from '../types/quantities';

const fetchItemList = async () => {
  const jsonValue = await AsyncStorage.getItem('itemQuantities');
  const returnedValue: TQuantities =
    jsonValue != null ? JSON.parse(jsonValue) : null;
  return returnedValue;
};

export default fetchItemList;
