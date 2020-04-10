import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Platform,
  Animated,
  Keyboard
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from 'react-native-loading-spinner-overlay';
import { RegisterQuery } from '../graphql-apollo/auth';
import { graphql } from 'react-apollo';

class Register extends Component {

  state = {
    loading: false
  }

  onPressCompleteRegister = () => {
    this.setState({loading: true})
    this.props.mutate({ variables: {...this.state }})
              .then( res => {
                if(res.data && res.data.signUp.token){
                  this.setState({
                    loading: false
                  })
                  this.props.navigation.navigate("Home");
                }
              })
  };

  onChangeText = (value, name) => {
    this.setState({[name]: value})
  }

  UNSAFE_componentWillMount() {
    this.formPosition = new Animated.Value(0);
    this.animatedTitleTopMargin = new Animated.Value(20);
    this.animatedTitleSize = new Animated.Value(70);

    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );

    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    );
  }

  UNSAFE_componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  keyboardWillShow = event => {
    if (Platform.OS == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(this.formPosition, {
        duration: duration,
        toValue: -hp("5.25%")
      }),
      Animated.timing(this.animatedTitleTopMargin, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.animatedTitleSize, {
        duration: duration,
        toValue: 50
      })
    ]).start();
  };

  keyboardWillHide = event => {
    if (Platform.OS == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(this.formPosition, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.animatedTitleTopMargin, {
        duration: duration,
        toValue: 20
      }),
      Animated.timing(this.animatedTitleSize, {
        duration: duration,
        toValue: 70
      })
    ]).start();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F6F6F6"
        }}
      >
       <Spinner visible={this.state.loading}/>
        <Animated.View
          style={{
            height: hp("18%"),
            justifyContent: "center",
            paddingHorizontal: hp("2.5%"),
            marginTop: this.animatedTitleTopMargin
            // marginTop: Platform.OS == "android" ? hp("3.75%") : null
          }}
        >
          <Animated.Text
            style={{
              fontSize: this.animatedTitleSize,
              fontWeight: "400",
              // opacity: this.animatedTitleOpacity
              opacity: 1
            }}
          >
            Signup.
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            paddingHorizontal: hp("2.5%"),
            marginBottom: Platform.OS == "android" ? hp("10%") : null,
            marginTop: this.formPosition
          }}
        >
          {/* form */}
          <Input onChangeText={this.onChangeText} value={this.state.username} name="username" label="Your name" placeholder="Enter your Full name" />
          <Input onChangeText={this.onChangeText} value={this.state.email} name="email" label="Your email address" placeholder="Email address" />
          <Input secureTextEntry={true} onChangeText={this.onChangeText} value={this.state.password} name="password" label="Your password" placeholder="Password" />
          <Text
            style={{
              fontWeight: "500",
              color: "gray"
            }}
          >
            Or easily{" "}
            <Text
              style={{
                color: "#F08C4F"
              }}
            >
              connect with facebook
            </Text>
          </Text>
        </Animated.View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: hp("2.5%")
          }}
        >
          <ImageBackground
            source={require("../../assets/login_bg_1.jpg")}
            style={{
              flex: 1,
              width: null,
              height: hp("72%")
              // height: Platform.OS == "android" ? 470 : 440
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: hp("5%")
              }}
            >
              <Button
                fullWidth
                onPress={this.onPressCompleteRegister}
                backgroundColor="#F08C4F"
                text="Complete registration"
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default graphql(RegisterQuery)(Register);