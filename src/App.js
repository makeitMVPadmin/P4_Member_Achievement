import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/HomePage/HomePage.jsx";
import ResourcePage from "./pages/ResourcePage/ResourcePage.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import RewardsPage from "./pages/RewardsPage/RewardsPage.jsx";
import BookMarkedPage from "./pages/BookMarkedPage/BookMarkedPage.jsx";
import ContributionsPage from "./pages/ContributionsPage/ContributionsPage.jsx";

const App = () => {
  const [savedBookmarks, setSavedBookmarks] = useState([]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setSavedBookmarks(bookmarks);
  }, []);

  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/resource"
              element={<ResourcePage setSavedBookmarks={setSavedBookmarks} />}
            />
            <Route
              path="/bookmarked"
              element={<BookMarkedPage bookmarkedResources={savedBookmarks} />}
            />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/contributions" element={<ContributionsPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};
export default App;
