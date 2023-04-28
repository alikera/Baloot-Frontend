import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from "./auth/login";
import Register from "./auth/register";
import User from "./user/user";
import Home from "./home/homeCommodities";

function App() {
    return (<Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </Router>);
}

export default App;
