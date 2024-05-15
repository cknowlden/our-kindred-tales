// <reference types="vite/client" />
// DON'T FORGET TO REPLACE SANDBOX URL WITH REAL LULU FOR CLIENT
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
const luluKey = import.meta.env.VITE_LULU_KEY;

function* submitOrder(action) {
  const url = 'https://api.sandbox.lulu.com';
  const grantData = 'grant_type=client_credentials';

  try {
    yield axios.put(`/api/overview/order`, action.payload);

    const orderResponse = yield axios.get(
      `/api/overview/customer/${action.payload.id}`
    );

    console.log(orderResponse.data.cover_url);
    const data = orderResponse;
    // console.log(data);

    const order = {
      //required will have a manual entry for email
      contact_email: 'support@ourkindredtales.com',
      external_id: 'KindredTales',
      //required
      line_items: [
        {
          external_id: 'item-reference-1',
          printable_normalization: {
            cover: {
              source_url: data.data.cover_url,
            },
            interior: {
              source_url: data.data.interior_url,
            },
            pod_package_id: '0600X0900FCSTDCW080CW444MXX',
          },
          quantity: 1,
          title: data.data.project_name,
        },
      ],

      //required will have a manual entry
      shipping_address: {
        city: data.data.city,
        country_code: data.data.country,
        name: data.data.name,
        phone_number: data.data.phone,
        postcode: data.data.post,
        state_code: data.data.state,
        street1: data.data.street,
      },
      //required, will have a manual entry
      shipping_level: data.data.shipping_level,
    };

    console.log(order);
    // Retrieve security token
    let accessToken = '';
    yield axios
      .post(
        `${url}/auth/realms/glasstree/protocol/openid-connect/token`,
        grantData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: luluKey,
          },
        }
      )
      .then((response) => {
        accessToken = response.data.access_token;
        console.log('Response:', accessToken);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // Send order to lulu
    //TODO: need to return the luluAPI ID from the post route, and insert it into the DB.

    yield;
    axios
      .post(`${url}/print-jobs/`, order, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.log('Error with order submit:', error);
    yield put({ type: 'ORDER_FAILED' });
  }
}

function* orderSaga() {
  yield takeLatest('SUBMIT_ORDER', submitOrder);
}

export default orderSaga;
