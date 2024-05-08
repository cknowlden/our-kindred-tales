const viewDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROJECT_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default viewDetails;
