import gql from 'graphql-tag';

export const RegisterQuery = gql`
  mutation signUp ($username: String!, $email: String!, $password: String!) {
    signUp (username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;