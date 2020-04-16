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
