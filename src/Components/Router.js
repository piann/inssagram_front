
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Proptypes from "prop-types";
import React from "react";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

const LoggedInRoutes = () => <>
<Route exact path="/" component={Feed}></Route>
</>

const LoggedOutRoutes = () => <>
<Route exact path="/" component={Auth}></Route>
</>


const AppRouter = ({isLoggedIn}) => 
<Router>
<Switch>{isLoggedIn?<LoggedInRoutes /> : <LoggedOutRoutes /> }</Switch>
</Router>


AppRouter.propTypes = {
    isLoggedIn: Proptypes.bool.isRequired
}

export default AppRouter;