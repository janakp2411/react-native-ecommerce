import React, { Component, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const HomeCategory = (props) => {
  const { imageUri, titleFirst, titleSecond, subTitle } = props;
  const height = Image.resolveAssetSource(imageUri).height;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        props.navigation.navigate('Category', {
          name: titleFirst,
        })
      }
      style={{
        height: height,
      }}
    >
      <ImageBackground
        source={imageUri}
        style={{
          flex: 1,
          width: width,
          height: height,
          alignSelf: 'stretch',
          resizeMode: 'contain',
          paddingLeft: wp('10%'),
        }}
      >
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-end',
            paddingBottom: hp('5%'),
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: '500',
            }}
          >
            {titleFirst}
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '500',
            }}
          >
            {titleSecond}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: 'gray',
              fontWeight: '500',
            }}
          >
            {subTitle}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default HomeCategory;
