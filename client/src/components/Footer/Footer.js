import React from 'react';
import './Footer.css';

const Footer = () => {
    return (

        // <div className='footer_container'>

        <div className='footer_content'>
            <hr width='75%' style={{ color: '#afafaf', backgroundColor: '#afafaf' }} />
            <div className='footer_info'><p>Follow us on:</p></div>
            {/* <div className='footer_grid'> */}
            <div className='footer_info'><a target='_blank' rel='noreferrer' href='https://www.facebook.com/autumnfallband'><i className="fa fa-facebook"></i></a>
                {/* </div> */}
                {/* <div className='footer_info'> */}
                <a target='_blank' rel='noreferrer' href='https://autumnfall19.bandcamp.com/releases'><i className="fab fa-bandcamp"></i></a></div>
            {/* </div> */}
        </div>
        // </div>



    )
};

export default Footer;