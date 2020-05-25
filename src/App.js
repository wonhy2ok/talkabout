import React,{ Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Join, Login, Home, Join2 } from "./pages";
class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Login}/>
        <Route exact path='/login' component={Login}/>
        <Route path='/join' component={Join}/>
        <Route path='/join2' component={Join2}/>
        <Route path='/home' component={Home}/>
      </Router>
    );
  }
}

export default App;
