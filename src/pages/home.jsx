import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegLightbulb, FaRegCompass, FaRegUser } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import { BsArrowRightCircle } from 'react-icons/bs';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaRegLightbulb className="w-6 h-6" />,
      title: "Discover Possibilities",
      description: "Explore different versions of yourself through creative reflection and imagination."
    },
    {
      icon: <FaRegCompass className="w-6 h-6" />,
      title: "Navigate Choices",
      description: "See how different life choices could have shaped your journey."
    },
    {
      icon: <FaRegUser className="w-6 h-6" />,
      title: "Create Personas",
      description: "Build and explore different versions of yourself in a safe, creative space."
    }
  ];

  const personas = [
    {
      title: "Poet Me",
      description: "Still wandering the streets for metaphors...",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "CEO Me",
      description: "Built empires from ideas no one believed in...",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      title: "Sous Chef Me",
      description: "What if I'd taken cooking lessons...",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80')] bg-cover bg-center opacity-10 dark:opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block mb-6"
            >
              <HiOutlineSparkles className="w-12 h-12 text-blue-500 dark:text-blue-400" />
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
            >
              Not just who you are — who you could've been.
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Explore alternate versions of you through creative reflection.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex justify-center gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Let's explore! 
                <BsArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="text-blue-500 dark:text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Personas Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            Meet Your Potential Selves
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {personas.map((persona, index) => (
              <motion.div
                key={persona.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-indigo-900 hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <img 
                  src={persona.image} 
                  alt={persona.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{persona.title}</h3>
                  <p className="text-gray-200">{persona.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-white/50 to-blue-50/50 dark:from-gray-900/50 dark:to-indigo-900/50 backdrop-blur-sm"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
          >
            Ready to Explore Your Potential?
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Journey <BsArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 PersonaFied. Crafted with purpose.</p>
      </footer>
    </div>
  );
}

