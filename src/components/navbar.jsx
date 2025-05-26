import React  from 'react';
import '../styles/global.css';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#00adff" }}>
  <div className="container-fluid">
    {/* Brand */}
    <a className="navbar-brand ms-4 d-flex align-items-center" href="#">
      <img
        src="https://i.pinimg.com/736x/d7/77/3f/d7773f02adc26716a60799160c6be52a.jpg"
        alt="Logo"
        width="30"
        height="24"
        className="d-inline-block align-text-top"
      />
      <span
        className="ms-2 fw-bold fs-3"
        style={{
          background: "linear-gradient(90deg, #a8d0ff 0%, #cda4de 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        Personafied
      </span>
    </a>

    {/* Toggler button */}
    <button
      className="navbar-toggler me-4"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Collapsible content */}
    <div className="collapse navbar-collapse justify-content-end me-4" id="navbarNav">
      <div className="navbar-nav gap-3">

        <a className="nav-link fs-6" href="/about">About</a>
        <a className="nav-link fs-6" href ="/login">Login</a>

      </div>
    </div>
  </div>
</nav>

  );
}

// function Navbar() {
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <nav
//       className="navbar navbar-expand-lg"
//       style={{ backgroundColor: theme === 'dark' ? '#1c1c1c' : '#00adff' }}
//     >
//       <div className="container-fluid">
//         {/* Brand */}
//         <a className="navbar-brand ms-4 d-flex align-items-center" href="#">
//           <img
//             src="https://i.pinimg.com/736x/d7/77/3f/d7773f02adc26716a60799160c6be52a.jpg"
//             alt="Logo"
//             width="30"
//             height="24"
//             className="d-inline-block align-text-top"
//           />
//           <span
//             className="ms-2 fw-bold fs-3"
//             style={{
//               background: "linear-gradient(90deg, #a8d0ff 0%, #cda4de 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               display: "inline-block",
//             }}
//           >
//             PersonaFied
//           </span>
//         </a>

//         {/* Toggler button */}
//         <button
//           className="navbar-toggler me-4"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Collapsible content */}
//         <div className="collapse navbar-collapse justify-content-end me-4" id="navbarNav">
//           <div className="navbar-nav gap-3 align-items-center">
//             <a
//               className="nav-link fs-6"
//               href="#"
//               data-bs-toggle="modal"
//               data-bs-target="#aboutModal"
//             >
//               About
//             </a>
//             <a className="nav-link fs-6" onClick={() => navigate('/login')}>
//               Login
//             </a>

//             {/* Theme toggle button */}
//             <button
//               onClick={toggleTheme}
//               className="btn btn-sm btn-outline-light ms-3"
//               style={{
//                 backgroundColor: theme === 'dark' ? '#444' : '#f0f0f0',
//                 color: theme === 'dark' ? '#fff' : '#000',
//                 borderColor: theme === 'dark' ? '#666' : '#ccc',
//               }}
//             >
//               {theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


export default Navbar;