import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import Manager from "./components/manager/Manager";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/home" />}></Route>
      <Route path="/home" element={<Homepage />}></Route>
      <Route path="/manager" element={<Manager />}></Route>
    </Routes>
  );
};

export default App;
