import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import '../styleSheets/header.css';
import Sidebar from './Sidebar';

const HeaderTwo = () => {
	const [ navActive, setNavActive ] = useState(false);
	const [ navExpand, setNavExpand ] = useState(window.innerWidth > 991 ? true : false);
	const [ showSidebar, setShowSidbar ] = useState(false);
	const { userInfo } = useSelector((state) => state.userLogin);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		if (currentScrollY > 200) {
			setNavActive(true);
		}
		if (currentScrollY <= 200) {
			setNavActive(false);
		}
	};
	const handleResize = () => {
		const currntInnerWidth = window.innerWidth;
		if (currntInnerWidth > 991) {
			setNavExpand(true);
		}
		if (currntInnerWidth <= 991) {
			setNavExpand(false);
		}
	};
	useEffect(
		() => {
			window.addEventListener('scroll', handleScroll, { passive: true });
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('scroll', handleScroll);
				window.removeEventListener('resize', handleResize);
			};
		},
		[ navActive ]
	);
	const handleSidebar = () => {
		setShowSidbar(!showSidebar);
	};
	return (
		<nav className={`nav ${navActive && 'active'} `}>
			<div className="container">
				<h1 className="logo fs-2">
					<Link to="/">
						<img
							src="https://res.cloudinary.com/dhz3fae76/image/upload/v1617990826/HT-Company/brand_q1jrae.jpg"
							alt="brand-img"
							id="logo"
						/>
					</Link>
				</h1>
				{navExpand ? (
					<ul className="list">
						<li>
							<NavLink to="/" className="navbar-link " activeClassName="selected">
								صفحه نخست
							</NavLink>
						</li>
						<li>
							<NavLink to="/about" className="navbar-link " activeClassName="selected">
								درباره ما
							</NavLink>
						</li>
						<li>
							<NavLink to="/projects" className="navbar-link " activeClassName="selected">
								پروژه ها
							</NavLink>
						</li>
						<li>
							<NavLink to="/blog" className="navbar-link " activeClassName="selected">
								اخبار و تازه ها
							</NavLink>
						</li>
						<li>
							<NavLink to="/contact" className="navbar-link " activeClassName="selected">
								ارتباط با ما
							</NavLink>
						</li>
						{!userInfo ? (
							<li className="me-5">
								<NavLink
									to="/login"
									className="navbar-link "
									style={{ fontSize: '12px' }}
									activeClassName="selected"
								>
									ورود | ثبت نام
								</NavLink>
							</li>
						) : (
							<li>
								<NavLink
									to="/profile"
									className="navbar-link "
									style={{ fontSize: '12px' }}
									activeClassName="selected"
								>
									سلام {userInfo.name || userInfo.username}
								</NavLink>
							</li>
						)}
					</ul>
				) : (
					<div>
						<button className={`${!navActive ? 'light' : 'dark'} list-btn`} onClick={handleSidebar}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="23"
								height="23"
								fill="currentColor"
								className="bi bi-list"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
								/>
							</svg>
						</button>

						<div className={`sidebar-container ${showSidebar && 'show'}`}>
							<Sidebar />
							<button className=" close-btn btn-sm" onClick={handleSidebar}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="25"
									height="25"
									fill="currentColor"
									className="bi bi-x"
									viewBox="0 0 16 16"
								>
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
								</svg>
							</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default HeaderTwo;
