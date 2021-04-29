import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
import News from './components/News/News.jsx';
import Bio from './components/Bio/Bio';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import "reflect-metadata"

function App() {
  return (
    <>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path='/news'>
              <News />
            </Route>
            <Route exact path='/bio'>
              <Bio />
            </Route>
            <Route exact path='/contact'>
              <Contact />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>

    </>
  );
}

export default App;
