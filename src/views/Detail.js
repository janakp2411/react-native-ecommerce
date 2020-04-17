import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback
} from "react-native";
import { useMutation, useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Icon from "@expo/vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import ChoosingSizeBox from "../components/ChoosingSizeBox";
import { MUTATION_ADD_CART_DATA } from '../graphql-apollo/catagory';

const { width } = Dimensions.get("window");

const Detail = props => {

  const state = {
    defaultBox: null,
    size: "small",
    color: "black",
    sizeBoxOpen: false,
    colorBoxOpen: false,
    colorIconName: "ios-arrow-down",
    iconName: "ios-arrow-down",
    sizeBorderColor: "gray",
    colorBorderColor: "gray"
  };

  
  const onPurchase = (getCartData) => {

    props.navigation.navigate("Basket", {...props.route.params})
  }

  const [detailsData, setDetailData] = useState(state)
  const [addToCart] = useMutation(MUTATION_ADD_CART_DATA, {
    onCompleted: onPurchase
  });

  const sizeBox = new Animated.Value(hp("65%"));
  const colorBox = new Animated.Value(hp("65%"));

  const onChooseItem = item => {
    setDetailData({ ...detailsData, size: item })
  };

  const onChooseColor = item => {
    setDetailData({ ...detailsData, color: item })
  };

  const openColorBox = () => {
    setDetailData({
      ...detailsData,
      sizeBoxOpen: false,
      colorBoxOpen: !detailsData.colorBoxOpen,
      colorIconName:
        detailsData.colorIconName === "ios-arrow-down" ? "ios-arrow-up" : "ios-arrow-down",
      iconName: "ios-arrow-down",
      colorBorderColor: detailsData.colorBorderColor === "gray" ? "black" : "gray",
      sizeBorderColor: "gray",
      defaultBox: "colorBox"
    })
  };

  useEffect(() => {
    if (detailsData.sizeBoxOpen) {
      Animated.timing(sizeBox, {
        toValue: hp("30%"),
        duration: 400
      }).start();
    } else {
      Animated.timing(sizeBox, {
        toValue: hp("65%"),
        duration: 400
      }).start();
    }
    if (detailsData.colorBoxOpen) {
      Animated.timing(colorBox, {
        toValue: hp("30%"),
        duration: 400
      }).start();
    } else {
      Animated.timing(colorBox, {
        toValue: hp("65%"),
        duration: 400
      }).start();
    }
  }, [detailsData.sizeBoxOpen])

  useEffect(() => {
    if (detailsData.colorBoxOpen) {
      Animated.timing(colorBox, {
        toValue: hp("30%"),
        duration: 400
      }).start();
    } else {
      Animated.timing(colorBox, {
        toValue: hp("65%"),
        duration: 400
      }).start();
    }
    if (detailsData.sizeBoxOpen) {
      Animated.timing(sizeBox, {
        toValue: hp("30%"),
        duration: 400
      }).start();
    } else {
      Animated.timing(sizeBox, {
        toValue: hp("65%"),
        duration: 400
      }).start();
    }
  }, [detailsData.colorBoxOpen])

  const openSizeBox = () => {
    setDetailData({
      ...detailsData,
      colorBoxOpen: false,
      sizeBoxOpen: !detailsData.sizeBoxOpen,
      iconName: detailsData.iconName === "ios-arrow-down"
        ? "ios-arrow-up"
        : "ios-arrow-down",
      colorIconName: "ios-arrow-down",
      sizeBorderColor: detailsData.sizeBorderColor === "gray" ? "black" : "gray",
      colorBorderColor: "gray",
      defaultBox: "sizeBox"
    })
  }

  const animatedSizeBoxOpacity = sizeBox.interpolate({
    inputRange: [hp("30%"), hp("65%")],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  const animatedColorBoxOpacity = colorBox.interpolate({
    inputRange: [hp("30%"), hp("65%")],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  const {
    detailName,
    detailImageUri,
    detailPriceOne,
    detailPriceTwo,
    category,
    id
  } = props.route.params;

  const url = detailImageUri && detailImageUri.startsWith("http") ? { uri: detailImageUri } : detailImageUri
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScrollView>
        {/* image */}
        <View
          style={{
            width: width,
            height: hp("65%")
          }}
        >
          <Image
            source={url}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "stretch"
            }}
          />
        </View>
        {/* image */}

        {/* ChoosingSizeBox */}
        {detailsData.defaultBox === "colorBox" ? (
          <ChoosingSizeBox
            label="Choosing a color"
            color={true}
            top={colorBox}
            opacity={animatedColorBoxOpacity}
            firstItem="black"
            secondItem="yellow"
            thirdItem="blue"
            onPressFirst={() => onChooseColor("black")}
            onPressSecond={() => onChooseColor("yellow")}
            onPressThird={() => onChooseColor("blue")}
          />
        ) : (
            <ChoosingSizeBox
              label="Choosing a size"
              top={sizeBox}
              opacity={animatedSizeBoxOpacity}
              firstItem="small"
              secondItem="medium"
              thirdItem="large"
              onPressFirst={() => onChooseItem("small")}
              onPressSecond={() => onChooseItem("medium")}
              onPressThird={() => onChooseItem("large")}
            />
          )}
        {/* ChoosingSizeBox */}

        {/* priceBox */}
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            zIndex: 200
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginVertical: 25
            }}
          >
            {/* up bar */}
            {/* left */}
            <TouchableWithoutFeedback onPress={() => openColorBox()}>
              <View
                style={{
                  width: wp("45%"),
                  flexDirection: "row",
                  borderWidth: 0.8,
                  borderColor: detailsData.colorBorderColor,
                  borderRadius: 2,
                  padding: 5
                }}
              >
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      backgroundColor: detailsData.color,
                      width: wp("4.5%"),
                      height: wp("4.5%"),
                      marginRight: 15
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: "gray",
                      textTransform: "capitalize"
                    }}
                  >
                    {detailsData.color}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    paddingRight: 15
                  }}
                >
                  <Icon
                    name={detailsData.colorIconName}
                    size={20}
                    color="gray"
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
            {/* left */}

            {/* right */}
            <TouchableWithoutFeedback onPress={() => openSizeBox()}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp("45%"),
                  borderWidth: 0.8,
                  borderColor: detailsData.sizeBorderColor,
                  borderRadius: 2,
                  padding: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "gray",
                    marginLeft: 15,
                    textTransform: "capitalize"
                  }}
                >
                  {detailsData.size}
                </Text>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    paddingRight: 15
                  }}
                >
                  <Icon name={detailsData.iconName} size={20} color="gray" />
                </View>
              </View>
            </TouchableWithoutFeedback>
            {/* right */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              paddingBottom: 25
            }}
          >
            {/* down bar */}
            {/* left */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: 15
                }}
              >
                $ {detailPriceOne}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "gray",
                  textDecorationLine: "line-through"
                }}
              >
                {detailPriceTwo}
              </Text>
            </View>
            {/* left */}
            {/* right */}
            <View
              style={{
                width: wp("45%"),
                backgroundColor: "#F08C4F",
                borderRadius: 2,
                padding: 5
              }}
            >
              <TouchableOpacity
                onPress={() => addToCart({variables: {
                  name: detailName,
                  imgUrl :detailImageUri,
                  price: detailPriceOne,
                  id: id,
                  category: category
                }})}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    paddingLeft: 15
                  }}
                >
                  <Icon name="md-cart" size={20} color="white" />
                </View>
                <View
                  style={{
                    flex: 2
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white"
                    }}
                  >
                    Purchase
                    </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* right */}
          </View>
        </View>
        {/* priceBox */}

        {/* DescriptionBox */}
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: "gray"
          }}
        >
          {/* upper */}
          <View
            style={{
              flex: 1,
              marginHorizontal: 15,
              marginVertical: 25
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#5BBC9D"
              }}
            >
              Description
              </Text>
            <Text
              style={{
                fontSize: 13,
                lineHeight: 20
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type.
              </Text>
          </View>
          {/* upper */}
          {/* lower */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              paddingBottom: 25
            }}
          >
            {/* left */}
            <View
              style={{
                flex: 1
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#5BBC9D",
                  marginBottom: 5
                }}
              >
                Available Colors
                </Text>
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    backgroundColor: "black",
                    width: wp("4.5%"),
                    height: wp("4.5%"),
                    marginRight: 15
                  }}
                />
                <View
                  style={{
                    backgroundColor: "yellow",
                    width: wp("4.5%"),
                    height: wp("4.5%"),
                    marginRight: 15
                  }}
                />
                <View
                  style={{
                    backgroundColor: "blue",
                    width: wp("4.5%"),
                    height: wp("4.5%")
                  }}
                />
              </View>
            </View>
            {/* left */}
            {/* right */}
            <View
              style={{
                flex: 1
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#5BBC9D",
                  marginBottom: 5
                }}
              >
                Available Sizes
                </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold"
                }}
              >
                S, M, L, XL
                </Text>
            </View>
            {/* right */}
          </View>
          {/* lower */}
        </View>
        {/* DescriptionBox */}

        {/* reviews */}
        <View
          style={{
            paddingLeft: 25,
            paddingVertical: 5,
            backgroundColor: "#EFF0F1"
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "gray"
            }}
          >
            33 Reviews
            </Text>
        </View>
        {/* reviews */}

        {/* reviewBox */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 25
          }}
        >
          {/* left */}
          <View
            style={{
              flex: 1
            }}
          >
            {/* profile */}
            <View
              style={{
                width: wp("10%"),
                height: wp("10%"),
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: wp("5%"),
                overflow: "hidden"
              }}
            >
              <Image
                source={require("../../assets/reviewer.jpg")}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain"
                }}
              />
            </View>
          </View>
          {/* left */}
          {/* right */}
          <View
            style={{
              flex: 4
            }}
          >
            {/* right_up */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10
              }}
            >
              {/* name and star */}
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    paddingBottom: 10
                  }}
                >
                  Jennifer Kristyla says
                  </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "gray"
                  }}
                >
                  2 Hours ago
                  </Text>
              </View>
              <View>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={4}
                  starSize={16}
                  fullStarColor="yellow"
                />
              </View>
            </View>
            {/* right_up */}
            {/* right_down */}
            <Text
              style={{
                color: "gray",
                fontSize: 13,
                lineHeight: 18
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type
              </Text>
            {/* right_down */}
          </View>
          {/* right */}
        </View>
        {/* reviewBox */}
      </ScrollView>
    </View>
  );
}
// }

export default Detail;
