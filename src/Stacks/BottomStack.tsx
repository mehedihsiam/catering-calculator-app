import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import CalculatorScreen from '../screens/CalculatorScreen';
import ItemListScreen from '../screens/ItemListScreen';
import ScreenHeader from '../components/ScreenHeader';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import colors from '../data/colors.json';

const BottomNavigator = createBottomTabNavigator({
  screenOptions: {
    tabBarShowLabel: false,
    tabBarStyle: {
      height: 60,
    },
  },
  screens: {
    CalculatorScreen: {
      screen: CalculatorScreen,
      options: {
        headerTitle: () => <ScreenHeader>Calculator</ScreenHeader>,
        tabBarIcon: props => (
          <MaterialDesignIcons
            name="list-box"
            size={24}
            color={props.focused ? colors.primary : colors.text}
          />
        ),
      },
    },
    ItemListScreen: {
      screen: ItemListScreen,
      options: {
        tabBarIcon: props => (
          <MaterialDesignIcons
            name="calculator"
            size={24}
            color={props.focused ? colors.primary : colors.text}
          />
        ),
        headerTitle: () => <ScreenHeader>Item List</ScreenHeader>,
      },
    },
  },
});

export const BottomNavigation = createStaticNavigation(BottomNavigator);
