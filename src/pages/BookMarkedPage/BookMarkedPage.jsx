import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./BookMarkedPage.scss";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";

export default function BookMarkedPage({ bookmarkedResources }) {
  const [displayedBookmarks, setDisplayedBookmarks] = useState([]);
  const [displaySelectedResource, setdisplaySelectedResource] = useState([]);

  // useEffect(() => {
  //   const getAllBookmarkedResources = async () => {
  //     try {
  //       const bookmarksCollectionRef = collection(
  //         database,
  //         "Bookmarked_Resources"
  //       );
  //       const bookmarksSnapshot = await getDocs(bookmarksCollectionRef);
  //       if (!bookmarksSnapshot.empty) {
  //         const bookmarksCollection = bookmarksSnapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         console.log("All Bookmarks:");
  //         console.log(bookmarksCollection);
  //         // This will map through all the bookmarks in the Firebase collection
  //         // setDisplayedBookmarks(bookmarksCollection);
  //       } else {
  //         console.log("No Bookmarks collection found.");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching the bookmarks: ", err);
  //     }
  //   };

  //   getAllBookmarkedResources();
  // }, []);

  useEffect(() => {
    setDisplayedBookmarks(bookmarkedResources);
  }, [bookmarkedResources]);

  console.log(displayedBookmarks);

  const handleSelectResource = (clickedId) => {
    const foundResource = bookmarkedResources.find(
      (resource) => clickedId === resource.id
    );
    setdisplaySelectedResource(foundResource)
  };

  console.log(displaySelectedResource)

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>
      <div className="resource__cards">
        <ResourceList
          resources={displayedBookmarks}
          selectResource={handleSelectResource}
        />
      </div>
    </div>
  );
}
