import gql from 'graphql-tag';

export const QAUARY_GET_CATAGOTY = gql`
    query getAllCategory {
        getAllCategory {
            name
            id
        }
    }
`;

export const MUTATION_GET_PRODUCTS_BY_CATAGORY = gql`
    query getProductsBycategory($category: String!) {
        getProductsBycategory(category: $category) {
            id
            name
            imgUrl
            price
            category
        }
    }
`;

export const QAUARY_GET_CART_DATA = gql`
    query getCartData {
        getCartData @client {
            id
            name
            imgUrl
            price
            category
        }
    }
`;

export const MUTATION_ADD_CART_DATA = gql`
  mutation addToCart($id: String!, $name: String!, $imgUrl: String!, $price: String!, $category: String!) {
    addToCart(id: $id, name: $name, imgUrl: $imgUrl, price: $price, category: $category) @client {
        id
        name
        imgUrl
        price
        category
    }
  }
`;

