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

const LoginScreen = (props) => {
  const [formData, updateFormData] = useState({email: '', password: ''});
  const { email, password } = formData;

  
  const onCompletedLogin = () => {
      props.navigation.navigate('Home');
  }

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
        flex: 1,
        backgroundColor: '#F6F6F6',
      }}
    >
      {/* <Spinner visible={loading} /> */}
      <Animated.View
        style={{
          height: hp('18%'),
          justifyContent: 'center',
          paddingHorizontal: hp('2.5%'),
          marginTop: animatedTitleTopMargin,
          // marginTop: Platform.OS == "android" ? hp("3.75%") : null
        }}
      >
        <Animated.Text
          style={{
            fontSize: animatedTitleSize,
            fontWeight: '400',
            // opacity: animatedTitleOpacity
            opacity: 1,
          }}
        >
          Login
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={{
          flex: 1,
          paddingHorizontal: hp('2.5%'),
          marginBottom: Platform.OS == 'android' ? hp('10%') : null,
          marginTop: formPosition,
        }}
      >
        {/* form */}

        <Input
          onChangeText={onChangeText}
          value={email}
          name="email"
          label="Your email address"
          placeholder="Email address"
        />
        <Input
          secureTextEntry={true}
          onChangeText={onChangeText}
          value={password}
          name="password"
          label="Your password"
          placeholder="Password"
        />
        <Text
          style={{
            fontWeight: '500',
            color: 'gray',
          }}
        >
          Or easily{' '}
          <Text
            style={{
              color: '#F08C4F',
            }}
          >
            connect with facebook
          </Text>
        </Text>
      </Animated.View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: hp('2.5%'),
        }}
      >
        <ImageBackground
          source={require('../../assets/login_bg_1.jpg')}
          style={{
            flex: 1,
            width: null,
            height: hp('72%'),
            // height: Platform.OS == "android" ? 470 : 440
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: hp('5%'),
            }}
          >
            <Button
              fullWidth
              onPress={onCompletedLogin}
              backgroundColor="#F08C4F"
              text="Login"
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default LoginScreen;
