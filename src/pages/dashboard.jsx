import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineLogout,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineUser,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineCollection,
  HiOutlinePlusCircle,
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineChat,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineEye
} from 'react-icons/hi';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    email: "",
    createdAt: null
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState({
    totalPersonas: 0,
    totalEntries: 0,
    lastActive: null
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [personas, setPersonas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log("Fetched user data:", data); // Debug log
            setUserData({
              fullName: data.fullName || "",
              username: data.username || "",
              email: data.email || "",
              createdAt: data.createdAt || null
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const fetchPersonas = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const personasQuery = query(
            collection(db, "personas"),
            where("userId", "==", user.uid)
          );
          const personasSnapshot = await getDocs(personasQuery);
          const personasData = personasSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPersonas(personasData);
          setStats(prev => ({
            ...prev,
            totalPersonas: personasData.length
          }));
        } catch (error) {
          console.error("Error fetching personas:", error);
        }
      }
    };

    const fetchStats = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Fetch journal entries count
          const entriesQuery = query(
            collection(db, "journal_entries"),
            where("userId", "==", user.uid)
          );
          const entriesSnapshot = await getDocs(entriesQuery);

          setStats({
            totalEntries: entriesSnapshot.size,
            lastActive: new Date().toISOString()
          });
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting("Good morning");
      } else if (hour < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    const initializeDashboard = async () => {
      setLoading(true);
      await fetchUserData();
      await fetchPersonas();
      await fetchStats();
      updateGreeting();
      setLoading(false);
    };

    initializeDashboard();
    const interval = setInterval(updateGreeting, 60000);

    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
    setLoading(false);
  };

  const handleCreatePersona = () => {
    navigate("/create-persona");
  };

  const handleViewPersona = (personaId) => {
    navigate(`/persona/${personaId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <HiOutlineSparkles className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  PersonaFied
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <HiOutlineChartBar className="w-5 h-5" />
                </button>
                <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <HiOutlineCalendar className="w-5 h-5" />
                </button>
                <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <HiOutlineChat className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search personas, entries..."
                  className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative">
                <HiOutlineBell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <HiOutlineCog className="w-6 h-6" />
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                disabled={loading}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isDarkMode ? (
                  <HiOutlineSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <HiOutlineMoon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <HiOutlineX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <HiOutlineMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-3 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search personas, entries..."
                    className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative">
                    <HiOutlineBell className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <HiOutlineCog className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <HiOutlineChartBar className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <HiOutlineCalendar className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <HiOutlineChat className="w-5 h-5" />
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <HiOutlineUser className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <HiOutlineClock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {greeting}, {userData.fullName || userData.username}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome to your PersonaFied dashboard
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Personas</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPersonas}</p>
                </div>
                <HiOutlineCollection className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Journal Entries</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalEntries}</p>
                </div>
                <HiOutlineDocumentText className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Active</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {new Date(stats.lastActive).toLocaleTimeString()}
                  </p>
                </div>
                <HiOutlineClock className="w-8 h-8 text-green-500 dark:text-green-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={handleCreatePersona}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-3">
              <HiOutlinePlusCircle className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Create New Persona</h3>
            </div>
            <p className="text-blue-100">Start exploring a new version of yourself</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl text-white cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-3">
              <HiOutlineCollection className="w-6 h-6" />
              <h3 className="text-xl font-semibold">My Personas</h3>
            </div>
            <p className="text-purple-100">View and manage your existing personas</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-xl text-white cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-3">
              <HiOutlineDocumentText className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Journal Entries</h3>
            </div>
            <p className="text-green-100">Read and write as your different personas</p>
          </motion.div>
        </div>

        {/* Current Personas Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg mt-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Personas</h3>
          {personas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">You haven't created any personas yet.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreatePersona}
                className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Create Your First Persona
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.map((persona) => (
                <motion.div
                  key={persona.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 cursor-pointer"
                  onClick={() => handleViewPersona(persona.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{persona.name}</h4>
                    <HiOutlineEye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {persona.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {persona.personality?.slice(0, 3).map((trait) => (
                      <span
                        key={trait}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                    {persona.personality?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                        +{persona.personality.length - 3} more
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

