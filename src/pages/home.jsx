import { useEffect } from 'react';
import '../styles/global.css';
import Navbar from '../components/layout/navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="homepage-container" 
    style={{
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      
      <Navbar />

      <div className="content-wrapper">
        {/* Hero Section */}
        <section className="hero" data-aos="fade-up">
          <h1 className="jingle">Not just who you are — who you could’ve been.</h1>
          <p className="concept">Explore alternate versions of you through creative reflection.</p>
          <div className="cta-buttons">
            <button onClick={() => navigate('/login')}>Let's explore!</button>
          </div>
        </section>

        {/* Teaser Words */}
        <section className="teaser-text">
          <p data-aos="fade-up">What if...</p>
          <p data-aos="fade-up" data-aos-delay="200">You chose differently?</p>
          <p data-aos="fade-up" data-aos-delay="400">Who would you be?</p>
          <p data-aos="fade-up" data-aos-delay="600">Would you recognize yourself?</p>
        </section>

        {/* The Concept Section */}
        <section className="concept-scroll">
          <p className="reveal">
            PersonaFied is a self-exploration space where you meet versions of yourself that could’ve been — one persona at a time.
          </p>
          <div className="persona-mocks">
            <div className="persona-card" data-aos="zoom-in">
              <img className="lit lit-img1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL3drlrn01SVg5kI3DmYMx-ehngFHrob_qgA&s" alt="thisimg"/>
              <h4> Poet Me</h4>
              <p>Still wandering the streets for metaphors...</p>
              </div>
            <div className="persona-card" data-aos="zoom-in">
              <img className="lit lit-img2" src="https://img.freepik.com/premium-photo/modern-tall-buildings-seen-from_1417-8009.jpg" alt="thisimpg"/>
              <h4>CEO Me</h4>
              <p>Built empires from ideas no one believed in...</p>
              </div>
            <div className="persona-card" data-aos="zoom-in">
              <img className="lit lit-img3" src="https://img.freepik.com/free-photo/flat-lay-mussels-white-sauce-tablecloth-with-copyspace_23-2148234930.jpg?semt=ais_hybrid&w=740" alt="thisimppg"/>
              <h4> Sous Chef Me </h4>
              <p>What if I'd taken cooking lessons...</p>
              </div>
            
          </div>
        </section>

        {/* Footer CTA */}
    <footer
  className="footer-cta text-center py-5 mt-5">
  <div className="container">
    <p className="mb-3 fw-bold fs-5">
      Stay inspired. Subscribe to our newsletter.
    </p>
    <div className="d-flex justify-content-center flex-wrap gap-3">
      <a
        href="/login"
        className="btn btn-primary px-4"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        Sign Up & Get Started
      </a>
      <a
        href="#"
        className="btn btn-outline-secondary px-4"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        Learn More
      </a>
    </div>
    <p className="mt-4 text-muted small" data-aos="fade">
      &copy; 2025 PersonaFied. Crafted with purpose.
    </p>
  </div>
</footer>


      </div>
    </div>
  );
}

