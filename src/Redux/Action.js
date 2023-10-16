// studentActions.js

export const setData = (data) => {
    console.log('Data received in setData action:', data); // Add this console.log statement
    return {
      type: 'SET_DATA',
      payload: data,
    };
  }; 
  export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
  });
  
  export const setSelectedStudentId = (id) => ({
    type: 'SET_SELECTED_STUDENT_ID',
    payload: id,
  });
  
 
  