import React from 'react';
import { Link } from 'react-router-dom';
import headerlogo from '../../img/headerlogo.png';
import './Header.css';

const Header = props => {
    const { toggleMenu, setToggleMenu } = props;

    return (
        <>
            <div className='header_container'>
                <div className='menu-button' onClick={() => setToggleMenu(!toggleMenu)}>
                    <i className='fa fa-bars'></i>
                </div>
                <div className='header_content'>

                    <div className='header_logo'>
                        <Link to='home'>
                            <img src={headerlogo} alt='Autumnfall logo' className='header_logo' />
                        </Link>
                    </div>
                </div >
            </div >
        </>
    );
};

export default Header;
