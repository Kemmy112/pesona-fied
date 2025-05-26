import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar"; // adjust the path as needed
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // animate once

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    const user = auth.currentUser;
    user?.reload().then(() => {
      if (!user.emailVerified) {
        navigate("/verify-email");
      }
    });
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container mt-5" data-aos="fade-up">
        <div className="text-center">
          <h2 className="fw-bold">Welcome back, {username} 👋</h2>
          <p className="text-muted">Here’s your Personafied dashboard.</p>
        </div>
        {/* Add dashboard content below */}
      </div>
    </>
  );
};

export default Dashboard;

