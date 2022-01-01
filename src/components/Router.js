import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

import User from "./User";
import ContUpload from "./ContUpload";


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