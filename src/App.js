

// import './App.css';

import Student from './components/Student';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div >
  
    <Student />
    <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
    </div>
  );
}

export default App;