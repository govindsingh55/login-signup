import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import SignUp from "./components/signup";
import Login from "./components/login";
import {Provider} from "react-redux";
import store from "./store";
import {
  CSSReset,
  ThemeProvider,
} from '@chakra-ui/core';
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
  <ThemeProvider>
  <CSSReset/>
  <Provider store={store}>
  <Router>
    <Switch>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/login' component={Login}/>
      <Redirect from="/" to="/login"/>
    </Switch>
  </Router>
  </Provider>
  </ThemeProvider>
)

export default Routes