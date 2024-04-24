const newPDFReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NEWPDF':
      return action.payload;
    default:
      return state;
  }
};

export default newPDFReducer;
