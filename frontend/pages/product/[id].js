import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import SingleProduct from '../../components/SingleProduct';

const SingleProductPage = ({ query }) => {
  return <SingleProduct id={query.id} />;
};

export default SingleProductPage;
