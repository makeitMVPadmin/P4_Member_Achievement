import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage.jsx";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
