import './App.css';
import SidebarWithHeader from "./components/Heading/Heading";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Scrimmage } from './domain/Dashboard/Scrimmage/Scrimmage'

function App() {
  return (
    <>
    <SidebarWithHeader children />
      <Router>
        <Switch>
          <Route path="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
