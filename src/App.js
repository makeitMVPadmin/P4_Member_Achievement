import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage.jsx";
import ResourcePage from "./pages/ResourcePage/ResourcePage.jsx";
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resource" element={<ResourcePage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}
export default App;
