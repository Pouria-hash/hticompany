import axios from 'axios';
import { project_admin_list_reset, project_detail_reset } from '../constans/projectConstans';
import {
	user_login_request,
	user_login_success,
	user_login_faild,
	user_register_request,
	user_register_success,
	user_register_faild,
	user_logout_faild,
	user_logout_success,
	user_profile_update_request,
	user_profile_update_success,
	user_profile_update_faild
} from '../constans/userConstans';

export const loginUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: user_login_request });

		const { data } = await axios.post('/api/user/login', userData);
		if (!data.success) {
			dispatch({
				type: user_login_faild,
				payload: data.message
			});
		} else {
			localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
			dispatch({ type: user_login_success, payload: data });
		}
	} catch (error) {
		dispatch({
			type: user_login_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const registerUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: user_register_request });
		const { data } = await axios.post('/api/user/register', userData);
		localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
		dispatch({ type: user_login_success, payload: data });
		dispatch({ type: user_register_success, payload: data });
	} catch (error) {
		dispatch({
			type: user_register_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		await axios.post('/api/user/logout');
		localStorage.removeItem('userInfo');
		dispatch({ type: project_detail_reset });
		dispatch({ type: project_admin_list_reset });

		dispatch({ type: user_logout_success });
	} catch (error) {
		dispatch({
			type: user_logout_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const updateUserProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: user_profile_update_request });
		const { data } = await axios.put('/api/user/profile', userData);
		localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
		dispatch({ type: user_login_success, payload: data });
		dispatch({ type: user_profile_update_success, payload: data });
	} catch (error) {
		dispatch({
			type: user_profile_update_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
