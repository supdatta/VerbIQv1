import { motion } from "framer-motion";
import { Briefcase, Users, Scale, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SolarSystem = () => {
  const navigate = useNavigate();

  const orbits = [
    {
      id: "interview",
      icon: Briefcase,
      radius: 120,
      duration: 20,
      bgColor: "bg-primary",
      delay: 0
    },
    {
      id: "group-discussion",
      icon: Users,
      radius: 200,
      duration: 25,
      bgColor: "bg-accent",
      delay: 2
    },
    {
      id: "debate",
      icon: Scale,
      radius: 280,
      duration: 30,
      bgColor: "bg-chart-3",
      delay: 4
    }
  ];

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Center Hub */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute z-20 w-28 h-28 bg-primary rounded-full border-2 border-black shadow-[4px_4px_0_0_#000000] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 orbit-node"
        onClick={() => navigate("/tips")}
      >
        <div className="text-center">
          <Lightbulb className="w-8 h-8 mx-auto text-primary-foreground" />
          <span className="text-xs font-semibold text-primary-foreground mt-1 block">Tips</span>
        </div>
      </motion.div>

      {/* Circular Orbit Rings */}
      {orbits.map((orbit, index) => (
        <motion.div
          key={`ring-${orbit.id}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="absolute border-2 border-border/30 rounded-full"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
          }}
        />
      ))}

      {/* Orbiting Circular Nodes */}
      {orbits.map((orbit, index) => {
        const Icon = orbit.icon;
        return (
          <motion.div
            key={orbit.id}
            className="absolute pointer-events-none"
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: orbit.duration,
              repeat: Infinity,
              ease: "linear",
              delay: orbit.delay
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 ${orbit.bgColor} rounded-full border-2 border-black shadow-[3px_3px_0_0_#000000] cursor-pointer hover:scale-125 transition-all duration-300 flex items-center justify-center pointer-events-auto orbit-node`}
              style={{ 
                animation: `orbit-reverse ${orbit.duration}s linear infinite`
              }}
              onClick={() => navigate(`/practice/${orbit.id}`)}
              whileHover={{ scale: 1.2 }}
            >
              <div 
                style={{
                  animation: `orbit ${orbit.duration}s linear infinite`
                }}
              >
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute bg-primary/40 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default SolarSystem;
