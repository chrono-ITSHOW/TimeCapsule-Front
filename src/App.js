import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Start from './pages/Start';
import Loading from './pages/Loading';
import Send from './pages/Send'
import Write from './pages/Write'
import Capsule from './pages/Capsule';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/send" element={<Send />} />
                <Route path="/write" element={<Write />} />
                <Route path='/capsule' element={<Capsule /> } />
            </Routes>
        </Router>
    )
}

export default App;

