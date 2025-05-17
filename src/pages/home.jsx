import { useEffect, useRef, useState } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import '../styles/global.css'; // Assuming your gradient CSS is in here
import Navbar from '../components/layout/navbar';

export default function HomePage() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          color: 0x9b5de5,
          backgroundColor: 0x000000, // not visible anyway
          points: 14.0,
          spacing: 18.0,
          showDots: true
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
return (
    <>
      <Navbar/>  
      <div className="gradient-bg"></div> {/* Gradient base */}
      <div ref={vantaRef} className="vanta-layer" /> {/* Vanta canvas */}
      
      <div className="content-wrapper">
        <h1 className="main-heading">Not just who you are, <br></br>who you could have been</h1>
        <p className="tagline">Explore alternate vesions of you through creative reflection</p>
        <button className="explore-btn">Begin My Journey</button>
      </div>
    </>
  );
}