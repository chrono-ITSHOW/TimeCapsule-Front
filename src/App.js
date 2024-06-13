import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import Send from "./pages/Send";
import Write from "./pages/Write";
import Capsule from "./pages/Capsule";
import Qr from "./pages/Qr";
import Gallery from "./pages/Gallery";
import SelectMusic from "./pages/SelectMusic";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/send" element={<Send />} />
        <Route path="/write" element={<Write />} />
        <Route path="/capsule" element={<Capsule />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/selectmusic" element={<SelectMusic />} />
      </Routes>
    </Router>
  );
}

export default App;
