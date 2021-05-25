import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
import News from './components/News/News';
import Bio from './components/Bio/Bio';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import NewsEdit from './components/News/NewsEdit';
import NewsUpdate from './components/News/NewsUpdate';
import BioEdit from './components/Bio/BioEdit';
import BioUpdate from './components/Bio/BioUpdate';
import SignUp from './components/SignUp/SignUp';
import UnderConstruction from './components/under';
import Modal from 'react-modal';
import "reflect-metadata"
import './App.css'

Modal.setAppElement('#root');

function App() {
  const [signupModalIsOpen, setSignupIsOpen] = useState(false);
  function openSignupModal() {
    setSignupIsOpen(true);
  }

  function closeSignupModal() {
    setSignupIsOpen(false);
  }

  const Modals = () => {
    return (
      <>
        <Modal
          isOpen={signupModalIsOpen}
          onRequestClose={closeSignupModal}
          className="modal"
          overlayClassName="overlay"
          shouldFocusAfterRender={false}
        >
          <SignUp closeSignupModal={closeSignupModal} />
        </Modal>
      </>
    )
  }


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

            <Route exact path="/newsedit">
              <NewsEdit />
            </Route>
            <Route path="/news/edit/:id">
              <NewsUpdate />
            </Route>

            <Route exact path='/editbio'>
              <BioEdit />
            </Route>
            <Route exact path='/bio/edit/:id'>
              <BioUpdate />
            </Route>

            <Route exact path='/users'>
              <SignUp />
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
