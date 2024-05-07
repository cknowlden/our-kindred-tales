//deletes project by id

const deleteReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DELETE_PROJECT':
      return action.payload;
    default:
      return state;
  }
};

export default deleteReducer;
