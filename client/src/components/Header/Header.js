import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import headerlogo from '../../img/headerlogo.png';
import SignUp from '../SignUp/SignUp';
import Modal from 'react-modal';
// import aflogo from '../../img/af.png';
import './Header.css';

Modal.setAppElement('#root');

const Header = () => {
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
                <div className="header__signin" onClick={openSignupModal}>
                    <i className="fa fa-user-plus"></i>
                    <p className="header__links__text">Rekisteröidy</p>
                </div>
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
        <div className='header_container'>

            <div className='header_content'>

                <div className='logo'>

                    <Link to='home'>
                        <img src={headerlogo} alt='Autumnfall logo' width='120px' height='120px' />
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

                    {<Modals />}
                </div>
                <hr className='header_content' />
            </div>

        </div >
    )
}

export default Header;