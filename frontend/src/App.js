import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from "./auth/login";
import Register from "./auth/register";

function App() {
    return (<Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>);
}

export default App;
