import { MUTATION_USER_REGISTER, MUTATION_USER_SIGNIN } from './auth';

export const resolvers = {
    Mutation: {
        signUp : (_root, _args, { cache }) => {
            console.warn('_args..........................')
            // const { cartHidden } = cache.readQuery({
            //   query: MUTATION_USER_SIGNIN
            // });

            return { name: '0000000000000000000000000000000000000000000000000000000' }

            // cache.writeQuery({
            //   query: GET_CART_HIDDEN,
            //   data: { cartHidden: !cartHidden }
            // });

            // return !cartHidden;
        }
    }
};