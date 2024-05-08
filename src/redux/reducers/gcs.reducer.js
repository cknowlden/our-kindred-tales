const googleCloud = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GOOGLE_CLOUD':
      return action.payload;
    default:
      return state;
  }
};

export default googleCloud;
