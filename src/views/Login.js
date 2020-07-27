import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../components/Button';

class Login extends Component {
  onPressRegister = () => {
    this.props.navigation.navigate('Register');
  };

  // onPressLogin = () => {
  //   this.props.navigation.navigate('Login');
  // };
  onPressPickup = () => {
    this.props.navigation.navigate('Pickup');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* brandName part */}
          <ImageBackground
            source={require('../../assets/logo.jpg')}
            style={{
              flex: 0,
              width: 250,
              // height: hp('78%'),
              height: 140,
            }}
          ></ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}
        >
          <View
            style={{
              flex: 0,
              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: hp('5%'),
                paddingHorizontal: hp('2.5%'),
              }}
            >
              <Button
                onPress={this.onPressRegister}
                backgroundColor="#F08C4F"
                text="Delivery"
              />
              <Button
                onPress={this.onPressPickup}
                backgroundColor="#5BBC9D"
                text="Pickup"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
