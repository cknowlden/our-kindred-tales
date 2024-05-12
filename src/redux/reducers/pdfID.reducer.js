const pdfIDReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PDF_ID':
        return action.payload.idpdf;
      default:
        return state;
    }
  };
  
  export default pdfIDReducer;
  