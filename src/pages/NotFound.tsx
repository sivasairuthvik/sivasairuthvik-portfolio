import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Code } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const AstronautSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2 animate-float">
    <circle cx="40" cy="40" r="38" fill="#232946" stroke="#7fdbff" strokeWidth="3" />
    <ellipse cx="40" cy="45" rx="18" ry="10" fill="#7fdbff" opacity="0.2" />
    <circle cx="40" cy="36" r="16" fill="#fff" stroke="#7fdbff" strokeWidth="2" />
    <ellipse cx="40" cy="36" rx="10" ry="8" fill="#7fdbff" />
    <ellipse cx="44" cy="34" rx="3" ry="2" fill="#fff" opacity="0.7" />
    <rect x="36" y="52" width="8" height="12" rx="4" fill="#7fdbff" />
    <rect x="30" y="60" width="20" height="6" rx="3" fill="#232946" stroke="#7fdbff" strokeWidth="1" />
  </svg>
);

const NotFound = () => {
  const location = useLocation();
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232946] overflow-hidden">
      {/* Animated Starfield */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#fff", "#7fdbff", "#b388ff"] },
            shape: { type: "circle" },
            opacity: { value: 0.7, random: true },
            size: { value: 1.5, random: { enable: true, minimumValue: 0.5 } },
            move: { enable: true, speed: 0.2, direction: "none", random: true, straight: false, outModes: { default: "out" } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 w-full h-full z-0"
      />
      <div className="glass-card p-12 rounded-2xl shadow-xl text-center animate-fade-in relative z-10">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-7xl font-extrabold drop-shadow-glow mb-2">404</span>
          <AstronautSVG />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Lost in Space</h2>
        <p className="text-lg text-gray-300 mb-6">Houston, we have a problem.<br/>The page you're looking for drifted into the void.</p>
        <a href="/" className="cyber-button primary inline-block px-8 py-3 rounded-full font-semibold text-lg">Return to Main Page</a>
      </div>
    </div>
  );
};

export default NotFound;
