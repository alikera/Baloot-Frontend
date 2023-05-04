import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from "./auth/login";
import Register from "./auth/register";
import User from "./user/user";
import Home from "./home/homeCommodities";
import Provider from "./provider/provider";
import Commodity from "./commodity/commodity";

function App() {
    return (<Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/user/:username" element={<User/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/provider/:providerId" element={<Provider/>}/>
            <Route path="/commodity/:id" element={<Commodity/>}/>
        </Routes>
    </Router>);
}

export default App;
