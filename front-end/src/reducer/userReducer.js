import {
	user_login_request,
	user_login_success,
	user_login_faild,
	user_logout_success,
	user_logout_faild,
	user_register_request,
	user_register_success,
	user_register_faild,
	user_profile_update_request,
	user_profile_update_success,
	user_profile_update_faild,
	user_profile_update_reset
} from '../constans/userConstans';

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case user_login_request:
			return { loading: true };
		case user_login_success:
			return {
				loading: false,
				success: action.payload.success,
				userInfo: action.payload.userInfo,
				message: action.payload.message
			};
		case user_login_faild:
			return { loading: false, error: action.payload };
		case user_logout_success:
			return {};
		case user_logout_faild:
			return { error: action.payload };
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case user_register_request:
			return { loading: true };
		case user_register_success:
			return {
				loading: false,
				success: true,
				message: action.payload.message
			};
		case user_register_faild:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userProfileUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case user_profile_update_request:
			return { loading: true };
		case user_profile_update_success:
			return { loading: false, message: action.payload.message, success: action.payload.success };
		case user_profile_update_faild:
			return { loading: false, error: action.payload };
		case user_profile_update_reset:
			return {};
		default:
			return state;
	}
};
