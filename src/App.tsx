import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import SurahList from "./components/surah";
import SurahDetail from "./components/surahDetail";
import Home from "./components/home";
import About from "./components/About";
import BookmarkApp from "./components/bookmark";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/surah" element={<SurahList />} />
          <Route path="/surah/:nomor" element={<SurahDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookmark" element={<BookmarkApp />} />
        </Routes>
    </Router>
  );
}

export default App