import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import headerlogo from '../../img/headerlogo.png';
// import aflogo from '../../img/af.png';
import './Header.css';

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const closeNavigation = () => setToggleMenu(!toggleMenu);
    const openNavigation = () => setToggleMenu(!toggleMenu);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    });

    return (
        <div className='header_container'>
            <div className='menu-button hide-button' onClick={openNavigation}>
                <i className='fa fa-bars'></i>
            </div>
            <div className='header_content'>

                <div className='header_logo'>
                    <Link to='home'>
                        <img src={headerlogo} alt='Autumnfall logo' className='header_logo' />
                    </Link>
                </div>

                <div className='break'></div>

                <div className={'header_navigation_container' + (toggleMenu ? 'show-navigation' : '')}>

                    <div className='header_navigation_content show-desktop'>
                        <div className='exit-button' onClick={closeNavigation}>
                            <i className='fa fa-times'></i>
                        </div>

                        <Link
                            className='header_link_text'
                            to='/news'
                            onClick={windowWidth < 751 ? closeNavigation : undefined}>
                            News
                            </Link>

                        <Link
                            className='header_link_text'
                            to='/bio'
                            onClick={windowWidth < 751 ? closeNavigation : undefined}>
                            Bio
                            </Link>

                        <Link
                            className='header_link_text'
                            to='/'
                            onClick={windowWidth < 751 ? closeNavigation : undefined}>
                            Disco
                            </Link>

                        <Link
                            className='header_link_text'
                            to='/contact'
                            onClick={windowWidth < 751 ? closeNavigation : undefined}>
                            Contact
                            </Link>

                        <Link
                            className='header_link_text'
                            to='/'
                            onClick={windowWidth < 751 ? closeNavigation : undefined}>Store
                            </Link>


                    </div>
                </div>

                {/* <div className='break'></div> */}

                <hr className='header_content' />
            </div >

        </div >
    )
}

export default Header;