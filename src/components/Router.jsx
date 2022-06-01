import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Router/Home";
import User from "./Router/User";
import ContUpload from "./Router/ContUpload";


const AppRouter = () => {
  return <div className="wrap">
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/user" element={<User />} />
      <Route path="/content" element={<ContUpload />} />

    </Routes>
  </div>
}

export default AppRouter;