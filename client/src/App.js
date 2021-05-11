import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
import News from './components/News/News';
import Bio from './components/Bio/Bio';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import NewsForm from './components/News/NewsForm';
import NewsEditForm from './components/News/NewsEditForm';
import BioEdit from './components/Bio/BioEdit';
import ShowBio from './components/Bio/ShowBio';
import UnderConstruction from './components/under';
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

            <Route exact path="/newsform">
              <NewsForm />
            </Route>
            <Route exact path="/news/edit/:id">
              <NewsEditForm />
            </Route>

            <Route exact path='/editbio'>
              <BioEdit />
            </Route>

            <Route exact path='/showbio'>
              <ShowBio />
            </Route>

            <Route exact path='/under'><UnderConstruction /></Route>

          </Switch>
        </div>


        <Footer />

      </Router>


    </>
  );
}

export default App;
