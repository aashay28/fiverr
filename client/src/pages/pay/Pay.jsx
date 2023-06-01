import './Pay.scss';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51MwgfaSFCIq8Fm47gDsFzI2Gpol3miLkzkwYvb1L7b685p5NJC0ZivnUjUFqnBtCokkSdhW4EdGXKTiIALka1q9O00hiWIuiHH'
);

const Pay = () => {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const [clientSecret, setClientSecret] = useState('');
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest(token).post(
          `/orders/create-payment-intent/${id}`
        );

        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log('error', error);
      }
    };
    makeRequest();
  }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className='pay'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
