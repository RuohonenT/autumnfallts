import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Context from './Context';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import News from './components/News/News';
import Bio from './components/Bio/Bio';
import Disco from './components/Disco/Disco';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import NewsEdit from './components/News/NewsEdit';
import NewsUpdate from './components/News/NewsUpdate';
import BioEdit from './components/Bio/BioEdit';
import BioUpdate from './components/Bio/BioUpdate';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import UnderConstruction from './components/under';
import { getOwnProfile } from './controllers/fetchFunctions';
import 'reflect-metadata'
import jwt_decode from 'jwt-decode';
import './App.css'


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);
  const [result, setResult] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const closeNavigation = () => setToggleMenu(!toggleMenu);

  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        let decodedToken = jwt_decode(token);
        let currentDate = new Date();
        let exp = decodedToken.exp * 1000 < currentDate.getTime();
        if (exp) {
          console.log('Token expired.');
          logout();
        } else {
          console.log('Valid token');
          setResult(true);
        }
      }
    };

    const getProfile = async () => {
      if (token && result === true) {
        const result = await getOwnProfile(token);
        if (result.status === 200) {
          const userData = await result;
          setCurrentUser(userData.data);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkToken();
    return getProfile();

  }, [result, token])

  return (
    <Context.Provider value={{
      isLogin,
      setIsLogin,
      token,
      setToken,
      logout
    }}>
      <Router>
        <div className='App'>
          <Header
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
            closeNavigation={closeNavigation}
          />

          <div className='App_container'>
            <Navigation
              toggleMenu={toggleMenu}
              setToggleMenu={setToggleMenu}
              closeNavigation={closeNavigation}
            />

            <div className='App_content'>
              <Switch>
                <Route exact path='/news'>
                  <News />
                </Route>
                <Route exact path='/bio'>
                  <Bio />
                </Route>
                <Route exact path='/disco'>
                  <Disco />
                </Route>
                <Route exact path='/contact'>
                  <Contact />
                </Route>

                <Route exact path='/newsedit'>
                  <NewsEdit />
                </Route>
                <Route path='/news/edit/:id'>
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
                  <Profile currentUser={currentUser} />
                </Route>

                <Route exact path='/under'><UnderConstruction /></Route>

              </Switch>
            </div>


          </div>
          <div className='App_footer'>
            <Footer />
          </div>
        </div>

      </Router>
    </Context.Provider>
  );
}

export default App;
