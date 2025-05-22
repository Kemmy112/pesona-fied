import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/home";
import Login from "./pages/auth/login";
import Navbar from "./components/layout/navbar";
import About from './components/layout/about';

//   // 1. Create Theme Context
// export const ThemeContext = createContext();
function App() {

  // const [theme, setTheme] = useState('light'); // default theme

  // const toggleTheme = () => {
  //   setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  
  return (
    <Router>
         <About />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <Navbar /> */}
              <Homepage />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>)
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
