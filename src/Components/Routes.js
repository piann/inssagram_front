
// eslint-disable-next-line 
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Proptypes from "prop-types";
import React from "react";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";

const LoggedInRoutes = () => <Switch>
<Route exact path="/" component={Feed}/>
<Route exact path="/explore" component={Explore}/>
<Route exact path="/search" component={Search}/>
<Route exact path="/:userName" component={Profile}/>
<Redirect from="*" to="/" />
</Switch>

const LoggedOutRoutes = () => <Switch>
<Route exact path="/" component={Auth}></Route>
<Redirect from="*" to="/" />
</Switch>



const AppRouter = ({isLoggedIn}) => 
isLoggedIn? <LoggedInRoutes /> : <LoggedOutRoutes /> 



AppRouter.propTypes = {
    isLoggedIn: Proptypes.bool.isRequired
}

export default AppRouter;