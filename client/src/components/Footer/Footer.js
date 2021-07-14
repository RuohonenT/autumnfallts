import React from 'react';
import './Footer.css';

const Footer = () => {
    return (

        // <div className='footer_container'>

        <div className='footer_content'>
            <div className='footer_info'><p>Follow us on:</p></div>
            {/* <div className='footer_grid'> */}
            <div className='footer_info'><a target='_blank' rel='noreferrer' href='https://www.facebook.com/autumnfallband'><i className="fa fa-facebook"></i></a>
                {/* </div> */}
                {/* <div className='footer_info'> */}
                <a target='_blank' rel='noreferrer' href='https://autumnfall19.bandcamp.com/releases'><i className="fab fa-bandcamp"></i></a></div>
            {/* </div> */}
            <div className='footer_info'><p>Site design & graphics by Sacrifire Designs &copy; 2021</p>
            </div>
        </div>
        // </div>



    )
};

export default Footer;