import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from '@expo/vector-icons/Ionicons';
import ItemList from '../components/ItemList';

const CATEGORY = [
  'Dresses',
  'Shoes',
  'Shorts',
  'Skirts',
  'Dresses',
  'Shoes',
  'Shorts',
  'Skirts',
];

const DRESSES = [
  {
    id: 1,
    imageUri: require('../../assets/dresses/dresses_1.jpg'),
    name: 'Helena',
    priceOne: 120,
    priceTwo: '$180',
  },
  {
    id: 2,
    imageUri: require('../../assets/dresses/dresses_2.jpg'),
    name: 'Marie-Anne short',
    priceOne: 180,
    priceTwo: null,
  },
  {
    id: 3,
    imageUri: require('../../assets/dresses/dresses_3.jpg'),
    name: 'Betruschka',
    priceOne: 80,
    priceTwo: null,
  },
  {
    id: 4,
    imageUri: require('../../assets/dresses/dresses_4.jpg'),
    name: 'Betruschka',
    priceOne: 80,
    priceTwo: null,
  },
  {
    id: 5,
    imageUri: require('../../assets/dresses/dresses_1.jpg'),
    name: 'Betruschka',
    priceOne: 80,
    priceTwo: null,
  },
  {
    id: 6,
    imageUri: require('../../assets/dresses/dresses_2.jpg'),
    name: 'Betruschka',
    priceOne: 80,
    priceTwo: null,
  },
];

const SHOES = [
  {
    id: 1,
    imageUri: require('../../assets/shoes/shoes_1.jpg'),
    name: 'Helena',
    priceOne: 120,
    priceTwo: '$180',
  },
  {
    id: 2,
    imageUri: require('../../assets/shoes/shoes_2.jpg'),
    name: 'Marie-Anne short',
    priceOne: 180,
    priceTwo: null,
  },
  {
    id: 3,
    imageUri: require('../../assets/shoes/shoes_3.jpg'),
    name: 'Betruschka',
    priceOne: 80,
    priceTwo: null,
  },
  {
    id: 4,
    imageUri: require('../../assets/shoes/shoes_4.jpg'),
    name: 'Betruschka',
    priceOne: 80,
    priceTwo: null,
  },
  {
    id: 5,
    imageUri: require('../../assets/shoes/shoes_1.jpg'),
    name: 'Betruschka',
    priceOne: 80,
    priceTwo: null,
  },
  {
    id: 6,
    imageUri: require('../../assets/shoes/shoes_2.jpg'),
    name: 'Betruschka',
    priceOne: 80,
    priceTwo: null,
  },
];

const Category = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const renderCategory = () => {
    return CATEGORY.map((item, i) => {
      return (
        <Text
          key={i}
          onPress={() => setCurrentIndex(i)}
          style={{
            fontSize: 18,
            color: currentIndex === i ? '#F08C4F' : 'white',
            paddingHorizontal: 10,
          }}
        >
          {item}
        </Text>
      );
    });
  };

  const renderItemList_Dress = () => {
    return DRESSES.map((item, i) => {
      return (
        <ItemList
          onPress={() =>
            props.navigation.navigate('Detail', {
              detailName: item.name,
              detailImageUri: item.imageUri,
              detailPriceOne: item.priceOne,
              detailPriceTwo: item.priceTwo ? item.priceTwo : null,
            })
          }
          key={item.id}
          imageUri={item.imageUri}
          name={item.name}
          priceOne={item.priceOne}
          priceTwo={item.priceTwo ? item.priceTwo : null}
        />
      );
    });
  };

  const renderItemList_Shoes = () => {
    return SHOES.map((item, i) => {
      return (
        <ItemList
          onPress={() =>
            props.navigation.navigate('Detail', {
              detailName: item.name,
              detailImageUri: item.imageUri,
              detailPriceOne: item.priceOne,
              detailPriceTwo: item.priceTwo ? item.priceTwo : null,
            })
          }
          key={item.id}
          imageUri={item.imageUri}
          name={item.name}
          priceOne={item.priceOne}
          priceTwo={item.priceTwo ? item.priceTwo : null}
        />
      );
    });
  };

  const renderItemList = () => {
    if (currentIndex === 0) {
      return renderItemList_Dress();
    } else if (currentIndex === 1) {
      return renderItemList_Shoes();
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* headerScrollHorizontal */}
      <View
        style={{
          height: hp('8%'),
          backgroundColor: '#63CBA7',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flex: 4,
          }}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              {renderCategory()}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            onPress={() => {
              scroll.scrollTo({ x: wp('80%') });
            }}
            name="ios-arrow-forward"
            size={20}
            color="white"
          />
        </View>
      </View>
      {/* headerScrollHorizontal */}

      {/* itemLists ScrollVertical */}
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {/* ItemList */}
          {renderItemList()}
        </ScrollView>
      </View>
      {/* itemLists ScrollVertical */}
    </View>
  );
};

export default Category;
