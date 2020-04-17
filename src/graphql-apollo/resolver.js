import { MUTATION_USER_REGISTER, MUTATION_USER_SIGNIN } from './auth';
import { QAUARY_GET_CART_DATA, MUTATION_ADD_CART_DATA } from './catagory';

export const resolvers = {
    Mutation: {

        addToCart: (_root, args, { cache }) => {
            const { getCartData = [] } = cache.readQuery({query: QAUARY_GET_CART_DATA});
            getCartData.push(args)
            cache.writeQuery({
              query: MUTATION_ADD_CART_DATA,
              data: { getCartData }
            }); 

            return getCartData
        },

    }
};