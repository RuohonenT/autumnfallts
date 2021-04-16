import React from 'react';
import './Footer.css';

const Footer = () => {
    return (

        <div className='footer_container'>

            <div className='footer_content'>

                <div className='footer_credits'><p>Site design & graphics by Sacrifire Designs © 2021</p></div>

                <div><i className="fab fa-instagram"></i></div>
                <div><a target='_blank' rel='noreferrer' href='https://www.facebook.com/autumnfallband'><i className="fa fa-facebook"></i></a></div>
                <div><a target='_blank' rel='noreferrer' href='https://autumnfall19.bandcamp.com/releases'><i className="fab fa-bandcamp"></i></a></div>

            </div>
        </div>



    )
};

export default Footer;