import { useState } from 'react';
import useForm from '../lib/useForm';

const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    price: '',
    description: '',
  });
  console.log(inputs);
  return (
    <form>
      <label htmlFor='name'>
        Name
        <input
          type='text'
          id='name'
          name='name'
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor='price'>
        Price
        <input
          type='number'
          id='price'
          name='price'
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <button type='button' onClick={clearForm}>
        Clear form
      </button>
      <button type='button' onClick={resetForm}>
        Reset form
      </button>
    </form>
  );
};

export default CreateProduct;
