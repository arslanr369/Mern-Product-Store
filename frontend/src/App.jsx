import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from 'react-router-dom';  // Correct the import
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar.jsx';
import { useProductStore } from "./store/product.js";  // Correct function name

function App() {
  const { products } = useProductStore();  // Correct function name

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.700")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
