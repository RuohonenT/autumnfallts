import React from 'react';
import { Link } from 'react-router-dom';
import headerlogo from '../../img/headerlogo.png';
// import aflogo from '../../img/af.png';
import './Header.css';

const Header = () => {

    return (
        <div className='header_container'>

            <div className='header_content'>

                <div>
                    <Link to='home'>
                        <img src={headerlogo} alt='Autumnfall logo' className='header_logo' />
                    </Link>
                </div>

                <div className='header_navigation'>

                    <Link className='header_link' to='/news'>
                        <p>News</p>
                    </Link>

                    <Link className='header_link' to='/bio'>
                        <p>Bio</p>
                    </Link>

                    <p>Disco</p>


                    <Link className='header_link' to='/contact'><p>Contact</p></Link>
                    <p>Store</p>

                </div>
                <hr className='header_content' />
            </div>

        </div >
    )
}

export default Header;