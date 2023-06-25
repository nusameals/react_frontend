import { gql } from "@apollo/client";

export const GET_PROFILE_BY_PK = gql`
  query MyQuery($id: String!) {
    admin_by_pk(id: $id) {
      avatar
      username
      gender
      phone
      id
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation MyMutation(
    $pk_columns: admin_pk_columns_input = {id: ""},
    $_set: admin_set_input!
  ) {
    update_admin_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;
