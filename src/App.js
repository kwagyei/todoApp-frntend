//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
// import axios from "axios"
import Home from "./components/Home"
import Todo from './components/Todo';

function App() {
  return (
    <div className="App">

<BrowserRouter>
     
        <Routes>
            <Route path= '/' element={<Home></Home>} ></Route>
            <Route path= '/Todo' element={<Todo></Todo>} ></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
