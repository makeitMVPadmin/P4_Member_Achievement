import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/HomePage/HomePage.jsx";
import ResourcePage from "./pages/ResourcePage/ResourcePage.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import RewardsPage from "./pages/RewardsPage/RewardsPage.jsx";
import BookMarkedPage from "./pages/BookMarkedPage/BookMarkedPage.jsx";
import ContributionsPage from "./pages/ContributionsPage/ContributionsPage.jsx";
import Contribution from "./components/Contribution/Contribution.jsx";
import SubmissionDrawer from "./components/SubmissionForm/SubmissionDrawer.jsx";

const App = () => {
  const [savedBookmarks, setSavedBookmarks] = useState([]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setSavedBookmarks(bookmarks);
  }, []);

  const [resources, setResources] = useState([]);

  const addResource = (resource) => {
    setResources([...resources, resource]);
  };

  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/resource"
              element={<ResourcePage setSavedBookmarks={setSavedBookmarks} component={Contribution}   resources={resources}/>}
            />
            <Route
              path="/bookmarked"
              element={<BookMarkedPage bookmarkedResources={savedBookmarks} />}
            />
            <Route path="/rewards"
              element={<RewardsPage />} 
            />
            <Route path="/contributions" element={<ContributionsPage />} onAddResource={addResource} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};
export default App;
