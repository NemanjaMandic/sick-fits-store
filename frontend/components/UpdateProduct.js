import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ){
    updateProduct(
      id: $id,
      data: {
        id: $id
        name: $name
        description: $description
        price: $price
      }
    ) {
        id
        name
        description
        price
    }
  }
`


export default function UpdateProduct({ id }) {

  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  console.log('laaaaa', data);
  return <div>Apdejt! {id} </div>;
}
