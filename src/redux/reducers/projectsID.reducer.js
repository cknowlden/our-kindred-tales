const projectsIDReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_PROJECTS_ID':
      return action.payload;
    default:
      return state;
  }
};

export default projectsIDReducer;
