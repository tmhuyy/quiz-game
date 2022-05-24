import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage"
import QuizPage from "./components/QuizPage/QuizPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="py-4 px-4 bg-pink-200 overflow-y-auto overflow-x-hidden h-screen">
        <Router>
          <NavBar />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/quiz" element={<QuizPage/>}></Route>
            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
