import React, { useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";

import PostList from "../pages/PostList";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import Header from "../components/Header";

import { actionCreators as userActions } from "../redux/modules/user";
import {useDispatch} from "react-redux";

import { apiKey } from "./firebase";

function App() {

const dispatch = useDispatch();

const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
const is_session = sessionStorage.getItem(_session_key) ? true : false;

React.useEffect(()=>{
  if (is_session) {
    dispatch(userActions.loginCheckFB());
  }

},[])

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path={"/"} exact component={PostList} />
          <Route path={"/login"} exact component={LogInPage} />
          <Route path={"/signup"} exact component={SignUpPage} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
