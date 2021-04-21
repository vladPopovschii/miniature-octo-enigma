import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Posts from "../pages/Posts";
import User from "../pages/User";
import Contacts from "../pages/Contacts";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Login} path="/login" />
                <Route component={Register} path="/register" />
                <Route component={Posts} path="/posts" />
                <Route component={User} path="/users" />
                <Route component={Contacts} path="/contacts" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
