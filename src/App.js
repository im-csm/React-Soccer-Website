import "./App.module.css";
import Navbar from "./Navbar.js"; 
import Schedule from "./Schedule.js";
import Leaderboard from "./Leaderboard.js";
import Footer from "./Footer.js";
import NoPageFound from "./NoPageFound.js";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div id="wrapper">
      <Navbar />

      <BrowserRouter>
        <Switch>
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route exact path="/schedule">
            <Schedule /> 
          </Route>
          <Route exact path="/">
            <Schedule />
          </Route>
          <Route path="*" component={NoPageFound}/>
        </Switch>
      </BrowserRouter>
      
      <Footer/>
    </div>
  ); 
}

export default App;
