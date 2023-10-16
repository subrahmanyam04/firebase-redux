

// Initial state
const initialState = {
    data: [],
    error: '',
    selectedStudentId: null,
  };
  
  // Reducer
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DATA':
        return {
          ...state,
          data: action.payload,
        };
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'SET_SELECTED_STUDENT_ID':
        return {
          ...state,
          selectedStudentId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
  