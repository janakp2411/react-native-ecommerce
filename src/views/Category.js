import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from '@expo/vector-icons/Ionicons';
import ItemList from '../components/ItemList';
import { QAUARY_GET_CATAGOTY, MUTATION_GET_PRODUCTS_BY_CATAGORY } from '../graphql-apollo/catagory';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import Spinner from 'react-native-loading-spinner-overlay';

const Category = (props) => {

  const renderItemList = (productData) => {
    if(!productData) return null;
    return productData.getProductsBycategory && productData.getProductsBycategory.map((item, i) => {
      return (
        <ItemList
          onPress={() =>
            props.navigation.navigate('Detail', {
              detailName: item.name,
              detailImageUri: item.imgUrl,
              detailPriceOne: item.price,
              detailPriceTwo: item.priceTwo ? item.priceTwo : null,
              id: item.id,
              category: item.category || 'category'
            })
          }
          key={item.id}
          isExternal={true}
          imageUri={item.imgUrl}
          name={item.name}
          priceOne={item.price}
          priceTwo={item.priceTwo ? item.priceTwo : null}
        />
      );
    });
  };

  const [getProductsByCatagoryFn, {data: productData, loading: productLoader}] = useLazyQuery(MUTATION_GET_PRODUCTS_BY_CATAGORY);
  const onCategoryLoad = ({getAllCategory}) => {
   getProductsByCatagoryFn({variables: {category: getAllCategory[0].name}})
  }
  const { data: newData, loading } = useQuery(QAUARY_GET_CATAGOTY, { onCompleted: onCategoryLoad});
  const [currentIndex, setCurrentIndex] = useState(0);
  const renderCategory = () => {
    return newData && newData.getAllCategory.map((item, i) => {
      return (
        <Text
          key={i}
          onPress={() => {
            setCurrentIndex(i)
            getProductsByCatagoryFn({variables:{category : item.name}})} 
          }
          style={{
            fontSize: 18,
            color: currentIndex === i ? '#F08C4F' : 'white',
            paddingHorizontal: 10,
          }}
        >
          {item.name}
        </Text>
      );
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
    <Spinner visible={loading || productLoader}/>
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

          {renderItemList(productData)}
          {/* ItemList */}
          {/* {
            productData && productData.getProductsByCatagory ?
         <RenderItemList data={productData.getProductsByCatagory} navigation={props.navigation}/> : <View><Text>Janak</Text></View>
        } */}
        </ScrollView>
      </View>
      {/* itemLists ScrollVertical */}
    </View>
  );
};

export default Category;
