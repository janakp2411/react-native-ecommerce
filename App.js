import * as React from 'react';

import 'react-native-gesture-handler';

import { Dimensions, View, Text } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import Login from './src/views/Login';
import Register from './src/views/Register';
import Home from './src/views/Home';
import Category from './src/views/Category';
import Detail from './src/views/Detail';
import Basket from './src/views/Basket';
import EditBasket from './src/views/EditBasket';
import Address from './src/views/Address';
import Shipping from './src/views/Shipping';
import Payment from './src/views/Payment';
import TermsAndConditions from './src/views/TermsAndConditions';
import CreditCard from './src/views/CreditCard';
import CustomDrawerComponent from './src/components/CustomDrawerComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Shipping" component={Shipping} />
          <Stack.Screen name="Basket" component={Basket} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          />{' '}
          <Stack.Screen name="CreditCard" component={CreditCard} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// const paymentStackNavigator = createStackNavigator(
//   {
//     Payment: {
//       screen: Payment,
//     },
//     CreditCard: {
//       screen: CreditCard,
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       header: null,
//     },
//   }
// );

// const CheckoutTabNavigator = createMaterialTopTabNavigator(
//   {
//     Address: {
//       screen: Address,
//     },
//     Shipping: {
//       screen: Shipping,
//     },
//     Payment: {
//       screen: paymentStackNavigator,
//     },
//   },
//   {
//     swipeEnabled: false,
//     tabBarOptions: {
//       activeTintColor: '#F08C4F',
//       style: {
//         backgroundColor: '#63CBA7',
//       },
//       indicatorStyle: {
//         backgroundColor: '#F08C4F',
//       },
//     },
//   }
// );

// const HomeStackNavigator = createStackNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: ({ navigation }) => {
//       return {
//         headerTitle: 'Home',
//         headerTitleStyle: {
//           color: 'white',
//         },
//         headerStyle: {
//           backgroundColor: '#5BBC9D',
//         },
//         headerLeft: (
//           <Icon
//             onPress={() => navigation.openDrawer()}
//             name="md-menu"
//             color="white"
//             size={30}
//             style={{
//               paddingLeft: 10,
//             }}
//           />
//         ),
//         headerRight: (
//           <Icon
//             onPress={() => navigation.openDrawer()}
//             name="ios-search"
//             color="white"
//             size={30}
//             style={{
//               paddingRight: 10,
//             }}
//           />
//         ),
//       };
//     },
//   },
//   Category: {
//     screen: Category,
//     navigationOptions: ({ navigation }) => {
//       return {
//         headerTitle: navigation.state.params.name,
//         headerTitleStyle: {
//           color: 'white',
//         },
//         headerStyle: {
//           backgroundColor: '#5BBC9D',
//         },
//         headerLeft: (
//           <Icon
//             onPress={() => navigation.openDrawer()}
//             name="md-menu"
//             color="white"
//             size={30}
//             style={{
//               paddingLeft: 10,
//             }}
//           />
//         ),
//         headerRight: (
//           <Icon
//             onPress={() => navigation.navigate('Basket')}
//             name="md-cart"
//             color="white"
//             size={30}
//             style={{
//               paddingRight: 10,
//             }}
//           />
//         ),
//       };
//     },
//   },
//   Basket: {
//     screen: Basket,
//     navigationOptions: ({ navigation }) => {
//       return {
//         headerTitle: 'Basket',
//         headerTitleStyle: {
//           color: 'white',
//         },
//         headerStyle: {
//           backgroundColor: '#5BBC9D',
//         },
//         headerLeft: (
//           <Icon
//             onPress={() => navigation.openDrawer()}
//             name="md-menu"
//             size={30}
//             style={{
//               paddingLeft: 10,
//             }}
//           />
//         ),
//       };
//     },
//   },
//   Checkout: {
//     screen: CheckoutTabNavigator,
//     navigationOptions: ({ navigation }) => {
//       return {
//         headerTitleStyle: {
//           color: 'white',
//         },
//         headerStyle: {
//           backgroundColor: '#5BBC9D',
//         },
//         headerTitle: 'Checkout',
//         headerLeft: (
//           <Icon
//             onPress={() => navigation.openDrawer()}
//             name="md-menu"
//             size={30}
//             style={{
//               paddingLeft: 10,
//             }}
//           />
//         ),
//       };
//     },
//   },
//   Detail: {
//     screen: Detail,
//     navigationOptions: ({ navigation }) => {
//       return {
//         headerTitleStyle: {
//           color: 'white',
//         },
//         headerStyle: {
//           backgroundColor: '#5BBC9D',
//         },
//         headerTitle: navigation.state.params.detailName,
//         headerLeft: null,
//         headerRight: (
//           <Icon
//             onPress={() => navigation.navigate('Category')}
//             name="ios-close"
//             color="white"
//             size={50}
//             style={{
//               paddingRight: 10,
//             }}
//           />
//         ),
//         gesturesEnabled: false,
//       };
//     },
//   },
//   TermsAndConditions: {
//     screen: TermsAndConditions,
//     navigationOptions: ({ navigation }) => {
//       return {
//         headerTitleStyle: {
//           color: 'white',
//         },
//         headerStyle: {
//           backgroundColor: '#5BBC9D',
//         },
//         headerTitle: 'Terms & Conditions',
//         headerLeft: null,
//         headerRight: (
//           <Icon
//             onPress={() => navigation.navigate('CreditCard')}
//             name="ios-close"
//             color="white"
//             size={50}
//             style={{
//               paddingRight: 10,
//             }}
//           />
//         ),
//         gesturesEnabled: false,
//       };
//     },
//   },
//   EditBasket: {
//     screen: EditBasket,
//     navigationOptions: ({ navigation }) => {
//       return {
//         headerTitleStyle: {
//           color: 'white',
//         },
//         headerStyle: {
//           backgroundColor: '#5BBC9D',
//         },
//         headerTitle: 'Edit Basket Item',
//         headerLeft: null,
//         headerRight: (
//           <Icon
//             onPress={() => navigation.navigate('Basket')}
//             name="ios-checkmark"
//             color="white"
//             size={50}
//             style={{
//               paddingRight: 10,
//             }}
//           />
//         ),
//         gesturesEnabled: false,
//       };
//     },
//   },
// });

// const HomeDrawNavigator = createDrawerNavigator(
//   {
//     Home: {
//       screen: HomeStackNavigator,
//     },
//   },
//   {
//     drawerWidth: Dimensions.get('window').width,
//     contentComponent: CustomDrawerComponent,
//   }
// );

// const AppSwitchNavigator = createStackNavigator({
//   Login: {
//     screen: Login,
//   },
//   Register: {
//     screen: Register,
//   },
//   // Home: {
//   //   screen: HomeDrawNavigator,
//   // },
// });
