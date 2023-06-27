import { gql } from "@apollo/client";

export const GET_TABLE = gql`
  query table {
    table {
      id
    detail
    image
    numberofTables
    seats
    type
    }
  }
`;

export const DELETE_TABLE = gql`
  mutation DeleteTable($id: uuid!) {
    delete_table_by_pk(id: $id) {
      id
    }
  }
`;
export const GET_TABLE_BY_PK = gql`
  query GetTable($id: uuid!) {
    table_by_pk(id: $id) {
      id
      detail
      image
      numberofTables
      seats
      type
    }
  }
`;
export const UPDATE_TABLE_BY_PK = gql`
  query UpdateTable($id: uuid!) {
    update_table_by_pk(id: $id) {
      id
      detail
      image
      numberofTables
      seats
      type
    }
  }
`;