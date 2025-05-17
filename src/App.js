import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from "./pages/home"
// import Login from "./pages/auth/login"
import Navbar from "./components/layout/navbar"


function App (){

    return(
        <Router>
            <Routes>
                <Route path="/"
                element={<Homepage/>}/>
                 <Route path="/"
                element={<Navbar/>}/>
                 {/* <Route path="/login"
                element={<Login/>}/> */}
                
            </Routes>
        </Router>
        
    )

} 

export default App
