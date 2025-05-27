import React from 'react';
import { motion } from 'framer-motion';
import { FaRegLightbulb, FaRegCompass, FaRegUser, FaRegHeart, FaRegBookmark } from 'react-icons/fa';
import { HiOutlineSparkles, HiOutlineHome, HiOutlineInformationCircle, HiOutlineLogin } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function About() {
  const features = [
    {
      icon: <FaRegLightbulb className="w-6 h-6" />,
      title: "Create Alternate Selves",
      description: "Craft personas based on missed chances, untold stories, or traits you never explored."
    },
    {
      icon: <FaRegCompass className="w-6 h-6" />,
      title: "Journal in Their Voice",
      description: "Write journal entries as that version of yourself — their regrets, their joy, their day."
    },
    {
      icon: <FaRegUser className="w-6 h-6" />,
      title: "Explore Through Prompts",
      description: "Guided prompts unlock deeper emotional truths hidden in these alternate selves."
    },
    {
      icon: <FaRegHeart className="w-6 h-6" />,
      title: "Visual Identity",
      description: "Give your personas a face, a vibe, a quote — like ambient fragments of memory."
    },
    {
      icon: <FaRegBookmark className="w-6 h-6" />,
      title: "Archive & Reflect",
      description: "Toggle between personas and discover what connects or divides them."
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
      {/* Simple Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              <HiOutlineSparkles className="w-6 h-6" />
              <span>PersonaFied</span>
            </Link>
            <ul className="flex items-center space-x-8">
              <li>
                <Link to="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <HiOutlineHome className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium">
                  <HiOutlineInformationCircle className="w-5 h-5" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <HiOutlineLogin className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80')] bg-cover bg-center opacity-10 dark:opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
              About PersonaFied
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Explore Who You Could've Been
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Left Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>PersonaFied</strong> is a creative self-reflection platform designed for the dreamers,
                the overthinkers, the seekers — for anyone who's ever wondered:
              </p>
              <p className="text-xl italic text-blue-600 dark:text-blue-400 mb-4">
                "What if I had chosen differently?"
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                At its core, PersonaFied is a digital journaling experience that invites users to explore
                alternate versions of themselves — not as fantasy, but as emotional reality.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">The Philosophy</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                PersonaFied doesn't ask you to escape reality — it invites you to honor every version of yourself.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Every unchosen path leaves an echo, and every echo has something to say.
              </p>
              <p className="text-xl font-semibold text-center mt-6 text-blue-600 dark:text-blue-400">
                Because "You are more than one story."
              </p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Features</h2>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="text-blue-500 dark:text-blue-400 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Who It's For</h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Writers and creatives seeking introspection
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Students and professionals at a crossroads
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Anyone exploring their identity, purpose, or past
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Therapists and coaches looking for journaling tools
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Humans being human
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 PersonaFied. Crafted with purpose.</p>
      </footer>
    </div>
  );
}

export default About; 