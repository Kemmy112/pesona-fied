import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Homepage from "./pages/home";
// import Login from "./pages/auth/login";
// import Navbar from "./components/layout/navbar";
import Sidebar from "./components/layout/sidebar";
// import About from './components/layout/about';


function App() {

  
  return (

    < Sidebar/>
    // <Router>
    //      <About />

    //   <Routes>
    //     <Route path="/" element={
    //         <>
    //           {< Navbar/>}
    //           <Homepage />
    //         </>
    //       }
    //     />

    //     <Route path="/login" element={<Login />} />
    //     <Route path="/sidebar" element={<Sidebar />} />
    //   </Routes>
    // </Router>
    
  )
};

//      <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <div className={theme === 'dark' ? 'dark-mode' : 'light-mode'}>
//         <Router>
//           <Navbar /> {/* Has the toggle button */}
//           <About />   {/* This stays globally if modal */}
//           <Routes>
//             <Route path="/" element={<Homepage />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </Router>
//       </div>
//     </ThemeContext.Provider>
//   );
// }

export default App;
