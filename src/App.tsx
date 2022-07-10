import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Play from "./views/Play";
import Submission from "./views/Submission";

const App: React.FC = () => {
    return (
        <div style={{ position: "absolute", top: 0, left: 0, height: "100vh", width: "100vw", backgroundColor: "#22272e", overflow: "hidden" }}>
            <div style={{ width: "100%" }}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/games/play/:game' element={<Play />} />
                    <Route path='/games/submit' element={<Submission />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )

}

export default App