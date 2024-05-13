  const customer = (state = [], action) => {
    switch (action.type) {
      case 'CUSTOMER_TO_ADD':
        return action.payload;
      default:
        return state;
    }
  };

  export default customer;