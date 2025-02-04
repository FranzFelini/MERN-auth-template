import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-10">
      <motion.h1
        className="text-6xl font-bold neon-glow mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to the Homepage
      </motion.h1>
      <motion.p
        className="text-xl text-gray-400 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        This is the test sample of the home page, and is only meant to be
        modified, using it raw might cause certain security breaches
      </motion.p>
      <Link to="/register">
        <motion.button
          className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Get Started
        </motion.button>
      </Link>
    </div>
  );
};

export default Home;
