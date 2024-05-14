/// <reference types="vite/client" />
// DON'T FORGET TO REPLACE SANDBOX URL WITH REAL LULU FOR CLIENT
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
const luluKey = import.meta.env.VITE_LULU_KEY;

function* submitOrder(action) {
  const url = 'https://api.sandbox.lulu.com';
  const grantData = 'grant_type=client_credentials';

  try {
    yield axios.put(`/api/overview/order`, action.payload);


    const orderResponse = yield axios.get('/api/overview/customer'+action.payload.id);
    console.log(orderResponse);
    const data = orderResponse.data[0];
    //comment error passing the data into the order object

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
              source_url: //data.cover_url,
            },
            interior: {
              source_url: //data.interior_url,
            },
            pod_package_id: '0600X0900FCSTDCW080CW444MXX',
          },
          quantity: 1,
          title: data.project_name,
        },
      ],
      //required will have a manual entry
      shipping_address: {
        city: data.city,
        country_code: data.country,
        name: data.name,
        phone_number: data.phone,
        postcode: data.post,
        state_code: data.state,
        street1: data.street,
      },
      //required, will have a manual entry
      shipping_level: data.shipping_level,
    };


    console.log("this is the order!!!",order);
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

    yield
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
