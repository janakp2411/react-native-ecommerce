import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Platform,
  Animated,
  Keyboard,
} from 'react-native';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../components/Input';
import Button from '../components/Button';
import Spinner from 'react-native-loading-spinner-overlay';
import { MUTATION_USER_SIGNIN } from '../graphql-apollo/auth';

const PickupScreen = (props) => {
  const [formData, updateFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onCompletedLogin = () => {
    props.navigation.navigate('Home');
  };

  // const [ LoginFun, { loading } ] = useMutation(MUTATION_USER_SIGNIN,
  //   { variables: { email, password }, onCompleted: onCompletedLogin }
  // );

  const onChangeText = (value, name) => {
    updateFormData({ ...formData, [name]: value });
  };

  let formPosition = new Animated.Value(0);
  let animatedTitleTopMargin = new Animated.Value(20);
  let animatedTitleSize = new Animated.Value(70);
  let keyboardWillShowSub = null;
  let keyboardWillHideSub = null;
  let keyboardDidShowSub = null;
  let keyboardDidHideSub = null;

  const keyboardWillHide = (event) => {
    if (Platform.OS == 'android') {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(formPosition, {
        duration: duration,
        toValue: 0,
      }),
      Animated.timing(animatedTitleTopMargin, {
        duration: duration,
        toValue: 20,
      }),
      Animated.timing(animatedTitleSize, {
        duration: duration,
        toValue: 70,
      }),
    ]).start();
  };

  useEffect(() => {
    // formPosition = new Animated.Value(0);
    // animatedTitleTopMargin = new Animated.Value(20);
    // animatedTitleSize = new Animated.Value(70);

    keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShow
    );
    keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHide
    );

    keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      keyboardWillShow
    );
    keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      keyboardWillHide
    );
    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, []);

  const keyboardWillShow = (event) => {
    if (Platform.OS == 'android') {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(formPosition, {
        duration: duration,
        toValue: -hp('5.25%'),
      }),
      Animated.timing(animatedTitleTopMargin, {
        duration: duration,
        toValue: 0,
      }),
      Animated.timing(animatedTitleSize, {
        duration: duration,
        toValue: 50,
      }),
    ]).start();
  };

  return (
    <View
      style={{
        paddingTop: hp('10%'),
        margin: 10,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Pickup Locations
      </Text>
      <View
        style={{
          flex: 0,
          paddingHorizontal: hp('2.5%'),
          //paddingBottom: hp('5%'),
          //paddingTop: hp('10%'),
          margin: 10,
          //flexDirection: 'row',
        }}
      >
        <View
          style={{
            paddingTop: hp('10%'),
          }}
        >
          <Button
            fullWidth
            onPress={onCompletedLogin}
            backgroundColor="#F08C4F"
            text="Rutherford"
          />
        </View>
        <View
          style={{
            paddingTop: hp('5%'),
          }}
        >
          <Button
            fullWidth
            onPress={onCompletedLogin}
            backgroundColor="#F08C4F"
            text="Mahwah"
          />
        </View>
        <View
          style={{
            paddingTop: hp('5%'),
          }}
        >
          <Button
            fullWidth
            onPress={onCompletedLogin}
            backgroundColor="#F08C4F"
            text="Iselin"
          />
        </View>
        <View
          style={{
            paddingTop: hp('5%'),
          }}
        >
          <Button
            fullWidth
            onPress={onCompletedLogin}
            backgroundColor="#F08C4F"
            text="Lodi"
          />
        </View>
      </View>
    </View>
  );
};

export default PickupScreen;
