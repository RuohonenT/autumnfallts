import React, { useState, useEffect } from 'react'
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
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Context from './Context';
import UnderConstruction from './components/under';
import { getOwnProfile } from './controllers/fetchFunctions';
import "reflect-metadata"
import './App.css'


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);

  const getProfile = async () => {
    if (token) {
      const result = await getOwnProfile(token);
      if (result.status === 200) {
        const userData = await result.json();
        setCurrentUser(userData);
      }
    } else {
      setCurrentUser(null);
    }
  }
  useEffect(() => {
    return getProfile();
  }, [token])


  return (
    <Context.Provider value={{
      isLogin,
      setIsLogin,
      token,
      setToken,
      // getProfile,
      currentUser
    }}>
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

            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>

            <Route exact path='/under'><UnderConstruction /></Route>

          </Switch>
        </div>


        <Footer />

      </Router>
    </Context.Provider>
  );
}

export default App;
