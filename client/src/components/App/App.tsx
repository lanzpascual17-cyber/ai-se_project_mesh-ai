import "./App.css";
import KnowledgeBase from "../../pages/KnowledgeBase/KnowledgeBase";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

import { Routes, Route } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import Intro from "../../pages/Intro/Intro";
import Chat from "../../pages/Chat/Chat";
import { ProtectedRoute, PublicRoute } from "../ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
