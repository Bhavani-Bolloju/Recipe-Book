import { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import * as routes from "./constants/routes";
import { AuthContext } from "./context/authContext";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

function App() {
  const { userAuth } = useContext(AuthContext);
  return (
    <div>
      {userAuth && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to={routes.home} />}></Route>
        <Route
          path={routes.home}
          element={userAuth ? <Home /> : <Navigate to={routes.signUp} />}
        ></Route>
        <Route path={routes.signUp} element={<SignUp />}></Route>
        <Route path={routes.logIn} element={<Login />}></Route>
        <Route path="Recipe/:id" element={<Recipe />}></Route>
        <Route path="Search/:text" element={<Search />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
