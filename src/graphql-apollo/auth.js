import gql from 'graphql-tag';

export const MUTATION_USER_REGISTER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const MUTATION_USER_SIGNIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(login: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;
