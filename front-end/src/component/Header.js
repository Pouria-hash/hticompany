import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../action/userAction';
import '../styleSheets/header.css';

const Header = () => {
	const { userInfo } = useSelector((state) => state.userLogin);

	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return (
		<Navbar variant="dark" bg="dark" expand="lg" className="py-2 px-4" id="navbar">
			<Container fluid>
				<Navbar.Brand className="fs-4">
					شرکت <span style={{ color: '#ff1427' }}>هدف توسعه ایرانیان </span>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-4">
						<NavLink to="/" className="navbar-link " activeClassName="selected">
							صفحه نخست
						</NavLink>
						<NavLink to="/projects" className="navbar-link" activeClassName="selected">
							پروژه ها
						</NavLink>
						<NavLink to="/blog" className="navbar-link" activeClassName="selected">
							اخبار و تازه ها
						</NavLink>
						<NavLink to="/about" className="navbar-link" activeClassName="selected">
							درباره ما
						</NavLink>
						<NavLink to="/contact" className="navbar-link" activeClassName="selected">
							ارتباط با ما
						</NavLink>
					</Nav>
					<Nav className="me-auto ">
						{!userInfo ? (
							<div className="d-flex m-0">
								<NavLink
									to="/login"
									className="navbar-link navbar-link-ath px-1"
									activeClassName="selected"
								>
									ورود
								</NavLink>
								<NavLink
									to="/register"
									className="navbar-link navbar-link-ath px-1"
									activeClassName="selected"
								>
									ثبت نام
								</NavLink>
							</div>
						) : (
							<NavDropdown title={`سلام ${userInfo.username.toUpperCase()}`}>
								<NavLink to="/profile" className="dropdown-item">
									مشاهده پروفایل
								</NavLink>
								<NavLink to="/admin/projects" className="dropdown-item">
									پروژها
								</NavLink>
								<NavLink to="/admin/posts" className="dropdown-item">
									پست ها
								</NavLink>
								<NavLink to="/admin/reviews" className="dropdown-item">
									پیغام ها
								</NavLink>
								<NavDropdown.Item onClick={handleLogout}>خروج</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
