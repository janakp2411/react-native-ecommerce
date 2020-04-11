import gql from 'graphql-tag';

export const RegisterQuery = gql`
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

export const LoginQuery = gql`
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
