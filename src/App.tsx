import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {

  return (

    <Router>
     <AuthContextProvider>
     <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/rooms/new' element={<NewRoom/>} />
        <Route path='/rooms/:id' element={<Room/>} />
      </Routes>
    </AuthContextProvider>
    </Router>

  );
}

export default App;
