import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = props => {
	const { toggleMenu, closeNavigation } = props;
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	window.addEventListener('resize', () => {
		setWindowWidth(window.innerWidth);
	});

	return (
		<div
			className={'navigation_container ' + (toggleMenu ? 'show-navigation' : '')}
		>
			<div className='navigation_content show-desktop'>
				<div className='exit-button' onClick={closeNavigation}>
					<i className='fa fa-times'></i>
				</div>
				<Link
					to='/news'
					className='navigation_link'
					onClick={windowWidth < 751 ? closeNavigation : undefined}
				>
					News
                </Link>
				<Link
					to='/bio'
					className='navigation_link'
					onClick={windowWidth < 751 ? closeNavigation : undefined}
				>
					Biography
                </Link>
				<Link
					to='/disco'
					className='navigation_link'
					onClick={windowWidth < 751 ? closeNavigation : undefined}
				>
					Discography
                </Link>
				<Link
					to='/contact'
					className='navigation_link'
					onClick={windowWidth < 751 ? closeNavigation : undefined}
				>
					Contact
                </Link>
				{/* <Link
					to='/'
					className='navigation_link'
					onClick={windowWidth < 751 ? closeNavigation : undefined}
				>
					Store
                </Link> */}
			</div>
		</div>
	)
}

export default Navigation;


// <div className={'navigation_container' + (toggleMenu ? 'show-navigation' : '')}>

// <div className='navigation_content'>
// 	<div className='exit-button' onClick={closeNavigation}>
// 		<i className='fa fa-times'></i>
// 	</div>
// 	<Link
// 		className='navigation_link'
// 		to='/news'
// 		onClick={windowWidth < 751 ? closeNavigation : undefined}>
// 		News
// 	</Link>

// 	<Link
// 		className='navigation_link'
// 		to='/bio'
// 		onClick={windowWidth < 751 ? closeNavigation : undefined}>
// 		Bio
// 	</Link>

// 	<Link
// 		className='navigation_link'
// 		to='/'
// 		onClick={windowWidth < 751 ? closeNavigation : undefined}>
// 		Disco
// 	</Link>

// 	<Link
// 		className='navigation_link'
// 		to='/contact'
// 		onClick={windowWidth < 751 ? closeNavigation : undefined}>
// 		Contact
// 	</Link>

// 	<Link
// 		className='navigation_link'
// 		to='/'
// 		onClick={windowWidth < 751 ? closeNavigation : undefined}>
// 		Store
// 	</Link>

// </div>
// </div>