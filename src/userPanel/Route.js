import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./header";
import ControlPanel from "./controlPanel";
import Login from "./login";
import NotFound from "./404/404";
import SASPanel from "./sas Page/sasPanel";


export default function Routes() {
  return (
    <Router>
         <Switch>
          <Route exact path="/">
          <Header/>
          <Login/>
            </Route>
          <Route path="/admin">
              <Header/>
            <ControlPanel />
          </Route>

          <Route path="/SASpanel">
              <Header/>
            <SASPanel />
          </Route>

          <Route path="*">
            <NotFound/>
          </Route>
         </Switch>
     </Router>
  );
}
 
