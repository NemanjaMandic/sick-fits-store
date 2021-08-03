import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Head from 'next/head';

import ErrorMessage from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: center;
  justify-content: center;
  gap: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

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

const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  {
    loading && <p>Loading...</p>;
  }
  {
    error && <ErrorMessage error={error} />;
  }
  console.log({ data, loading, error });
  return (
    <ProductStyles>
      <Head>
        <title>SIck Fits | {data?.Product.name} </title>
      </Head>
      <div className='details'>
        <img
          src={data?.Product.photo.image.publicUrlTransformed}
          alt={data?.Product.name}
        />
        <h2>{data?.Product.name}</h2>
        <p>{data?.Product.description}</p>
      </div>
    </ProductStyles>
  );
};

export default SingleProduct;
