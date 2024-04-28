import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Start from './pages/Start';
import Loading from './pages/Loading';
import Send from './pages/Send'
import Write from './pages/Write'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/send" element={<Send />} />
                <Route path="/write" element={<Write />} />
            </Routes>
        </Router>
    )
}

export default App;

