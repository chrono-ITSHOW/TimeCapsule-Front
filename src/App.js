import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import Send from "./pages/Send";
import Write from "./pages/Write";
import Capsule from "./pages/Capsule";
import Qr from "./pages/Qr";
import Gallery from "./pages/Gallery";
import SelectMusic from "./pages/SelectMusic";
import {CapsuleProvider} from "./pages/CapsuleProvider";

function App() {
  const seletedMusicRef = useRef({});
  return (
    <CapsuleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/send" element={<Send />} />
          <Route
            path="/write"
            element={<Write seletedMusicRef={seletedMusicRef} />}
          />
          <Route path="/capsule" element={<Capsule />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/selectmusic"
            element={<SelectMusic seletedMusicRef={seletedMusicRef} />}
          />
        </Routes>
      </Router>
    </CapsuleProvider>
  );
}

export default App;
