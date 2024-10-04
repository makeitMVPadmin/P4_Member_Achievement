import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/HomePage/HomePage.jsx";
import ResourcePage from "./pages/ResourcePage/ResourcePage.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import RewardsPage from "./pages/RewardsPage/RewardsPage.jsx";
import BookMarkedPage from "./pages/BookMarkedPage/BookMarkedPage.jsx";
import ContributionsPage from "./pages/ContributionsPage/ContributionsPage.jsx";
import { database } from "./config/firebase.js";
import { doc, getDoc } from "@firebase/firestore";

export const PointsContext = createContext();

const App = () => {
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [currentUser, setCurrentUser] = useState({}); // Sample current userID
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem("points");
    if (savedPoints === null) {
      localStorage.setItem("points", 600);
      return 600;
    }
    const parsedPoints = parseInt(savedPoints, 10);
    console.log("Saved Points:", savedPoints);
    return !isNaN(parsedPoints) ? parsedPoints : 600;
  });

  useEffect(() => {
    localStorage.setItem("points", points);
  }, [points]);

  const addPoints = (amount) => {
    setPoints((prevPoints) => {
      const newPoints = prevPoints + amount;
      localStorage.setItem("points", newPoints);
      return newPoints;
    });
  };

  const deductPoints = (amount) => {
    setPoints((prevPoints) => {
      const newPoints = Math.max(prevPoints - amount, 0);
      localStorage.setItem("points", newPoints);
      console.log("Deducting Points:", newPoints);
      return newPoints;
    });
  };

  const handlePointsChange = (newPoints) => {
    localStorage.setItem("points", newPoints);
    setPoints(newPoints);
  };

  console.log(currentUser);

  useEffect(() => {
    // Fetch user data from Firestore
    const fetchUserData = async () => {
      console.log("fetch data running");
      
      try {
        // Assuming you have a way to get the user ID, replace `userId` with actual user ID.
        const userId = "lsIRi5Uu72sATQ7JLIu1"; // Replace with actual user ID logic
        const userDoc = doc(database, "Users", userId);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setCurrentUser(userSnapshot.data());
        } else {
          console.log("No such user!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setSavedBookmarks(bookmarks);
  }, []);

  const handleBookmarkUpdate = (updatedBookmarks) => {
    setSavedBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <>
      <PointsContext.Provider
        value={{
          points,
          setPoints,
          addPoints,
          deductPoints,
          handlePointsChange,
        }}
      >
        <ChakraProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/resource"
                element={
                  <ResourcePage
                    onBookmarkUpdate={handleBookmarkUpdate}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/bookmarked"
                element={
                  <BookMarkedPage
                    onBookmarkUpdate={handleBookmarkUpdate}
                    bookmarkedResources={savedBookmarks}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/rewards"
                element={
                  <RewardsPage
                    points={points}
                    onPointsChange={handlePointsChange}
                  />
                }
              />
              <Route
                path="/contributions"
                element={
                  <ContributionsPage
                    onBookmarkUpdate={handleBookmarkUpdate}
                    currentUser={currentUser}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </PointsContext.Provider>
    </>
  );
};
export default App;
