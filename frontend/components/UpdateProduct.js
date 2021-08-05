import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import useForm from '../lib/useForm';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  if (!loading && !error) {
  }

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  // useEffect(() => {
  //   if (inputs) {
  //     setUpdateInputs(inputs);
  //   }
  // }, [inputs]);

  const [
    updateProduct,
    { data: productData, loading: productLoading, error: productError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // const { name, price, description } = data?.Product;

  console.log('laaaaa', inputs);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const res = await updateProduct({
      variables: {
        id: inputs.id,
        name: inputs.name,
        price: inputs.price,
        description: inputs.description,
      },
    }).catch((err) => console.error(err));
    console.log('rez', res);
  };
  if (loading) return <h4>Loading...</h4>;
  return (
    <Form onSubmit={handleUpdateProduct}>
      <ErrorMessage error={error || productError} />
      <fieldset disabled={productLoading} aria-busy={productLoading}>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            value={inputs?.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            value={inputs?.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            id='description'
            name='description'
            value={inputs?.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type='submit'>+ Edit product</button>
      </fieldset>
    </Form>
  );
}
