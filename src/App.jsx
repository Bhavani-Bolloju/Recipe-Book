import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import * as routes from "./constants/routes";

function App() {
  return (
    <div>
      {/* <h1>Recipe Book</h1> */}
      <Routes>
        <Route path={routes.home} element={<Home />}></Route>
        <Route path={routes.signUp} element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
