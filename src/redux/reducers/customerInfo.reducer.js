const customer = (state = {}, action) => {
    if (action.type === 'CUSTOMER_TO_ADD') {
      return action.payload;
    }
    return state;
  };

  export default customer;