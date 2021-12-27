import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

import Cont from "./Cont";
import User from "./User";


const AppRouter = ({login, user}) => {
  return <Switch>
    <Route exact path="/">
      <Home user={user}/>
    </Route>
    <Route exact path="/user">
      <User login={login} user={user}/>
    </Route>
    <Route exact path="/content">
      <Cont />
    </Route>
  </Switch>
}

export default AppRouter;