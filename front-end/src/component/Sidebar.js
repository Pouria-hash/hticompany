import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../action/userAction';

const Sidebar = () => {
	const { userInfo } = useSelector((state) => state.userLogin);

	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return (
		<div className="sidebar">
			<h5 className="text-danger fs-4">هدف توسعه ایرانیان</h5>

			<ul className="list-group">
				<li>
					<NavLink to="/" className="side-link" activeClassName="selected">
						صفحه نخست
					</NavLink>
				</li>
				<li>
					<NavLink to="about" className="side-link" activeClassName="selected">
						درباره ما
					</NavLink>
				</li>
				<li>
					<NavLink to="projects" className="side-link" activeClassName="selected">
						پروژه ها
					</NavLink>
				</li>
				<li>
					<NavLink to="blog" className="side-link" activeClassName="selected">
						اخبار و تازه ها
					</NavLink>
				</li>
				<li>
					<NavLink to="contact" className="side-link" activeClassName="selected">
						ارتباط با ما
					</NavLink>
				</li>
				{!userInfo ? (
					<li>
						<NavLink to="/login" className="side-link" activeClassName="selected">
							ورود | ثبت نام
						</NavLink>
					</li>
				) : (
					<ul>
						<li>
							<NavLink to="/profile" className="side-link" activeClassName="selected">
								سلام {userInfo.name}
							</NavLink>
							<button className="btn btn-link text-decoration-none text-dark" onClick={handleLogout}>
								خروج
							</button>
						</li>
					</ul>
				)}
			</ul>
		</div>
	);
};

export default Sidebar;
