import * as React from 'react';

// import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';

import 'react-native-gesture-handler';
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
import LoginScreen from './src/views/LoginScreen';
import PickupScreen from './src/views/PickupScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createMaterialTopTabNavigator();

const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="CreditCard" component={CreditCard} />
    </Stack.Navigator>
  );
};

const CheckoutTabNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Address" component={Address} />
      <Tabs.Screen name="Shipping" component={Shipping} />
      <Tabs.Screen name="Payment" component={PaymentStackNavigator} />
    </Tabs.Navigator>
  );
};

const HomeStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Home}
        options={({ route }) => {
          return {
            headerTitle: route.name,
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#5BBC9D',
            },
            headerLeft: () => (
              <Icon
                onPress={() => navigation.openDrawer()}
                name="md-menu"
                color="white"
                size={30}
                style={{
                  paddingLeft: 10,
                }}
              />
            ),
            headerRight: () => (
              <Icon
                onPress={() => navigation.openDrawer()}
                name="ios-search"
                color="white"
                size={30}
                style={{
                  paddingRight: 10,
                }}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={({ route }) => {
          return {
            headerTitle: route.params ? route.params.name : route.name,
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#5BBC9D',
            },
            headerLeft: () => (
              <Icon
                onPress={() => navigation.openDrawer()}
                name="md-menu"
                color="white"
                size={30}
                style={{
                  paddingLeft: 10,
                }}
              />
            ),
            headerRight: () => (
              <Icon
                onPress={() => navigation.navigate('Basket')}
                name="md-cart"
                color="white"
                size={30}
                style={{
                  paddingRight: 10,
                }}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutTabNavigator}
        options={() => {
          return {
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#5BBC9D',
            },
            headerTitle: 'Checkout',
            headerLeft: () => (
              <Icon
                onPress={() => navigation.openDrawer()}
                name="md-menu"
                size={30}
                style={{
                  paddingLeft: 10,
                }}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Basket"
        component={Basket}
        options={({ route }) => {
          return {
            headerTitle: route.name,
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#5BBC9D',
            },
            headerLeft: () => (
              <Icon
                onPress={() => navigation.openDrawer()}
                name="md-menu"
                size={30}
                style={{
                  paddingLeft: 10,
                }}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={({ route }) => {
          return {
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#5BBC9D',
            },
            headerTitle: route.params.detailName,
            headerLeft: null,
            headerRight: () => (
              <Icon
                onPress={() => navigation.navigate('Category')}
                name="ios-close"
                color="white"
                size={50}
                style={{
                  paddingRight: 10,
                }}
              />
            ),
            gesturesEnabled: false,
          };
        }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={() => {
          return {
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#5BBC9D',
            },
            headerTitle: 'Terms & Conditions',
            headerLeft: null,
            headerRight: () => (
              <Icon
                onPress={() => navigation.navigate('CreditCard')}
                name="ios-close"
                color="white"
                size={50}
                style={{
                  paddingRight: 10,
                }}
              />
            ),
            gesturesEnabled: false,
          };
        }}
      />
      <Stack.Screen
        name="EditBasket"
        component={EditBasket}
        options={() => {
          return {
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#5BBC9D',
            },
            headerTitle: 'Edit Basket Item',
            headerLeft: null,
            headerRight: () => (
              <Icon
                onPress={() => navigation.navigate('Basket')}
                name="ios-checkmark"
                color="white"
                size={50}
                style={{
                  paddingRight: 10,
                }}
              />
            ),
            gesturesEnabled: false,
          };
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
    >
      <Drawer.Screen name="Main" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Pickup" component={PickupScreen} />
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
    </Drawer.Navigator>
  );
};

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <DrawerScreen />
      </NavigationContainer>
    );
  }
}

export default App;
