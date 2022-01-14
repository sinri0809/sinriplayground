import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Router/Home";
import User from "./Router/User";
import ContUpload from "./Router/ContUpload";


const AppRouter = ({login, user}) => {
  return <Switch>
    <Route exact path="/">
      <Home user={user}/>
    </Route>
    <Route exact path="/user">
      <User login={login} user={user}/>
    </Route>
    <Route exact path="/content">
      <ContUpload />
    </Route>
  </Switch>
}

export default AppRouter;