import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';



function App() {
  return (
    <div className="App">
     <Router>
      <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props}/>} />

      </Switch>
     </Router>
    </div>
  );
}

export default App;
