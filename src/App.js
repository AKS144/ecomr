import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import AdminPrivateRoute from './AdminPrivateRoute';

import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';


import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json'; //for json format accept
axios.defaults.headers.post['Accept'] = 'application/json'; 

axios.defaults.withCredentials = true;//cors for csrf token

//bearer tokens part 5 for logout
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';  //maintain space
  return config;
});


function App() {
  return (
    <div className="App">
     <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/403" component={Page403} />
        <Route exact path="/404" component={Page404} />

        {/* <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> */}
        <Route path="/login">        
          {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}  
        </Route>
        <Route path="/register">
          {/* if else condition in react */}
          {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}  
        </Route>

        {/* <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props}/>} /> */}
        <AdminPrivateRoute path="/admin" name="Admin" />

      </Switch>
     </Router>
    </div>
  );
}

export default App;
