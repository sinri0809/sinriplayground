import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Router/Home";
import User from "./Router/User";
import ContUpload from "./Router/ContUpload";


const AppRouter = () => {
  return <div className="wrap">
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/user">
        <User/>
      </Route>
      <Route exact path="/content">
        <ContUpload />
      </Route>
    </Switch>
  </div>
}

export default AppRouter;