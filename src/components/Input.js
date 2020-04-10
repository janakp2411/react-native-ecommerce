import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Input = ({ label, placeholder, value, widthHalf, onChangeText, name, secureTextEntry = false }) => {
  return (
    <View
      style={{
        height: wp("20%"),
        marginBottom: 8
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          color: "gray"
        }}
      >
        {label}
      </Text>

      <TouchableOpacity
        style={[
          {
            flex: 1,
            paddingBottom: 5,
            justifyContent: "flex-end"
          },
          label == undefined
            ? {
                justifyContent: "flex-end"
              }
            : null
        ]}
      >
        <TextInput
          onChangeText={text => onChangeText && onChangeText(text, name)}
          secureTextEntry={secureTextEntry}
          style={[
            {
              height: wp("11%"),
              fontSize: 18,
              fontWeight: "500",
              paddingVertical: 10,
              paddingLeft: 20,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 4
            },
            widthHalf
              ? {
                  width: wp("43%")
                }
              : null
          ]}
          name={name}
          value={value}
          placeholder={placeholder}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Input;
